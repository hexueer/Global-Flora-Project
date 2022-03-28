var display = photos; // photos dictionary loaded as var in gallery.html
var photo;

// load and display 16 most recently uploaded photos
$(document).ready(function() {
    for (let i = 0; i < 16; i++) {
        photo = photos[i];
        $('.img-gallery-container').append('<div class="gallery-container"><div class="gallery-item"><div class="image"><img id="' + i + '" src="" alt="" data-season="" data-month="" data-name="" data-original=""></div></div></div>');
        $("#"+i).attr('src', photo.ImageFile);
        $("#"+i).attr('alt', photo.AltText);
        $("#"+i).attr('data-season', photo.Season);
        $("#"+i).attr('data-month', photo.Month);
        $("#"+i).attr('data-name', photo.Name);
        $("#"+i).attr('data-original', photo.ImageFile);
    };
});

// functions to display filtered selection of photos according to tag category





// load photo dictionary into this file as js object
// limit number of images initial
// complete list, scroll event fill in photo data(url), dynamically create image objects
// onscroll event
// use js and jQuery to set links/other details for each img tag
// use click events to trigger filter functions
// event handler for form

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

// filtering using select
// allow second select options to change according to first select choice
var filterLists = new Array(3);
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
    for (var i=0; i<cList.length; i++) { 
        newOption = document.createElement("option"); 
        newOption.value = cList[i];  // assumes option string and value are the same 
        newOption.text=cList[i]; 
        // add the new option 
        try { 
            cSelect.add(newOption);  // this will fail in DOM browsers but is needed for IE 
        } 
        catch (e) { 
            cSelect.appendChild(newOption); 
            }
    } 
}