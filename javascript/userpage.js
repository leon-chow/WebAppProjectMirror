$(document).ready(function() {
    $("#goFindButton").click(function () {
        var findLongitude = parseFloat($("#findAddressLong").val());
        var findLatitude = parseFloat($("#findAddressLat").val());
        var mapCanvas = document.getElementById("findMap");
        getLoc(findLatitude, findLongitude, mapCanvas);
    });
    $("#goListButton").click(function () {
        var listLatitude = parseFloat($("#listAddressLat").val());
        var listLongitude = parseFloat($("#listAddressLong").val());
        var mapCanvas = document.getElementById("listMap");
        getLoc(listLatitude, listLongitude, mapCanvas);
    })
});

function showMap(lat, lng, mapCanvas) {
   var mapProp= {
       center: { lat: lat, lng: lng},
       zoom:8
   };
   var map=new google.maps.Map(mapCanvas,mapProp);
   var marker = new google.maps.Marker ({
    position: { lat: lat, lng: lng},
    map: map,
    title: 'You are here!'
  });
}

function getLoc(findLatitude, findLongitude, mapCanvas) {
    showMap(findLatitude, findLongitude, mapCanvas);
}