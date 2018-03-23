

$(document).ready(function(){

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
    $(".signUpForm").slideToggle();
  });

  $(".signInCloseButton").click(function(){
    $(".signInForm").slideToggle();
  });

  $(".aboutCloseButton").click(function(){
    $(".aboutWindow").slideToggle();
  });

});