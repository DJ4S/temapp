
/*
font-family: 'Bungee', sans-serif;
font-family: 'Exo 2', sans-serif;
*/

const latMadrid = 0;
const lonMadrid = 0;

const latTokio = 0;
const lonTokio = 0;

const latBoston = 0;
const longBoston = 0;

const apiKey = '3590d65ff5c63180dd052cfaaabc2f03'
const difKelvin = 273.15

let array = []

let divGrid1 = document.getElementById("grid1")
let divGrid2 = document.getElementById("grid2")
let divGrid3 = document.getElementById("grid3")
let divGrid4 = document.getElementById("grid4")
let divGrid5 = document.getElementById("grid5")
let divGrid6 = document.getElementById("grid6")

document.getElementById("boton_busqueda").addEventListener('click', () =>{
    const ciudad = document.getElementById("barra_buscadora").value
    if(ciudad){ //cuando hemos buscado y una ciudad
        fetchDatosCiudad(ciudad);
        barra_buscadora.value = "";
        divGrid1.innerHTML='';
        divGrid2.innerHTML='';
        divGrid3.innerHTML='';
        divGrid4.innerHTML='';
        divGrid5.innerHTML='';
        divGrid6.innerHTML='';
    }
})

function fetchDatosCiudad(ciu){ // llama a la api de la long y lat
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${ciu}&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => mostrarDatosCiudad(response))
}

function mostrarDatosCiudad(res){ // obtenemos la latitud y longitud
    console.log(res)
    array[0] = res[0].lat
    array[1] = res[0].lon
    array[2] = res[0].name
    fetchDatosClima(array[0],array[1], array[2]);
}


function fetchDatosClima(lat, long, nomb){ // llama a la api de la long y lat
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
    .then(response => response.json())
    .then(response => mostrarDatosClima(response, nomb))
}

