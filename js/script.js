//Código de lógica
/*
2)
Obtener datos de la siguiente URL https://restcountries.eu/rest/v2/regionalbloc/USAN mediante fetch 
y crear de forma dinámica un elemento select con sus options => uno por cada a posición o 
registro de la estructura de datos obtenida, https://developer.mozilla.org/es/docs/Web/HTML/Elemento/select.

*/

let datosJSON;
async function Fnc_LlenarSelect(){
    try {
        const peticionJSON = await fetch("https://restcountries.eu/rest/v2/regionalbloc/USAN");
        datosJSON = await peticionJSON.json();
        const $PaisesData = document.querySelector("[data-subsection='Paises']");
        const SelectElement = document.getElementById("CountrySelect");
        const formulario = document.createElement("form");
        const divForm = document.createElement("div");
        divForm.classList.add("form-group");
        SelectElement.innerHTML = `<option value="" selected>Seleccione</option> `;
        let fragmentOption = document.createDocumentFragment();
        datosJSON.forEach(value => {
            const $itemOption = document.createElement("option");
            $itemOption.setAttribute("value",value.alpha3Code);
            $itemOption.textContent = value.name;
            fragmentOption.appendChild($itemOption);
        });
        SelectElement.appendChild(fragmentOption);
        divForm.appendChild(SelectElement);
        formulario.appendChild(divForm);
        $PaisesData.appendChild(formulario);

    } catch (error) {
        console.log(error);
    }

};

async function ChangeTheValue(selectedData) {
    try {
        const $infoPaises = document.querySelector("[data-subsection='InfoPaises']");
        if(selectedData.value == "")
        {
            $infoPaises.innerHTML = "";
        }
        else{
            
            datosJSON.forEach((value)=>{
                if(value.alpha3Code == selectedData.value)
                {
                    var AltSpellings =  "";
                    value.altSpellings.forEach((spell)=>{
                        AltSpellings += `${spell}`+"~"; 
                    });

                    $infoPaises.innerHTML =`
                    <div class="card mb-3" style="max-width: 540px;">
                        <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${value.flag}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-title">${value.name}</h5>
                            <p class="card-text">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"> Capital: ${value.capital}</li>
                                    <li class="list-group-item"> Código de llamada: ${value.callingCodes}</li>
                                    <li class="list-group-item"> Idioma: ${value.languages[0].nativeName}</li>
                                    <li class="list-group-item"> Moneda: ${value.currencies[0].name} (${value.currencies[0].symbol})</li>
                                    <li class="list-group-item"> Gentilicio: ${value.demonym}</li>
                                    <li class="list-group-item"> Población: ${value.population}</li>
                                </ul>
                            </p>
                            <p class="card-text"><small class="text-muted">${AltSpellings}</small></p>
                            </div>
                        </div>
                        </div>
                    </div>
                        `;

                }
            });
        }
       
       
        // 
    } catch (error) {
        
    }
    
}

document.addEventListener("DOMContentLoaded",async ()=>{
    await Fnc_LlenarSelect();
});
