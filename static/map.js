const mapDict = {
    'CP': 'Camellia Pavilion',
    'M': 'Mezzanine',
    'WN': 'Wet North',
    'WW': 'Wet West',
    'WE': 'Wet East',
    'WS': 'Wet South',
    'DN': 'Dry North',
    'DW': 'Dry West',
    'DE': 'Dry East',
    'DS': 'Dry South'
}
var mapKeys = Object.keys(mapDict); // get area keys from object as an array
var areaKey;
var selected;

// handle color change and filter on map click
$(document).ready(function () {
    window.addEventListener('mouseup', (e) => {
        e.preventDefault();
        // if user clicks on a map area
        if ($(e.target).hasClass("area")) {
            // return all areas to their original color
            $("#map > .area").each(function () {
                $(this).removeAttr("style");
            });

            // make selected area red
            if ($(e.target).attr('value') == 'wet west') {
                // wet west spans two boxes
                $(".area").each(function () {
                    if ($(this).attr('value') == 'wet west') {
                        this.style.fill = "#DF5555";
                    }
                });
            }
            else {
                // other areas are single boxes
                e.target.style.fill = "#DF5555";
            }

            // filter
            filterByCategory('area', $(e.target).attr('value'));
        }
      })
});