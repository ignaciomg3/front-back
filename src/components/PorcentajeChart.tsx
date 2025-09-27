import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { SolicitantePorcentaje } from '../types/reportes';
import './PorcentajeChart.css';

// Registrar los componentes de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface PorcentajeChartProps {
  data: SolicitantePorcentaje[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const PorcentajeChart: React.FC<PorcentajeChartProps> = ({ data, loading, error, onRefresh }) => {
  // Generar colores dinámicos para el gráfico
  const generateColors = (count: number) => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#C9CBCF'
    ];
    
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  };

  const chartColors = generateColors(data.length);

  // Configuración para el gráfico de torta
  const pieData = {
    labels: data.map(item => item.solicitante),
    datasets: [
      {
        label: 'Porcentaje de Análisis',
        data: data.map(item => item.total),
        backgroundColor: chartColors,
        borderColor: chartColors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  // Configuración para el gráfico de barras
  const barData = {
    labels: data.map(item => item.solicitante.length > 20 
      ? item.solicitante.substring(0, 20) + '...' 
      : item.solicitante
    ),
    datasets: [
      {
        label: 'Cantidad de Análisis',
        data: data.map(item => item.total),
        backgroundColor: chartColors.map(color => color + '80'), // Agregar transparencia
        borderColor: chartColors,
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: string, index: number) => ({
              text: `${label}: ${data.datasets[0].data[index]} (${data.datasets[0].data[index] > 0 ? 
                ((data.datasets[0].data[index] / data.datasets[0].data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1) : 0}%)`,
              fillStyle: data.datasets[0].backgroundColor[index],
              strokeStyle: data.datasets[0].borderColor[index],
              index: index
            }));
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.label}: ${context.raw} análisis (${percentage}%)`;
          }
        }
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Distribución de Análisis por Solicitante'
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(1);
            return `${context.raw} análisis (${percentage}%)`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="chart-loading">
        <div className="loading-spinner"></div>
        <p>Cargando datos de porcentajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chart-error">
        <div className="error-message">
          <h3>⚠️ Error al cargar datos</h3>
          <p>{error}</p>
          <button className="retry-button" onClick={onRefresh}>
            🔄 Reintentar
          </button>
          <p className="demo-note">
            <em>Mostrando datos de ejemplo para desarrollo</em>
          </p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="chart-empty">
        <h3>📊 No hay datos disponibles</h3>
        <p>No se encontraron análisis para generar el gráfico</p>
      </div>
    );
  }

  const totalAnalisis = data.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="porcentaje-chart-container">
      <div className="chart-header">
        <h2>📊 Distribución de Análisis por Solicitante</h2>
        <div className="chart-actions">
          <button className="refresh-button" onClick={onRefresh}>
            🔄 Actualizar
          </button>
          <span className="total-badge">
            Total: {totalAnalisis} análisis
          </span>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-section">
          <h3>Gráfico de Torta</h3>
          <div className="chart-wrapper pie-chart">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        <div className="chart-section">
          <h3>Gráfico de Barras</h3>
          <div className="chart-wrapper bar-chart">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      <div className="chart-summary">
        <h3>📋 Resumen Detallado</h3>
        <div className="summary-grid">
          {data.map((item, index) => (
            <div key={index} className="summary-item">
              <div 
                className="color-indicator" 
                style={{ backgroundColor: chartColors[index] }}
              ></div>
              <div className="summary-content">
                <h4>{item.solicitante}</h4>
                <p>{item.total} análisis ({item.porcentaje})</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PorcentajeChart;