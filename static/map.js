//change color of Camellia Pavilion
$(".map-CP").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-CP.png";
    filterByCategory('Area', 'Camellia Pavilion');
});

//change color of Mezzanine
$(".map-M").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-M.png";
    filterByCategory('Area', 'Mezzanine');
});

//change color of Wet North
$(".map-WN").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-WN.png";
    filterByCategory('Area', 'Wet North');
});

//change color of Wet West
$(".map-WW").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-WW.png";
    filterByCategory('Area', 'Wet West');
});

//change color of Wet East
$(".map-WE").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-WE.png";
    filterByCategory('Area', 'Wet East');
});

//change color of Wet South
$(".map-WS").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-WS.png";
    filterByCategory('Area', 'Wet South');
});

//change color of Dry North
$(".map-DN").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-DN.png";
    filterByCategory('Area', 'Dry North');
});

//change color of Dry West
$(".map-DW").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-DW.png";
    filterByCategory('Area', 'Dry West');
});

//change color of Dry East
$(".map-DE").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-DE.png";
    filterByCategory('Area', 'Dry East');
});

//change color of Dry South
$(".map-DS").on("click", function (e) {
    e.preventDefault();
    console.log("clicked!");
    document.getElementById('map').src = "../static/img/map-images/Map-Clicked-DS.png";
    filterByCategory('Area', 'Dry South');
});
