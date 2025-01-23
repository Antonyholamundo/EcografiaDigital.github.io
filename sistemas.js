// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', function () {
    // Referencia al elemento del calendario
    const calendarEl = document.getElementById('calendar');
    
    // Inicializar FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        events: [
            { title: 'Ecografía General - Juan Pérez', date: '2025-01-20' },
            { title: 'Ecografía Abdominal - María González', date: '2025-01-22' },
        ],
        dateClick: handleDateClick // Se llama cuando se hace clic en una fecha
    });

    // Renderizar el calendario
    calendar.render();

    // Función para manejar el clic en las fechas del calendario
    function handleDateClick(info) {
        openModal(info.dateStr); // Abre el modal con la fecha seleccionada
    }

    // Función para abrir el modal de citas
    window.openModal = function(fecha) {
        const modal = document.getElementById('citaModal');
        document.getElementById('citaForm').reset(); // Resetea el formulario
        document.getElementById('citaForm').fecha = fecha; // Asocia la fecha con el formulario
        modal.style.display = 'block';
    }

    // Función para cerrar el modal de citas
    window.closeModal = function() {
        const modal = document.getElementById('citaModal');
        modal.style.display = 'none';
    }

    // Función para manejar el envío del formulario
    document.getElementById('citaForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario

        const nombre = document.getElementById('nombre').value;
        const cedula = document.getElementById('cedula').value;
        const celular = document.getElementById('celular').value;
        const tipo = document.getElementById('tipo').value;
        const hora = document.getElementById('hora').value;
        const fecha = document.getElementById('citaForm').fecha;

        // Agregar cita a la lista de citas y al calendario
        addCitaToList(fecha, tipo, nombre, hora);
        addCitaToCalendar(fecha, hora, tipo, nombre);

        // Cerrar el modal después de agregar la cita
        closeModal();
    });

    // Función para agregar la cita a la lista de citas
    function addCitaToList(fecha, tipo, nombre, hora) {
        const citaList = document.getElementById('citas-list');
        const citaItem = document.createElement('tr');
        citaItem.innerHTML = `<td>${fecha}</td><td>Ecografía ${tipo}</td><td>${nombre}</td><td>${hora}</td>`;
        citaList.appendChild(citaItem);
    }

    // Función para agregar la cita al calendario
    function addCitaToCalendar(fecha, hora, tipo, nombre) {
        calendar.addEvent({
            title: `Ecografía ${tipo} - ${nombre}`,
            start: `${fecha}T${hora}`,
            allDay: false
        });
    }

    // Función para abrir el modal de próximas citas
    window.openCitasModal = function() {
        document.getElementById('citasModal').style.display = 'block';
    }

    // Función para cerrar el modal de próximas citas
    window.closeCitasModal = function() {
        document.getElementById('citasModal').style.display = 'none';
    }
});
