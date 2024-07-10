function showThankYouMessage() {

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    var dateInput = document.getElementById('date').value;
    var reservationDate = new Date(dateInput);
    
    if (reservationDate < today) {
        alert('A data da reserva não pode ser uma data passada.');
        return false;
    }

    alert('Obrigado pela sua reserva! Estamos ansiosos para recebê-lo.');
    return true;
}


document.addEventListener('DOMContentLoaded', (event) => {
    const reservationForm = document.getElementById('reservationForm');
    const reservationsList = document.getElementById('reservationsList');

    // Carregar as reservas ao carregar a página
    loadReservations();

    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const number = document.getElementById('number').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const newReservation = {
            id: Date.now(),
            name: name,
            email: email,
            number: number,
            date: date,
            time: time
        };

        saveReservation(newReservation);
        loadReservations();
        reservationForm.reset();
    });

    function saveReservation(reservation) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
    }

    function loadReservations() {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservationsList.innerHTML = '';

        reservations.forEach(reservation => {
            let reservationItem = document.createElement('div');
            reservationItem.className = 'reservation-item';
            reservationItem.innerHTML = `
                <p><strong>Nome:</strong> ${reservation.name}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Número de Pessoas:</strong> ${reservation.number}</p>
                <p><strong>Data:</strong> ${reservation.date}</p>
                <p><strong>Hora:</strong> ${reservation.time}</p>
                <button onclick="editReservation(${reservation.id})">Editar</button>
                <button onclick="deleteReservation(${reservation.id})">Excluir</button>
            `;
            reservationsList.appendChild(reservationItem);
        });
    }

    window.editReservation = function (id) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        let reservation = reservations.find(res => res.id === id);

        document.getElementById('name').value = reservation.name;
        document.getElementById('email').value = reservation.email;
        document.getElementById('number').value = reservation.number;
        document.getElementById('date').value = reservation.date;
        document.getElementById('time').value = reservation.time;

        deleteReservation(id);
    };

    window.deleteReservation = function (id) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservations = reservations.filter(res => res.id !== id);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        loadReservations();
    };
});

document.addEventListener('DOMContentLoaded', (event) => {
    const cats = document.querySelectorAll('.cat-item');
    const descriptionDiv = document.getElementById('cat-description');

    // Carregar descrições dos mascotes
    function loadCatDescriptions() {
        return fetch('mascotes.json')
            .then(response => response.json())
            .then(data => {
                const descriptions = {};
                data.forEach(cat => {
                    descriptions[cat.nome] = cat.descricao;
                });
                return descriptions;
            });
    }

    loadCatDescriptions().then(descriptions => {
        cats.forEach(cat => {
            cat.addEventListener('click', () => {
                const catName = cat.getAttribute('data-nome');
                const description = descriptions[catName];
                descriptionDiv.innerHTML = `<h3>${catName}</h3><p>${description}</p>`;
            });
        });
    });
});