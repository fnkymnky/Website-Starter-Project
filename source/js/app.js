// -------------
// ACCESSIBILITY
// -------------
// See: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role

function handleBtnClick(event) {
  toggleButton(event.target);
}

// Buttons are expected to be triggered using the Space or Enter key, while links are expected 
// to be triggered using the Enter key. In other words, when links are used to behave like buttons,
// adding role="button" alone is not sufficient. It will also be necessary to add a key event handler 
// that listens for the Space key in order to be consistent with native buttons.
function handleBtnKeyPress(event) {
  // Check to see if space or enter were pressed
  if (event.key === " " || event.key === "Enter") {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    toggleButton(event.target);
  }
}

// Add aira-pressed when button element is pressed
function toggleButton(element) {
  // Check to see if the button is pressed
  var pressed = (element.getAttribute("aria-pressed") === "true");
  // Change aria-pressed to the opposite state
  element.setAttribute("aria-pressed", !pressed);
}

$(document).ready(function() {
  //-----------------------------------------------------------
  //--------- BACK TO TOP BUTTON W/SMOOTH SCROLLING -----------
  //-----------------------------------------------------------
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
      //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity = 1200,
      //duration of the top scrolling animation (in ms)
      scroll_top_duration = 700,
      //grab the "back to top" link
      $back_to_top = $('.back-to-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('back-to-top-is-visible') : $back_to_top.removeClass('back-to-top-is-visible back-to-top-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('back-to-top-fade-out');
      }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
        }, scroll_top_duration
      );
    });
});