const apikey = "5a33b5cf9d1731c83b8663ef3dcb8c81";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        
        if (!response.ok) {
            if (response.status == 404) {
                errorDiv.style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }
            throw new Error('Não foi possível obter os dados do tempo');
        }
        
        errorDiv.style.display = "none"; // Oculta a mensagem de erro se a solicitação for bem-sucedida
        
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";   
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather && data.weather.length > 0) {
            const weatherMain = data.weather[0].main;
            switch (weatherMain) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
                default:
                    weatherIcon.src = ""; // Defina uma imagem padrão para outras condições meteorológicas
                    break;
            }
        } else {
            weatherIcon.src = ""; // Defina uma imagem padrão se não houver dados meteorológicos
        }

        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error('Erro ao obter os dados do tempo:', error);
    }
}

searchBox.addEventListener("input", () => {
    errorDiv.style.display = "none"; // Oculta a mensagem de erro quando o usuário começa a digitar novamente
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === 'Enter') {
        checkWeather(searchBox.value);
    }
});
