const tabla = document.querySelector('.container table tbody');

function cargarUsuarios(){
    fetch('https://jsonplaceholder.typicode.com/comments')
        .then(respuesta => respuesta.json()) //Indicamos el formato en que se desea obtener la información
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${usuario.postId}</td>
                    <td>${usuario.id}</td>
                    <td>${usuario.name}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.body}</td>
                `;
                console.log(tabla);
                tabla.appendChild(row);                
            });
        }) // Aquí mostramos dicha información
        //.catch(error => console.log('Hubo un error : ' + error.message))
}

cargarUsuarios();