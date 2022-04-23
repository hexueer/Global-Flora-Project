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
            if ($(e.target).hasClass("map-WW")) {
                // wet west spans two boxes
                $(".area.map-WW").each(function () {
                    this.style.fill = "#DF5555";
                });
            }
            else {
                // other areas are single boxes
                e.target.style.fill = "#DF5555";
            }

            // filter by selected area
            areaKey = $(e.target).attr('class').substring(9);
            mapKeys.forEach(function(key) { // loop through map keys array
                if (key == areaKey) {
                    selected = mapDict[key];
                }
            });
            filterByCategory('Area', selected);
        }
      })
});