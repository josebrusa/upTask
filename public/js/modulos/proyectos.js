import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector('#eliminar-proyecto');

btnEliminar.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro de borrar esta tarea?',
        text: "Recuerda que no podras recuperar esta tarea!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire(
                'Eliminado!',
                'Tu tarea a sido eliminada.',
                'success'
            );
                setTimeout(() => {
                    window.location.href = '/'
                }, 3000);
            }
        })
})