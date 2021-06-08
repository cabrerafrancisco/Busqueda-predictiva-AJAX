const inputPais = document.getElementById('inputPais');
const btnReset = document.getElementById('btnReset');
const resultados = document.getElementById('resultados');
const cantResultados = document.getElementById('cantResultados');

inputPais.addEventListener("keyup" , () => {
    let paises = inputPais.value;

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load" , () => {
        const response = JSON.parse(xhr.responseText);
        //vaciar el contenedor
        resultados.innerHTML="";
        if (response[0] === undefined) {
            //si no hay resultado imprimo mensaje que dice que no hay coincidencias
            resultados.innerHTML = `<h1>No se encontraron coincidencias</h1>`;
        } else {            
            response.forEach((element) => {
                //creo los elementos
                let apiResp = element.translations.es;
                let paisInput = paises.toLowerCase(); //pais del input en minuscula
                let paisApi = apiResp.toLowerCase(); // paises de api
               
                //cortar texto
                const parteUno = apiResp.slice(0,paisApi.indexOf(paisInput)); // comparo los string para encontrar las coincidencias
                const resaltar = paisInput; // ponemos en negrita lo que vamos ingresando
                const faltante = apiResp.slice(paisApi.indexOf(paisInput) + paisInput.length );// agregamos la parte faltante del texto

                //creamos los distintos elementos
                const cajaPais = document.createElement("div"); // caja donde ira cada pais
                const negrita = document.createElement("strong"); // etiqueta para negrita
                const flag = document.createElement("img"); // imagen bandera
                const cursivaOne = document.createElement("i"); // primera parte en cursiva
                const cursivaTwo = document.createElement("i"); // segunda parte en cursiva

                //agregamos los elementos filtrados a su respectiva etiqueta 
                flag.src = element.flag; // bandera pais
                cursivaOne.textContent = parteUno; // cursiva parte uno
                cajaPais.appendChild(cursivaOne); // agregar parte 1 del texto
                negrita.textContent = resaltar; // parte en negrita
                cajaPais.appendChild(negrita); // agregar parte 1 del texto
                cursivaTwo.textContent = faltante; // cursiva parte dos
                cajaPais.appendChild(cursivaTwo); // agregar parte 1 del texto
                cajaPais.appendChild(flag); // agregamos bandera en caja
                cajaPais.classList.add("cajaPais"); // asignamos clase
                cajaPais.classList.add("click"); // asignamos clase
                resultados.appendChild(cajaPais);// agregamos todo a nuestro div del html

            

            //creamos el evento cliqueable
            cajaPais.addEventListener("click" , () => {
                pais = cajaPais.textContent;
                resultados.innerHTML = "";
                cantResultados.textContent = "";
                resultados.innerHTML = `
                <div class="cajaPais">
                    <p><strong>Nombre:</strong> ${element.translations.es}</p>
                    <p><strong>Region:</strong> ${element.region}</p>
                    <p><strong>Capital:</strong> ${element.capital}</p>
                    <p><strong>Timezone:</strong> ${element.timezones}</p>
                    <p><strong>Nombre nativo:</strong> ${element.nativeName}</p>
                </div>
                `;
            })

        });

        //Titulo para mostrar cantidad de coincidencias
        cantResultados.textContent = `Hay ${response.length} resultado${response.length === 1 ? "" : "s"} para tu consulta`;
        }
    });

    xhr.open("GET", `/buscar?paises=${paises}`); // URL que se envia
    xhr.send();
});

btnReset.addEventListener("click", function(){
    resultados.innerHTML = "";
    cantResultados.textContent = "";
    inputPais.value = "";
})