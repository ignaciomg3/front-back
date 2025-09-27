// VERSIÓN MEJORADA DEL ENDPOINT PARA EL BACKEND
// Copia este código en tu archivo de rutas del backend

/**
 * @swagger
 * /analisis/porcentaje:
 *   get:
 *     summary: Obtener porcentaje de análisis por solicitante
 *     description: Devuelve el total de análisis y el porcentaje de cada solicitante.
 *     responses:
 *       200:
 *         description: Lista de solicitantes con su porcentaje
 */
router.get("/analisis/porcentaje", async (req, res) => {
  try {
    const result = await Analisis.aggregate([
      // Filtrar documentos que tengan solicitante válido
      {
        $match: {
          solicitante: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$solicitante",
          total: { $sum: 1 }
        }
      },
      {
        $setWindowFields: {
          output: {
            totalGeneral: {
              $sum: "$total",
              window: { documents: ["unbounded", "unbounded"] }
            }
          }
        }
      },
      {
        $project: {
          solicitante: "$_id",
          total: 1,
          porcentaje: {
            $concat: [
              {
                $toString: {
                  $round: [
                    {
                      $multiply: [
                        {
                          $divide: [
                            "$total",
                            { $ifNull: ["$totalGeneral", 1] } // Evitar división por 0
                          ]
                        },
                        100
                      ]
                    },
                    2
                  ]
                }
              },
              "%"
            ]
          },
          _id: 0
        }
      },
      // Ordenar por total descendente
      {
        $sort: { total: -1 }
      }
    ]);

    // Validar que el resultado no esté vacío
    if (!result || result.length === 0) {
      return res.json({
        success: true,
        message: "No se encontraron análisis",
        data: []
      });
    }

    res.json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (err) {
    console.error("Error en /analisis/porcentaje:", err);
    res.status(500).json({ 
      success: false,
      message: err.message || "Error interno del servidor",
      data: []
    });
  }
});

// ALTERNATIVA SIMPLIFICADA SI LA ANTERIOR NO FUNCIONA:
router.get("/analisis/porcentaje-simple", async (req, res) => {
  try {
    // Obtener todos los análisis con solicitante válido
    const analisis = await Analisis.find({ 
      solicitante: { $exists: true, $ne: null, $ne: "" }
    });

    if (analisis.length === 0) {
      return res.json([]);
    }

    // Contar por solicitante manualmente
    const conteo = {};
    analisis.forEach(item => {
      if (item.solicitante) {
        conteo[item.solicitante] = (conteo[item.solicitante] || 0) + 1;
      }
    });

    const total = analisis.length;
    
    // Convertir a array y calcular porcentajes
    const result = Object.entries(conteo).map(([solicitante, count]) => ({
      solicitante,
      total: count,
      porcentaje: ((count / total) * 100).toFixed(2) + "%"
    })).sort((a, b) => b.total - a.total);

    res.json(result);
  } catch (err) {
    console.error("Error en /analisis/porcentaje-simple:", err);
    res.status(500).json({ 
      message: err.message || "Error interno del servidor"
    });
  }
});