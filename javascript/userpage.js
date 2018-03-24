$(document).ready(function() {
    $("#goFindButton").click(function () {
        var findLongitude = parseFloat($("#findAddressLong").val());
        var findLatitude = parseFloat($("#findAddressLat").val());
        var mapCanvas = document.getElementById("findMap");
        getLoc(findLongitude, findLatitude, mapCanvas);
    });
    $("#goListButton").click(function () {
        var listLatitude = parseFloat($("#listAddressLat").val());
        var listLongitude = parseFloat($("#listAddressLong").val());
        var mapCanvas = document.getElementById("listMap");
        getLoc(listLongitude, listLatitude, mapCanvas);
    })
});

function showMap(lat, lng, mapCanvas) {
   var mapProp= {
       center:new google.maps.LatLng(lat, lng),
       zoom:12,
   };
   var map=new google.maps.Map(mapCanvas,mapProp);
   mapCanvas.append(map);
}

function getLoc(findLatitude, findLongitude, mapCanvas) {
    showMap(findLatitude, findLongitude, mapCanvas);
}