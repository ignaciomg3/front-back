import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ClientePorcentaje } from '../types/reportes';
import './ClienteBarChart.css';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ClienteBarChartProps {
  data: ClientePorcentaje[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}

const ClienteBarChart: React.FC<ClienteBarChartProps> = ({ data, loading, error, onRefresh }) => {
  // Generar colores dinámicos para las barras
  const generateColors = (count: number) => {
    const baseColors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
      '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF',
      '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'
    ];
    
    return Array.from({ length: count }, (_, i) => baseColors[i % baseColors.length]);
  };

  const chartColors = generateColors(data.length);

  // Preparar datos para el gráfico de barras
  const chartData = {
    labels: data.map(item => {
      // Truncar nombres largos para mejor visualización
      return item.cliente.length > 20 
        ? item.cliente.substring(0, 20) + '...' 
        : item.cliente;
    }),
    datasets: [
      {
        label: 'Cantidad de Análisis',
        data: data.map(item => item.total),
        backgroundColor: chartColors.map(color => color + '80'), // Agregar transparencia
        borderColor: chartColors,
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 80,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false // Ocultar leyenda ya que solo tenemos una serie
      },
      title: {
        display: true,
        text: 'Cantidad de Análisis por Cliente',
        font: {
          size: 16,
          weight: 'bold' as const
        },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const clienteCompleto = data[context.dataIndex]?.cliente || context.label;
            const total = context.raw;
            const porcentaje = data[context.dataIndex]?.porcentaje || 0;
            return [
              `Cliente: ${clienteCompleto}`,
              `Análisis: ${total}`,
              `Porcentaje: ${porcentaje.toFixed(2)}%`
            ];
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Clientes',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 10
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Análisis',
          font: {
            size: 14,
            weight: 'bold' as const
          }
        },
        ticks: {
          stepSize: 1,
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart' as const
    }
  };

  if (loading) {
    return (
      <div className="cliente-chart-loading">
        <div className="loading-spinner"></div>
        <p>Cargando datos de clientes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cliente-chart-error">
        <div className="error-message">
          <h3>⚠️ Error al cargar datos de clientes</h3>
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
      <div className="cliente-chart-empty">
        <h3>📊 No hay datos de clientes disponibles</h3>
        <p>No se encontraron análisis por cliente para generar el gráfico</p>
      </div>
    );
  }

  const totalAnalisis = data.reduce((sum, item) => sum + item.total, 0);
  const promedioAnalisis = Math.round(totalAnalisis / data.length);
  const clienteTop = data.reduce((prev, current) => 
    (prev.total > current.total) ? prev : current
  );

  return (
    <div className="cliente-bar-chart-container">
      <div className="chart-header">
        <h2>📊 Análisis por Cliente</h2>
        <div className="chart-actions">
          <button className="refresh-button" onClick={onRefresh}>
            🔄 Actualizar
          </button>
          <div className="stats-badges">
            <span className="stat-badge total">
              Total: {totalAnalisis}
            </span>
            <span className="stat-badge average">
              Promedio: {promedioAnalisis}
            </span>
            <span className="stat-badge clients">
              Clientes: {data.length}
            </span>
          </div>
        </div>
      </div>

      <div className="chart-content">
        <div className="chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
        
        <div className="chart-insights">
          <div className="insight-card">
            <h4>🏆 Cliente Principal</h4>
            <p className="client-name">{clienteTop.cliente}</p>
            <p className="client-stats">
              {clienteTop.total} análisis ({clienteTop.porcentaje.toFixed(2)}%)
            </p>
          </div>
          
          <div className="insight-card">
            <h4>📈 Distribución</h4>
            <p>Los top 3 clientes representan:</p>
            <p className="percentage">
              {data.slice(0, 3).reduce((sum, item) => sum + item.porcentaje, 0).toFixed(1)}%
            </p>
            <p>del total de análisis</p>
          </div>
          
          <div className="insight-card">
            <h4>📊 Análisis</h4>
            <p>Rango de análisis por cliente:</p>
            <p className="range">
              {Math.min(...data.map(d => d.total))} - {Math.max(...data.map(d => d.total))}
            </p>
            <p>análisis por cliente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteBarChart;