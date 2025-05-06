from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir conexión desde React

@app.route('/api/calculate-age', methods=['POST'])
def calculate_age():
    data = request.get_json()
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento = data.get('fechaNacimiento')  # formato: 'YYYY-MM-DD'

    try:
        nacimiento = datetime.strptime(fecha_nacimiento, "%Y-%m-%d")
        hoy = datetime.today()
        edad = hoy.year - nacimiento.year - ((hoy.month, hoy.day) < (nacimiento.month, nacimiento.day))

        mensaje = f"Hola {nombre} {apellido}, su edad es {edad} años."
        return jsonify({"mensaje": mensaje}), 200

    except Exception as e:
        return jsonify({"error": "Datos inválidos", "detalle": str(e)}), 400


from flask import send_file
import io
from openpyxl import Workbook

@app.route('/api/export-excel', methods=['POST'])
def export_excel():
    data = request.get_json()
    nombre = data['nombre']
    apellido = data['apellido']
    fecha_nacimiento_str = data['fechaNacimiento']

    fecha_nacimiento = datetime.strptime(fecha_nacimiento_str, '%Y-%m-%d').date()
    hoy = datetime.today().date()
    edad = hoy.year - fecha_nacimiento.year - ((hoy.month, hoy.day) < (fecha_nacimiento.month, fecha_nacimiento.day))

    # Crear un Excel en memoria
    wb = Workbook()
    ws = wb.active
    ws.append(['Nombre', 'Apellido', 'Edad'])
    ws.append([nombre, apellido, edad])

    # Guardar el Excel en un archivo en memoria (BytesIO)
    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    # Enviar el archivo como respuesta descargable
    return send_file(
        output,
        download_name='datos_usuario.xlsx',
        as_attachment=True,
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )


if __name__ == '__main__':
    app.run(debug=True)
