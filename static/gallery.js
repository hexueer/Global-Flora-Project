var display = photos; // photos dictionary loaded as var in gallery.html
var firstLoadPhotoNum = 16;
var photoCounter = 0;
var start;
var photo;
// Math.min(display.length - start, max)
// populate the gallery with a max number of images depending on the display of photos provided
function populateGallery(display, max) {
  start = photoCounter;
  for (let i = start; i < max; i++) {
    photo = display[i];
    console.log(i);
    $('.img-gallery-container').append('<div class="gallery-container"><div class="gallery-item"><div class="image"><img id="' + i + '" src="" alt="" data-season="" data-month="" data-name="" data-original=""></div></div></div>');
    $("#"+i).attr('src', photo.ImageFile);
    $("#"+i).attr('alt', photo.AltText);
    $("#"+i).attr('data-season', photo.Season);
    $("#"+i).attr('data-month', photo.Month);
    $("#"+i).attr('data-name', photo.Name);
    $("#"+i).attr('data-original', photo.ImageFile);
    photoCounter = i + 1;
  };

  // preview feature
  addModal();
};

//image gallery modals (when image is clicked, the full sized image will appear)
function addModal() {
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
populateGallery(display, firstLoadPhotoNum);
populateGallery(display, 2);

// functions to display filtered selection of photos according to tag category
function filterBySeason(season) {
    $('.img-gallery-container').empty(); // empty out gallery
    display = []; // empty out display data

    // create new dictionary of photos for display according to chosen season
    display = $.map(photos, function(photo) { if (photo.Season == season) {return photo;} });
    
    // repopulate gallery with preview feature
    populateGallery(display, firstLoadPhotoNum);
};

function filterByMonth(month) {
  $('.img-gallery-container').empty(); // empty out gallery
  display = []; // empty out display data

  // create new dictionary of photos for display according to chosen season
  display = $.map(photos, function(photo) { if (photo.Month == month) {return photo;} });
  
  // repopulate gallery with preview feature
  populateGallery(display, firstLoadPhotoNum);
};

function filterByArea(area) {
  $('.img-gallery-container').empty(); // empty out gallery
  display = []; // empty out display data

  // create new dictionary of photos for display according to chosen season
  display = $.map(photos, function(photo) { if (photo.Area == area) {return photo;} });
  
  // repopulate gallery with preview feature
  populateGallery(display, firstLoadPhotoNum);
};

// $(".blah").on("click", function (e) {
//   e.preventDefault();
//   filterBySeason('blah');
// });

// dynamically generate more img elements on scroll
// $(".gallery-container-color").scroll(function () {
//   if($(this).scrollTop() + 1 >= $(".img-gallery-container").height() - $(".gallery-container-color").height()) {
//     // $( ".img-gallery-container" ).append( "<p>Hello</p>" );
//     populateGallery(display, 4);
//   }
// });