document.addEventListener('DOMContentLoaded', (event) => {
    const reservationForm = document.getElementById('reservationForm')
    const reservationsList = document.getElementById('reservationsList')

    loadReservations()

    reservationForm.addEventListener('submit', function (e) {
        e.preventDefault()
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const number = document.getElementById('number').value
        const date = document.getElementById('date').value
        const time = document.getElementById('time').value
        const reservationId = document.getElementById('reservationId').value

        const newReservation = {
            id: reservationId ? parseInt(reservationId) : Date.now(),
            name: name,
            email: email,
            number: number,
            date: date,
            time: time
        }

        saveReservation(newReservation)
        loadReservations()
        reservationForm.reset()
    })

    function saveReservation(reservation) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []
        let index = reservations.findIndex(res => res.id === reservation.id)

        if (index === -1) {
            reservations.push(reservation)
        } else {
            reservations[index] = reservation
        }
        localStorage.setItem('reservations', JSON.stringify(reservations))
    }

    function loadReservations() {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []
        reservationsList.innerHTML = ''

        reservations.forEach(reservation => {
            let reservationItem = document.createElement('div')
            reservationItem.className = 'reservation-item'
            reservationItem.innerHTML = `
                <p><strong>Nome:</strong> ${reservation.name}</p>
                <p><strong>Email:</strong> ${reservation.email}</p>
                <p><strong>Número de Pessoas:</strong> ${reservation.number}</p>
                <p><strong>Data:</strong> ${reservation.date}</p>
                <p><strong>Hora:</strong> ${reservation.time}</p>
                <button onclick="editReservation(${reservation.id})">Editar</button>
                <button onclick="deleteReservation(${reservation.id})">Excluir</button>
            `
            reservationsList.appendChild(reservationItem)
        })
    }

    window.editReservation = function (id) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []
        let reservationIndex = reservations.findIndex(res => res.id === id)
        if (reservationIndex === -1) return 
        let reservation = reservations[reservationIndex]

        document.getElementById('name').value = reservation.name
        document.getElementById('email').value = reservation.email
        document.getElementById('number').value = reservation.number
        document.getElementById('date').value = reservation.date
        document.getElementById('time').value = reservation.time
        document.getElementById('reservationId').value = reservation.id

        reservations.splice(reservationIndex, 1)
        localStorage.setItem('reservations', JSON.stringify(reservations))
    }

    window.deleteReservation = function (id) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || []
        reservations = reservations.filter(res => res.id !== id)
        localStorage.setItem('reservations', JSON.stringify(reservations))
        loadReservations()
    }
})