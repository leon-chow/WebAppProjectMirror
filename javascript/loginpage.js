$(document).ready(function(){

  // Hide Sign In / Sign Up forms and About window
  $(".signInForm").hide();
  $(".signUpForm").hide();
  $(".aboutWindow").hide();

  // Show toggle Sign Up window when Sign Up button is clicked
  // Hides the rest of the window
  $(".signUpToggle").click(function(){
    $(".signUpForm").slideToggle(200);
    $(".signInForm").hide();
    $(".aboutWindow").hide();
  });

  // Show toggle Sign In window when Sign In button is clicked
  // Hides the rest of the window
  $(".signInToggle").click(function(){
    $(".signInForm").slideToggle(200);
    $(".signUpForm").hide();
    $(".aboutWindow").hide();
  });

  // Show toggle About window when About button is clicked
  // Hides the rest of the window
  $(".aboutToggle").click(function(){
    $(".aboutWindow").slideToggle(200);
    $(".signUpForm").hide();
    $(".signInForm").hide();
  });

  // Handles Sign Up button close button
  $(".signUpCloseButton").click(function(){
    $(".signUpForm").slideToggle(200);
  });

  // Handles Sign In button close button
  $(".signInCloseButton").click(function(){
    $(".signInForm").slideToggle(200);
  });

  // Handles About button close button
  $(".aboutCloseButton").click(function(){
    $(".aboutWindow").slideToggle(200);
  });

});


