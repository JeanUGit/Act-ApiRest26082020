//Código de lógica
/*3) Obtener datos de la siguiente URL https://developer.marvel.com/documentation/getting_started 
mediante (requiere registro y autenticación mediante API Key) fetch y 
crear de forma dinámica componentes card (uno por cada a posición o registro de la estructura de datos obtenida)
 https://getbootstrap.com/docs/4.5/components/card/.
 
*/

//3396445cf4c00f2ec64bfc35a89a53e5
const $divContainerCards = document.querySelector("div[data-card]"),
    $templateCard = document.getElementById("templateCard").content.cloneNode(true); 

console.log($divContainerCards, $templateCard);

document.addEventListener("DOMContentLoaded", async () =>{ 

    let peticion = await fetch ("http://gateway.marvel.com/v1/public/characters?ts=1&apikey=e326149bef1d5107c30b38c22224a30d&hash=3396445cf4c00f2ec64bfc35a89a53e5");
    let respuesta = await peticion.json();
    
    const $framgent = document.createDocumentFragment();
    respuesta.data.results.forEach(element => {
        $templateCard.querySelector(".card-img-top").setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
        $templateCard.querySelector(".card-title").textContent = element.name;
        $templateCard.querySelector(".card-text").textContent = element.description;
        $framgent.appendChild($templateCard.cloneNode(true));
       
    });
    $divContainerCards.appendChild($framgent);
    $divContainerCards.classList.remove("d-none")
})

