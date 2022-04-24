var display = photos; // photos dictionary loaded as var in gallery.html
var firstLoadPhotoNum = 12;
var photoCounter = -1;
var photo;

// declare global tag variables, 0 == all
var season = 0;
var month = 0;
var area = 0;

// when page first loads, load gallery
$(document).ready(function () {
  // automatically display 12 most recently uploaded photos
  populateGallery(display, firstLoadPhotoNum);

  // handle filter buttons
  // $("#sAll").on("click", function (e) {         // seasons
  //   e.preventDefault();
  //   filterByCategory('Season', 0);
  // });
  // $("#sSpr").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Season', 'Spring');
  // });
  // $("#sSum").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Season', 'Summer');
  // });
  // $("#sAut").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Season', 'Autumn');
  // });
  // $("#sWin").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Season', 'Winter');
  // });
  // $("#mAll").on("click", function (e) {         // months
  //   e.preventDefault();
  //   filterByCategory('Month', 0);
  // });
  // $("#mJan").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'January');
  // });
  // $("#mFeb").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'February');
  // });
  // $("#mMar").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'March')
  // });
  // $("#mApr").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'April')
  // });
  // $("#mMay").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'May')
  // });
  // $("#mJun").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'June')
  // });
  // $("#mJul").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'July')
  // });
  // $("#mAug").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'August')
  // });
  // $("#mSep").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'September')
  // });
  // $("#mOct").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'October')
  // });
  // $("#mNov").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'November')
  // });
  // $("#mDec").on("click", function (e) {
  //   e.preventDefault();
  //   filterByCategory('Month', 'December')
  // });
  // $("#aAll").on("click", function (e) {         // areas
  //   e.preventDefault();
  //   // document.getElementById('map').src = "../static/img/map.png";
  //   resetMap();
  //   filterByCategory('Area', 0)
  // });
  // $(e.target).attr('class').match(/map-(.*)/)[1];

  var buttons = document.getElementsByTagName('button');
  for (var i = 0, len = buttons.length; i < len; i++) {
    buttons[i].onclick = function (e) {
      e.preventDefault();
      filterByCategory($(e.target).attr('class'), $(e.target).attr('value'));
    }
  }

  // always close out dropdown when other areas clicked
  $(window).click(function (e) {
    if (!e.target.matches('.toggle')) {
      $('.toggle').prop('checked', true);
    }
  });

  // dynamically generate more img elements on scroll
  $("#gallery").scroll(function () {
    if ($(this).scrollTop() + 10 >= $(".img-gallery-container").height() - $("#gallery").height()) {
      populateGallery(display, 3);
    }
  });
});

function resetMap() {
  $("#map > .area").each(function () {
    $(this).removeAttr("style");
  });
}

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

// fills the gallery with photos
function populateGallery(display, max) {
  $('.img-gallery-container').empty(); // empty out gallery

  var start = photoCounter + 1;
  for (let i = start; i < Math.min(display.length, start + max); i++) {
    photo = display[i];
    $('.img-gallery-container').append('<div class="gallery-container"><div class="gallery-item"><div class="image"><img id="' + i + '" src="" alt="" data-season="" data-month="" data-name="" data-original=""></div></div></div>');
    $("#" + i).attr('src', photo.ImageFile);
    $("#" + i).attr('alt', photo.AltText);
    $("#" + i).attr('data-season', photo.Season);
    $("#" + i).attr('data-month', photo.Month);
    $("#" + i).attr('data-name', photo.Name);
    $("#" + i).attr('data-original', photo.ImageFile);
    photoCounter = i;
  };

  // preview + full view feature
  addModal();
};

// functions to display filtered selection of photos according to tag category
function filterByCategory(category, tag) {
  photoCounter = -1;
  display = []; // empty out display data

  // close dropdown when button clicked
  $('.toggle').prop('checked', true);

  // update the state of the global tag variables
  switch (category) {
    case 'season':
      season = tag;
      tag != 'all' ? $("#seasonNav > h3").text(tag) : $("#seasonNav > h3").text(category); // display chosen tag on button
      break;
    case 'month':
      month = tag;
      tag != 'all' ? $("#monthNav > h3").text(tag) : $("#monthNav > h3").text(category); // display chosen tag on button
      break;
    case 'area':
      area = tag;
      tag != 'all' ? $("#areaNav > h3").text(tag) : $("#areaNav > h3").text(category); // display chosen tag on button
      break;
  }

  // create new dictionary of photos for display according to the chosen tags
  display = $.map(photos, function (photo) { if (photoMatch(photo.Season, season) && photoMatch(photo.Month, month) && photoMatch(photo.Area, area)) { return photo; } });

  // repopulate gallery with full view feature
  populateGallery(display, firstLoadPhotoNum);
};

// helper function, checks if photo should be displayed depending on whether they have a matching tag or "all" tag
function photoMatch(photoData, tag) {
  return photoData == tag || tag == 'all';
};
