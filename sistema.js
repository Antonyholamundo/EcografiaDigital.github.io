// Variables globales
let pacientes = [];
let editandoId = null;
const modal = new bootstrap.Modal(document.getElementById('modalPaciente'));
const form = document.getElementById('formPaciente');

// Función para abrir modal nuevo
function abrirModalNuevo() {
    editandoId = null;
    form.reset();
    document.querySelector('.modal-title').textContent = 'Nuevo Paciente';
    modal.show();
}

// Función para cargar pacientes
function cargarPacientes() {
    const pacientesGuardados = localStorage.getItem('pacientes');
    if (pacientesGuardados) {
        pacientes = JSON.parse(pacientesGuardados);
        actualizarTablaPacientes();
    }
}

// Función para actualizar tabla
function actualizarTablaPacientes() {
    const tbody = document.getElementById('tablaPacientes');
    tbody.innerHTML = '';
    
    pacientes.forEach(paciente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${paciente.nombres}</td>
            <td>${paciente.apellidos}</td>
            <td>${paciente.telefono}</td>
            <td>${paciente.email}</td>
            <td>${paciente.tipoEcografia}</td>
            <td>$${paciente.precio}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1" onclick="editarPaciente(${paciente.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="eliminarPaciente(${paciente.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}


// Función para guardar paciente
function guardarPaciente(e) {
    e.preventDefault();

    // Validar el formulario
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    // Recoger datos del formulario
    const paciente = {
        id: editandoId || Date.now(),
        nombres: document.getElementById('nombres').value.trim(),
        apellidos: document.getElementById('apellidos').value.trim(),
        telefono: document.getElementById('telefono').value.trim(),
        email: document.getElementById('email').value.trim(),
        fechaNacimiento: document.getElementById('fechaNacimiento').value,
        sexo: document.getElementById('sexo').value,
        tipoEcografia: document.getElementById('tipoEcografia').value,
        precio: document.getElementById('precio').value,
        descripcion: document.getElementById('descripcion').value.trim()
    };

    try {
        if (editandoId) {
            // Actualizar paciente existente
            const index = pacientes.findIndex(p => p.id === editandoId);
            pacientes[index] = paciente;
        } else {
            // Agregar nuevo paciente
            pacientes.push(paciente);
        }

        // Guardar en localStorage
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        
        // Actualizar tabla
        actualizarTablaPacientes();
        
        // Cerrar modal y resetear formulario
        modal.hide();
        form.reset();
        form.classList.remove('was-validated');
        
        // Mostrar mensaje de éxito
        alert('Paciente guardado exitosamente');
        
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar el paciente');
    }
}

// Función para editar paciente
function editarPaciente(id) {
    const paciente = pacientes.find(p => p.id === id);
    if (paciente) {
        editandoId = id;
        document.querySelector('.modal-title').textContent = 'Editar Paciente';
        
        // Llenar formulario
        document.getElementById('nombres').value = paciente.nombres;
        document.getElementById('apellidos').value = paciente.apellidos;
        document.getElementById('telefono').value = paciente.telefono;
        document.getElementById('email').value = paciente.email;
        document.getElementById('fechaNacimiento').value = paciente.fechaNacimiento;
        document.getElementById('sexo').value = paciente.sexo;
        document.getElementById('tipoEcografia').value = paciente.tipoEcografia;
        document.getElementById('precio').value = paciente.precio;
        document.getElementById('descripcion').value = paciente.descripcion;
        
        modal.show();
    }
}

// Función para eliminar paciente
function eliminarPaciente(id) {
    if (confirm('¿Está seguro de eliminar este paciente?')) {
        pacientes = pacientes.filter(p => p.id !== id);
        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        actualizarTablaPacientes();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarPacientes();
    // Evitar que el modal se cierre al hacer clic fuera
    document.getElementById('modalPaciente').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.stopPropagation();
        }
    });
});

// Event listener para el formulario
form.addEventListener('submit', guardarPaciente);

// Event listener para limpiar validación al cerrar modal
document.getElementById('modalPaciente').addEventListener('hidden.bs.modal', () => {
    form.classList.remove('was-validated');
    form.reset();
});
