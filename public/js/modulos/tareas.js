import axios from 'axios'
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance'

const tareas = document.querySelector('.listado-pendientes');

if(tareas) {

    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    if(respuesta.status === 200){
                        icono.classList.toggle('completo');
                        actualizarAvance();
                    }
                })
        }
            if(e.target.classList.contains('fa-trash')){
                const tareHTML = e.target.parentElement.parentElement,
                    idTarea = tareHTML.dataset.tarea;
                Swal.fire({
                    title: 'Desas borrar esta tarea',
                    text: 'Una tarea eliminada no se puede recuperar',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, Borrar',
                    cancelButtonText: 'No, Cancelar',
                }).then((result) => {
                    if(result.value) {
                        const url = `${location.origin}/tareas/${idTarea}`;
                        axios.delete( url, { params: { idTarea }})
                            .then(function(respuesta){
                                if(respuesta.status == 200) {
                                    tareHTML.parentElement.removeChild(tareHTML);
                                    Swal.fire(
                                        'Eliminado!',
                                        respuesta.data,
                                        'success'
                                    )
                                    actualizarAvance();
                                }
                            })
                    }
                })
            }
    });
}

export default tareas;