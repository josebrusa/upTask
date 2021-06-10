import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

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
                    const url = `${location.origin}/proyectos/${urlProyecto}`;
                    axios.delete(url, { params: { urlProyecto }})
                        .then(function(respuesta){
                            console.log(respuesta);
                            Swal.fire(
                                'Eliminado!',
                                respuesta.data,
                                'success'
                                );
                                setTimeout(() => {
                                    window.location.href = '/'
                                }, 2000);
                        });
                }
            })
    })
}

export default btnEliminar;