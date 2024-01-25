const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=0797854bc0224d0fa7b03310241901&q=';

const myForm = document.getElementById('myForm');
const details = document.getElementById('details');

myForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchValue = document.getElementById('search').value.trim();
  getDetails(searchValue);
});



async function getDetails(searchValue) {
  try {
    const response = await fetch(apiUrl + searchValue+ '&lang=es');
    const data = await response.json();
    
    const current = data.current; 
    const location = data.location;

    details.innerHTML = `
      <h2>Locación:</h2>
      <div class="information">
        <h3><strong>Nombre: </strong>${location.name}</h3>
        <h3><strong>Región: </strong>${location.region}</h3>
        <h3><strong>País: </strong>${location.country}</h3>
        <h3><strong>Fecha y hora: </strong>${location.localtime.replace(/ /g, " / ")}</h3>
      </div>
      <br>
      <h2>Condiciones climáticas:</h2>
      <div class="information">
        <h3><strong>Temperatura en C°: </strong>${Math.floor(current.temp_c)}</h3>
        <h3><strong>Temperatura en F: </strong>${Math.floor(current.temp_f)}</h3>
        <h3><strong>Temperatura en K: </strong>${Math.floor(current.temp_c + 273.15)}</h3>
        <h3><strong>Humedad: </strong>${current.humidity}%</h3>
        <img src="${current.condition.icon}" style="object-fit: none">
        <h4>${current.condition.text}</h4>
      </div>
    `;
    


    

  } catch (error) {
    console.error('Error al obtener los detalles de la Publicación', error);
    details.innerHTML = '<p>La ciudad ingresada no existe y/o no ha sido encontrada</p>';

  }
}

const vaciar = document.getElementById('deleteButton');
vaciar.addEventListener('click', () => details.innerHTML = '');
