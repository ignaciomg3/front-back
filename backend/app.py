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

if __name__ == '__main__':
    app.run(debug=True)
