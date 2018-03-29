$(document).ready(function() {
  $(".myAccountForm").hide();
  $(".listAddressForm").hide();
  $(".aboutWindow").hide();

  $(".listAddressToggle").click(function(){
    $(".listAddressForm").slideToggle(200);
    $(".myAccountForm").hide();
    $(".aboutWindow").hide();
  });

  $(".signInToggle").click(function(){
    $(".signInForm").slideToggle(200);
    $(".signUpForm").hide();
    $(".aboutWindow").hide();
  });

  $(".aboutToggle").click(function(){
    $(".aboutWindow").slideToggle(200);
    $(".signUpForm").hide();
    $(".signInForm").hide();
  });

  $(".listAddressCloseButton").click(function(){
    $(".listAddressForm").slideToggle(200);
  });

  $(".signInCloseButton").click(function(){
    $(".signInForm").slideToggle(200);
  });

  $(".aboutCloseButton").click(function(){
    $(".aboutWindow").slideToggle(200);
  });

  // showMap(latValue, lonValue);
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