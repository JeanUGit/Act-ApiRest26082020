//Código de lógica
/*
2)
Obtener datos de la siguiente URL https://restcountries.eu/rest/v2/regionalbloc/USAN mediante fetch 
y crear de forma dinámica un elemento select con sus options => uno por cada a posición o 
registro de la estructura de datos obtenida, https://developer.mozilla.org/es/docs/Web/HTML/Elemento/select.

*/


async function Fnc_LlenarSelect(){
    try {
        const peticionJSON = await fetch("https://restcountries.eu/rest/v2/regionalbloc/USAN");
        const datosJSON = await peticionJSON.json();
        const $PaisesData = document.querySelector("[data-subsection='Paises']");
        const SelectElement = document.getElementById("CountrySelect");
        const formulario = document.createElement("form");
        const divForm = document.createElement("div");
        divForm.classList.add("form-group");
        SelectElement.innerHTML = `<option value="" selected>Seleccione</option> `;
        console.log(datosJSON);
        console.log($PaisesData);
        datosJSON.forEach(value => {
            SelectElement.innerHTML += `<option value="${value.alpha3Code}">${value.name}</option>`;
            console.log("Name: "+value.name+"\n"+"Code: "+ value.alpha3Code)
        });
        divForm.appendChild(SelectElement);
        formulario.appendChild(divForm);
        $PaisesData.appendChild(formulario);

    } catch (error) {
        console.log(error);
    }

};

async function ChangeTheValue(selectedData) {
    try {
        const peticionJSON = await fetch("https://restcountries.eu/rest/v2/regionalbloc/USAN");
        const datosJSON = await peticionJSON.json();
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

/*
    <select name="select">
        <option value="" selected>Seleccione</option> 
        <option value="value2">Value 1</option>
        <option value="value3">Value 2</option>
        <option value="value3">Value 3</option>
        <option value="value3">Value 4</option>
        <option value="value3">Value 5</option>
    </select>
     $infoPaises.innerHTML += ` <div class="card" style="width: 18rem;">
                                            <img src="${value.flag}" class="card-img-top" alt="">
                                            <div class="card-body">
                                            <p class="card-text">
                                                <ul>
                                                    <li> Capital: ${value.capital}</li>
                                                    <li> Código de llamada: ${value.callingCodes}</li>
                                                    <li> Idioma: ${value.languages[0].nativeName}</li>
                                                    <li> Moneda: ${value.currencies[0].name} (${value.currencies[0].symbol})</li>
                                                    <li> Gentilicio: ${value.demonym}</li>
                                                    <li> Población: ${value.population}</li>
                                                </ul>
                                            </p>
                                            </div>
                                        </div>   `;



*/