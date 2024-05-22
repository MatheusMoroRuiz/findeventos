const eventTable = document.getElementById('event-table').getElementsByTagName('tbody')[0];
const addEventForm = document.getElementById('add-event-form');

addEventForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(addEventForm);
    const name = formData.get('eventName');
    const date = formData.get('eventDate');
    if (!name || !date) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, date })
    });

    if (response.ok) {
        fetchEvents();
        addEventForm.reset();
    } else {
        alert('Erro ao cadastrar evento');
    }
});

async function fetchEvents() {
    const response = await fetch('http://localhost:5000/api/events');
    const data = await response.json();
    eventTable.innerHTML = '';
    data.forEach(event => {
        const row = eventTable.insertRow();
        row.innerHTML = `<td>${event.id}</td><td>${event.name}</td><td>${event.date}</td><td><button onclick="editEvent(${event.id})">Editar</button></td><td><button onclick="deleteEvent(${event.id})">Excluir</button></td>`;
    });
}

async function editEvent(id) {
    const newName = prompt('Digite o novo nome do evento:');
    const newDate = prompt('Digite a nova data do evento (AAAA-MM-DD):');
    if (!newName || !newDate) {
        alert('Por favor, preencha todos os campos');
        return;
    }

    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newName, date: newDate })
    });

    if (response.ok) {
        fetchEvents();
    } else {
        alert('Erro ao editar evento');
    }
}

async function deleteEvent(id) {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchEvents();
    } else {
        alert('Erro ao excluir evento');
    }
}

fetchEvents();
