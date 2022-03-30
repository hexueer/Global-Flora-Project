var display = photos; // photos dictionary loaded as var in gallery.html
var photo;

// populate the gallery with max 12 images depending on the display of photos provided
function populateGallery(display) {
  for (let i = 0; i < Math.min(display.length, 12); i++) {
    photo = display[i];
    $('.img-gallery-container').append('<div class="gallery-container"><div class="gallery-item"><div class="image"><img id="' + i + '" src="" alt="" data-season="" data-month="" data-name="" data-original=""></div></div></div>');
    $("#"+i).attr('src', photo.ImageFile);
    $("#"+i).attr('alt', photo.AltText);
    $("#"+i).attr('data-season', photo.Season);
    $("#"+i).attr('data-month', photo.Month);
    $("#"+i).attr('data-name', photo.Name);
    $("#"+i).attr('data-original', photo.ImageFile);
  };
};



function addModal() {
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
  });

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains("modal")) {
      modal.classList.remove("open");
      original.classList.remove("open");
    }
  });
};

// automatically display 12 most recently uploaded photos
populateGallery(photos);
addModal();

// functions to display filtered selection of photos according to tag category
function filterBySeason(season) {
    $('.img-gallery-container').empty(); // empty out gallery
    display = []; // empty out display data

    // create new dictionary of photos for display according to chosen season
    display = $.map(photos, function(photo) { if (photo.Season == season) {return photo;} });
    
    // repopulate gallery with preview feature
    populateGallery(display);
    addModal(); 
};

function filterByMonth(month) {
  $('.img-gallery-container').empty(); // empty out gallery
  display = []; // empty out display data

  // create new dictionary of photos for display according to chosen season
  display = $.map(photos, function(photo) { if (photo.Month == month) {return photo;} });
  
  // repopulate gallery with preview feature
  populateGallery(display);
  addModal();
};

// load photo dictionary into this file as js object
// limit number of images initial
// complete list, scroll event fill in photo data(url), dynamically create image objects
// onscroll event
// use js and jQuery to set links/other details for each img tag
// use click events to trigger filter functions
// event handler for form
