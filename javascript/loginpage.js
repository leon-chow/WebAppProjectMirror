

$(document).ready(function(){


  $(".signInForm").hide();
  $(".signUpForm").hide();

  $(".signUpToggle").click(function(){
    $(".signUpForm").slideToggle(200);
    $(".signInForm").hide();

  });

  $(".signInToggle").click(function(){
    $(".signInForm").slideToggle(200);
    $(".signUpForm").hide();
  });






});