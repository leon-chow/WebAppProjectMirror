


$(document).ready(function(){

  // var latValue = 48.864716;
  // var lonValue = 2.349014;

  // // Sets the default value to the location of the device
  // navigator.geolocation.getCurrentPosition(function(position) {
  //   getLoc(position.coords.latitude, position.coords.longitude);
  // });




  $(".signInForm").hide();
  $(".signUpForm").hide();
  $(".aboutWindow").hide();

  $(".signUpToggle").click(function(){
    $(".signUpForm").slideToggle(200);
    $(".signInForm").hide();
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

  $(".signUpCloseButton").click(function(){
    $(".signUpForm").slideToggle(200);
  });

  $(".signInCloseButton").click(function(){
    $(".signInForm").slideToggle(200);
  });

  $(".aboutCloseButton").click(function(){
    $(".aboutWindow").slideToggle(200);
  });


  showMap(latValue, lonValue);

});



// function showMap(lat, lng) {
//   var mapProp= {
//       center:new google.maps.LatLng(lat, lng),
//       zoom:12,
//   };
//   var map=new google.maps.Map(document.getElementById("map-canvas"),mapProp);
// }

// function getLoc(latPos, lngPos){
//   latValue = latPos;
//   lonValue = lngPos;

//   urlWeather = "http://api.apixu.com/v1/forecast.json?key=941cfe7054cc46a4916225844181303&q= "+latValue+","+lonValue+"&days=1";
//   urlForecast = "http://api.apixu.com/v1/forecast.json?key=941cfe7054cc46a4916225844181303&q="+latValue+","+lonValue+"&days=7"

//   $('#lat').attr("value", latValue);
//   console.log("latAttribute:" + $('#lat').val());

//   $('#lon').attr("value", lonValue);
//   console.log("lonAttribute:" + $('#lon').val());

//   showMap(latValue, lonValue);
// }