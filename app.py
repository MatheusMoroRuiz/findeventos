from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Exemplo de dados de eventos
events = [
    {'id': 1, 'name': 'Evento 1', 'date': '2024-04-10'},
    {'id': 2, 'name': 'Evento 2', 'date': '2024-04-15'},
    {'id': 3, 'name': 'Evento 3', 'date': '2024-04-20'}
]

# Rota para listar todos os eventos
@app.route('/api/events', methods=['GET'])
def get_events():
    return jsonify(events)

# Rota para obter detalhes de um evento específico
@app.route('/api/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = next((event for event in events if event['id'] == event_id), None)
    if event:
        return jsonify(event)
    else:
        return jsonify({'message': 'Evento não encontrado'}), 404

# Rota para adicionar um novo evento
@app.route('/api/events', methods=['POST'])
def add_event():
    new_event = request.json
    new_event['id'] = len(events) + 1
    events.append(new_event)
    return jsonify({'message': 'Evento adicionado com sucesso'}), 201

# Rota para atualizar um evento existente
@app.route('/api/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = next((event for event in events if event['id'] == event_id), None)
    if not event:
        return jsonify({'message': 'Evento não encontrado'}), 404
    data = request.json
    event.update(data)
    return jsonify({'message': 'Evento atualizado com sucesso'})

# Rota para deletar um evento existente
@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    global events
    events = [event for event in events if event['id'] != event_id]
    return jsonify({'message': 'Evento deletado com sucesso'})

if __name__ == '__main__':
    app.run(debug=True)

app = Flask(__name__)