function mostrarDatosClima(res, nom){ // obtenemos la latitud y longitud

    divGrid1.style.background = "#bfebed";
    divGrid2.style.background = "#bfebed";
    divGrid3.style.background = "#bfebed";
    divGrid4.style.background = "#bfebed";
    divGrid5.style.background = "#bfebed";
    divGrid6.style.background = "#bfebed";

    const ciudadNombre = nom
    const pais = res.sys.country
    const zonaHoraria = res.timezone
    const descripcion = res.weather[0].description
    const imagen = res.weather[0].icon

    let temperatura = res.main.temp
    temperatura = temperatura - difKelvin;
    temperatura = Math.round(temperatura)
    let tempMin = res.main.temp_min
    tempMin = tempMin - difKelvin;
    tempMin = Math.round(tempMin)
    let tempMax = res.main.temp_max
    tempMax = tempMax - difKelvin;
    tempMax = Math.round(tempMax)
    let tempAmb = res.main.feels_like
    tempAmb = tempAmb - difKelvin;
    tempAmb = Math.round(tempAmb)

    const amanecer = res.sys.sunrise
    const atardecer = res.sys.sunset

    const humedad = res.main.humidity
    const visibilidad = res.visibility
    const vientoVel = res.wind.speed

    const tituloCiudad = document.createElement("h2")
    tituloCiudad.textContent = `${ciudadNombre}, ${pais}`
    tituloCiudad.style.fontFamily = 'Bungee'
    tituloCiudad.style.textAlign = 'center';

    const descripcionInfo = document.createElement("p")
    descripcionInfo.textContent = `The weather forecast for today is: ${descripcion}`
    descripcionInfo.style.fontFamily = 'Prompt'
    descripcionInfo.style.textAlign = 'center'

    const timeZone = document.createElement("p")
    timeZone.textContent = `Time zone: ${zonaHoraria}`
    timeZone.style.fontFamily = 'Prompt'
    timeZone.style.textAlign = 'center'

    divGrid1.appendChild(tituloCiudad)
    divGrid1.appendChild(descripcionInfo)
    divGrid1.appendChild(timeZone)

    const temperaturaTitulo = document.createElement("h2")
    temperaturaTitulo.textContent = `TEMPERATURE`
    temperaturaTitulo.style.fontFamily = 'Bungee'
    temperaturaTitulo.style.textAlign = 'center'

    const temperaturaAct = document.createElement("p")
    temperaturaAct.textContent = `Actual: ${temperatura}ºC`
    temperaturaAct.style.fontFamily = 'Prompt'
    temperaturaAct.style.textAlign = 'center'
    temperaturaAct.style.marginTop = "-20px"

    const temperaturaLim = document.createElement("p")
    temperaturaLim.textContent = `Max: ${tempMax}ºC, Min: ${tempMin}ºC,`
    temperaturaLim.style.fontFamily = 'Prompt'
    temperaturaLim.style.textAlign = 'center'

    const temperaturaSent = document.createElement("p")
    temperaturaSent.textContent = `Feels like: ${tempAmb}ºC`
    temperaturaSent.style.fontFamily = 'Prompt'
    temperaturaSent.style.textAlign = 'center'

    divGrid2.appendChild(temperaturaTitulo)
    divGrid2.appendChild(temperaturaAct)
    divGrid2.appendChild(temperaturaLim)
    divGrid2.appendChild(temperaturaSent)

    let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d.setUTCSeconds(amanecer);
    let ds = d.getHours() + ":" + d.getMinutes() +  ":" + d.getSeconds() + " H";
    
    const sunriseTitulo = document.createElement("h2")
    sunriseTitulo.textContent = `SUNRISE`
    sunriseTitulo.style.fontFamily = 'Bungee'
    sunriseTitulo.style.textAlign = 'center'

    const sunrise = document.createElement("p")
    sunrise.textContent = `${ds}`
    sunrise.style.fontFamily = 'Prompt'
    sunrise.style.textAlign = 'center'

    let d2 = new Date(0); // The 0 there is the key, which sets the date to the epoch
    d2.setUTCSeconds(atardecer);
    let ds2 = d2.getHours() + ":" + d2.getMinutes() +  ":" + d2.getSeconds() + " H";

    const sunsetTitulo = document.createElement("h2")
    sunsetTitulo.textContent = `SUNSET`
    sunsetTitulo.style.fontFamily = 'Bungee'
    sunsetTitulo.style.textAlign = 'center'

    const sunset = document.createElement("p")
    sunset.textContent = `${ds2}`
    sunset.style.fontFamily = 'Prompt'
    sunset.style.textAlign = 'center'

    divGrid3.appendChild(sunriseTitulo)
    divGrid3.appendChild(sunrise)

    divGrid4.appendChild(sunsetTitulo)
    divGrid4.appendChild(sunset)

    const titulo5 = document.createElement("h2")
    titulo5.textContent = `VISUAL`
    titulo5.style.fontFamily = 'Bungee'
    titulo5.style.textAlign = 'center'

    const imagenDiv = document.createElement("img")
    imagenDiv.src = `https://openweathermap.org/img/wn/${imagen}@2x.png`
    imagenDiv.style.marginLeft = "8%"
    imagenDiv.style.marginTop = "-55px"
    imagenDiv.style.width = "200px"

    divGrid5.appendChild(titulo5)
    divGrid5.appendChild(imagenDiv)

    const titulo6 = document.createElement("h2")
    titulo6.textContent = `VARIETY`
    titulo6.style.fontFamily = 'Bungee'
    titulo6.style.textAlign = 'center'

    divGrid6.appendChild(titulo6)

    const visibilidadDiv = document.createElement("div")
    visibilidadDiv.textContent = `In your city, today there is ${visibilidad} meters of visibility.`
    
    visibilidadDiv.style.fontFamily = 'Prompt'
    visibilidadDiv.style.textAlign = 'center'
    visibilidadDiv.style.borderTop = "1px solid"
    visibilidadDiv.style.borderBottom = "1px solid"
    visibilidadDiv.style.padding = "10px 16px"
    visibilidadDiv.style.marginTop = '-20px'
    visibilidadDiv.style.marginLeft = '40px'
    visibilidadDiv.style.marginRight = '40px'

    divGrid6.appendChild(visibilidadDiv)

    const humedadDiv = document.createElement("div")
    humedadDiv.textContent = `In your city, the humidity today is ${humedad}%.`
    
    humedadDiv.style.fontFamily = 'Prompt'
    humedadDiv.style.textAlign = 'center'
    humedadDiv.style.borderBottom = "1px solid"
    humedadDiv.style.padding = "10px 16px"
    humedadDiv.style.marginTop = "10px"
    humedadDiv.style.marginTop = '-5px'
    humedadDiv.style.marginLeft = '40px'
    humedadDiv.style.marginRight = '40px'

    divGrid6.appendChild(humedadDiv)

    const vientoDiv = document.createElement("div")
    vientoDiv.textContent = `In your city, today the wind is ${vientoVel} m/s.`
    
    vientoDiv.style.fontFamily = 'Prompt'
    vientoDiv.style.textAlign = 'center'
    vientoDiv.style.borderBottom = "1px solid"
    vientoDiv.style.padding = "10px 16px"
    vientoDiv.style.marginTop = "10px"
    vientoDiv.style.marginTop = '-5px'
    vientoDiv.style.marginLeft = '40px'
    vientoDiv.style.marginRight = '40px'

    divGrid6.appendChild(vientoDiv)


}

/*
TRAJETA 1:
    NOMBRES, ESTADO
    MOLARIA UNA FOTO
TARJETA 2;
    TEMPERATURA MAXIMA
    TEMPERATURA ACTUAL
    TEMPERATURA MINIMA
    TEMPERATURA SENTIDA
TARJETA 3 Y 4
    HORA DE AMANECER
    HORA DE ATARDECER
    CON SUS LINEAS RESPECTIVAS
TARJETA 5
    MAPA
TARJETA 6
    HUMEDAD
    VIENTO
    PRESION
    VISIBILIDAD
*/