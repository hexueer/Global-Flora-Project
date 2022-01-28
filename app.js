window.addEventListener('load', () => {

    let temperature = document.querySelector('.degree');
    let celciustemp = document.querySelector('.cel');
    let description = document.querySelector('.temperature-disc');
    let tempWet = document.querySelector('.wetDegree');
    let wetCel = document.querySelector('.wetTempC');
    let wetHumidity = document.querySelector('.wetHumd');
    let tempDry = document.querySelector('.dryDegree');
    let dryCel = document.querySelector('.dryTempC');
    let dryHumidity = document.querySelector('.dryHumd');

    const api = `https://api.weather.gov/gridpoints/BOX/63,71/forecast/hourly`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const temp = data.properties.periods[0].temperature;
            const disc = data.properties.periods[0].shortForecast;
            //formula for celcius 
            let celcius = (temp - 32) * (5 / 9);
            //set dom elements from api
            temperature.textContent = temp;
            celciustemp.textContent = Math.floor(celcius);
            description.textContent = disc.toUpperCase();
            //change background image of "wellesley-color" based on the description
            console.log(disc);
            if (disc.includes("Rain")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("img/rainy.png")';
            }
            else if (disc.includes("Cloudy")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("img/cloudy.png")';
            }
            else if (disc.includes("Sunny")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("img/sunny.png")';
            }
            else if (disc.includes("Snow")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("img/snowy.png")';
            }
            else if (disc.includes("Clear")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("img/clear.png")';
            }
        });

    //get the wet biome temperature/humidity and put it into the HTML file
    fetch('web-scraper/wetData.txt')
        .then(response => response.text())
        .then(text => {
            var wetTemp = text.split('\n').shift(); // first line 
            console.log(wetTemp);
            let fTemp = (wetTemp * (9 / 5)) + 32;
            tempWet.textContent = parseInt(fTemp);
            wetCel.textContent = parseInt(wetTemp);
            var wetHumd = text.split('\n').at(-1);  // second line   
            console.log(wetHumd);
            wetHumidity.textContent = parseInt(wetHumd);
        });

    fetch('web-scraper/dryData.txt')
        .then(response => response.text())
        .then(text => {
            var dryTemp = text.split('\n').shift(); // first line 
            console.log(dryTemp);
            let dryF = (dryTemp * (9 / 5)) + 32;
            tempDry.textContent = parseInt(dryF);
            dryCel.textContent = parseInt(dryTemp);
            var dryHumd = text.split('\n').at(-1);  // second line   
            console.log(dryHumd);
            dryHumidity.textContent = parseInt(dryHumd);
        });
});