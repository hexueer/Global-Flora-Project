var display = photos; // photos dictionary loaded as var in gallery.html
var firstLoadPhotoNum = 12;
var photoCounter = -1;
var photo;

// when page first loads, load gallery
$(document).ready(function() {
  // automatically display 12 most recently uploaded photos
  populateGallery(display, firstLoadPhotoNum);

  // always close out dropdown when other areas clicked
  $(window).click(function(e) {
    if (!e.target.matches('.toggle')) {
      $('.toggle').prop('checked', true);
    }
  });

  // dynamically generate more img elements on scroll
  $(".gallery-container-color").scroll(function () {
    if($(this).scrollTop() + 1 >= $(".img-gallery-container").height() - $(".gallery-container-color").height()) {
      populateGallery(display, 3);
    }
  });
});


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

function populateGallery(display, max) {
  var start = photoCounter + 1;
  for (let i = start; i < Math.min(display.length, start + max); i++) {
    photo = display[i];
    console.log(i);
    $('.img-gallery-container').append('<div class="gallery-container"><div class="gallery-item"><div class="image"><img id="' + i + '" src="" alt="" data-season="" data-month="" data-name="" data-original=""></div></div></div>');
    $("#"+i).attr('src', photo.ImageFile);
    $("#"+i).attr('alt', photo.AltText);
    $("#"+i).attr('data-season', photo.Season);
    $("#"+i).attr('data-month', photo.Month);
    $("#"+i).attr('data-name', photo.Name);
    $("#"+i).attr('data-original', photo.ImageFile);
    photoCounter = i;
  };

  // preview + full view feature
  addModal();
};

// functions to display filtered selection of photos according to tag category
function filterByCategory(category, tag) {
  $('.img-gallery-container').empty(); // empty out gallery
  photoCounter = -1;
  display = []; // empty out display data

  // close dropdown when category clicked
  $('.toggle').prop('checked', true);

  // create new dictionary of photos for display according to chosen season
  if (category == 'Season') {
    display = $.map(photos, function(photo) { if (photo.Season == tag) {return photo;} });
  } else if (category == 'Month') {
    display = $.map(photos, function(photo) { if (photo.Month == tag) {return photo;} });
  } else if (category == 'Area') {
    display = $.map(photos, function(photo) { if (photo.Area == tag) {return photo;} });
  }
  
  // repopulate gallery with full view feature
  populateGallery(display, firstLoadPhotoNum);
};