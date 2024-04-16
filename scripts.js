const key = "1d9885819a4f62a643d39b36c4cd8f66"

function colocarNaTela(dados){
    console.log(dados)
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML =  Math.floor(dados.main.temp) + "°C"
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = dados.main.humidity + "%"
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
}

async function buscarCidade(cidade) {

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())

    colocarNaTela(dados)
}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value

    buscarCidade(cidade)
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  }
  
  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    // Chamada para o serviço de geocodificação reversa do OpenStreetMap Nominatim
    var nominatimAPIURL = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + latitude + "&lon=" + longitude + "&zoom=18&addressdetails=1";
    
    fetch(nominatimAPIURL)
      .then(response => response.json())
      .then(data => {
        var city = data.address.city;
        var state = data.address.state;
        document.getElementById("localizacao").innerHTML = "Cidade: " + city + "<br>Estado: " + state;
      })
      .catch(error => console.error('Erro ao obter informações de localização:', error));
  }