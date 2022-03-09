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

    let wetUpdate = document.querySelector('.wetUpdateTime');
    let dryUpdate = document.querySelector('.dryUpdateTime');

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
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("../static/img/rainy.png")';
            }
            else if (disc.includes("Cloudy")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("../static/img/cloudy.png")';
            }
            else if (disc.includes("Sunny")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("../static/img/sunny.png")';
            }
            else if (disc.includes("Snow")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("../static/img/snowy.png")';
            }
            else if (disc.includes("Clear")) {
                document.getElementsByClassName("wellesley-color")[0].style.backgroundImage = 'url("../static/img/clear.png")';
            }
        });

    //get the wet biome temperature/humidity and put it into the HTML file
    fetch('../static/scraper/wetData.txt')
        .then(response => response.text())
        .then(text => {
            var wetTemp = text.split('\n').shift(); // first line 
            console.log(wetTemp);
            let fTemp = (wetTemp * (9 / 5)) + 32;
            tempWet.textContent = parseInt(fTemp);
            wetCel.textContent = parseInt(wetTemp);
            var wetHumd = text.split('\n').at(1);  // second line   
            console.log(wetHumd);
            wetHumidity.textContent = parseInt(wetHumd);

            var wetUpdateTime = text.split('\n').at(-1);  // third line   
            console.log(wetUpdateTime);
            wetUpdate.textContent = wetUpdateTime;
        });

    fetch('../static/scraper/dryData.txt')
        .then(response => response.text())
        .then(text => {
            var dryTemp = text.split('\n').shift(); // first line 
            console.log(dryTemp);
            let dryF = (dryTemp * (9 / 5)) + 32;
            tempDry.textContent = parseInt(dryF);
            dryCel.textContent = parseInt(dryTemp);
            var dryHumd = text.split('\n').at(1);  // second line   
            console.log(dryHumd);
            dryHumidity.textContent = parseInt(dryHumd);

            var dryUpdateTime = text.split('\n').at(-1);  // third line   
            console.log(dryUpdateTime);
            dryUpdate.textContent = dryUpdateTime;
        });
});


//image gallery modals (when image is clicked, the full sized image will appear)
const modal = document.querySelector(".modal");
const previews = document.querySelectorAll(".gallery-item .image img");
const original = document.querySelector(".modal-img");
const caption = document.querySelector(".tags");

previews.forEach(preview => {
    preview.addEventListener('click', () => {
        modal.classList.add("open");
        original.classList.add("open");
        //dynamic change text and image 
        original.src = preview.getAttribute('data-original');
        const altText = preview.alt;
        caption.textContent = altText;

    })
})

modal.addEventListener('click', (e) => {
    if (e.target.classList.contains("modal")) {
        modal.classList.remove("open");
        original.classList.remove("open");
    }
})

// allow second select options to change according to first select choice
var filterLists = new Array(3)
filterLists["empty"] = ["Select a Category"];
filterLists["season"] = ["spring", "summer", "autumn", "winter"];
filterLists["month"] = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
filterLists["location"] = ["dry biome", "wet biome", "camellia pavillion"];
/* filterChange() is called from the onchange event of a select element. 
* param selectObj - the select object which fired the on change event. 
*/
function filterChange(selectObj) {
    // get the index of the selected option 
    var idx = selectObj.selectedIndex;
    // get the value of the selected option 
    var which = selectObj.options[idx].value;
    // use the selected option value to retrieve the list of items from the filterLists array 
    cList = filterLists[which];
    // get the category select element via its known id 
    var cSelect = document.getElementById("choose");
    // remove the current options from the category select 
    var len = cSelect.options.length;
    while (cSelect.options.length > 0) {
        cSelect.remove(0);
    }
    var newOption;
    // create new options 
    for (var i = 0; i < cList.length; i++) {
        newOption = document.createElement("option");
        newOption.value = cList[i];  // assumes option string and value are the same 
        newOption.text = cList[i];
        // add the new option 
        try {
            cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE 
        }
        catch (e) {
            cSelect.appendChild(newOption);
        }
    }
}

//horizontal scroll for title
let title = document.querySelector('h1');

window.onscroll = () => {
    let pos = window.scrollX;
    console.log(pos);
    title.style.left = `${pos}px`;
}