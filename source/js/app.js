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


//-----------
// SEARCH BAR
//-----------

// When the input is active, add the focus class to the parent container
$(".site-header__search__input").focus(function() {
  $(this).parent().addClass("focused");
// When the input is inactive, remove the focus class from the parent container
}).blur(function() {
  $(this).parent().removeClass("focused");
});




$(document).ready(function() {

  // --------------------
  // EQUAL HEIGHT COLUMNS
  // --------------------
  equalheight = function(container){

  var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;

   $(container).each(function() {

     $el = $(this);
     $($el).height('auto')
     topPostion = $el.position().top;

     if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
     } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
   });
  };


  // -----------------
  // MOBILE NAVIGATION
  // -----------------
  var mobileSearchBtn = $(".site-header__btn-controls--search");
  var mobileSearchForm = $(".site-header__search");

  var mobileNavBtn = $(".site-header__btn-controls--nav");
  var mobileNav = $(".mobile-nav");

  var navOverlay = $(".nav-overlay");

  mobileSearchBtn.on("click", function() {

    if(mobileSearchForm.hasClass("active")) {
      $(mobileSearchForm).removeClass("active").addClass("inactive");
      mobileSearchBtn.removeClass("active").addClass("inactive");
      navOverlay.removeClass("active").addClass("inactive");

      // Allow the body to be scrollable
      $("body").removeClass("nav-open");
    }
    else {
      $(mobileSearchForm).removeClass("inactive").addClass("active");
      mobileSearchBtn.addClass("active").removeClass("inactive");
      navOverlay.addClass("active").removeClass("inactive");

      // Stop the body from being scrollable
      $("body").addClass("nav-open");
      
    }
    if(mobileNav.hasClass("active")) {
      mobileNav.removeClass("active").addClass("inactive");
      mobileNavBtn.removeClass("active").addClass("inactive");
    }
  });

  mobileNavBtn.on("click", function() {
    if(mobileNav.hasClass("active")) {
      mobileNav.removeClass("active").addClass("inactive");
      mobileNavBtn.removeClass("active").addClass("inactive");
      navOverlay.removeClass("active").addClass("inactive");
      
      // Allow the body to be scrollable
      $("body").removeClass("nav-open");
    }
    else {
      mobileNav.removeClass("inactive").addClass("active");
      mobileNavBtn.addClass("active").removeClass("inactive");
      navOverlay.removeClass("inactive").addClass("active");

      // Stop the body from being scrollable
      $("body").addClass("nav-open");
    }

    if(mobileSearchForm.hasClass("active")) {
      mobileSearchForm.removeClass("active").addClass("inactive");
      mobileSearchBtn.removeClass("active").addClass("inactive");
    }
  });


  // -----------------------------------
  // MOBILE NAVIGATION - EXPAND COLLAPSE
  // -----------------------------------
  $expanderTrigger =  $(".expander");   // Click selector 
  $expanderTrigger.click(function (event) {
    
    // Prevent default link behaviour
    event.preventDefault();

    if($(this).hasClass("inactive")) {

      // Make current link active
      $(this).addClass("active").removeClass("inactive");

      // If any other panels are open, close them
      $(this).parent().siblings().children(".level-2").slideUp(500);

      // If any other panels are open, reset the classes on the elements
      if($(this).parent().siblings().children(".level-2").hasClass("active")) {
        $(this).parent().siblings().children(".level-2").removeClass("active").addClass("inactive");
        $(this).parent().siblings().children(".expander").removeClass("active").addClass("inactive");
      }

      // Slide down this panel
      $(this).siblings(".level-2").slideDown(500).addClass("active").removeClass("inactive");
    }
    else {

      // If this panel is already active, make it inactive
      $(this).addClass("inactive").removeClass("active");

      // If the panel is already active, close the panel
      $(this).siblings(".level-2").slideUp(500).addClass("inactive").removeClass("active");
    }
    
  });


  // ----------------------------
  // DRESKTOP DROPDOWN NAVIGATION
  // ----------------------------
  var dropdownItem = $(".dropdown > a");

  dropdownItem.on("click", function(event) {
    event.preventDefault();
    if($(this).parent().hasClass("active")) {
      $(this).parent().removeClass("active").addClass("inactive");
      navOverlay.removeClass("active").addClass("inactive");
    } else {
      $(this).parent().removeClass("inactive").addClass("active");
      navOverlay.addClass("active").removeClass("inactive");
    }
  });


  // -----------
  // NAV OVERLAY
  // -----------
  navOverlay.on("click", function() {

      // Make overlay inactive
      navOverlay.removeClass("active").addClass("inactive");

      // Make search button and dropdown inactive
      mobileSearchForm.removeClass("active").addClass("inactive");
      mobileSearchBtn.removeClass("active");

      // Make nav button and dropdown inactive
      mobileNav.removeClass("active").addClass("inactive");
      mobileNavBtn.removeClass("active");

      //Hide any open dropdown
      dropdownItem.parent().removeClass("active").addClass("inactive")

      // Allow <body> to be scrollable again
      $("body").removeClass("nav-open");
  });

  // ON-PAGE NAV FOR PRODUCTS
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var offset = -121;
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top + offset
        }, 800);
        return false;
      }
    }
  });


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

    $('.bxslider').bxSlider({
      infiniteLoop: true,
      controls: false,
      auto: true,
      pause: 2500,
      pager: false
    });

});


// ==========================
// EQUAL HEIGHT COLUMNS INIT
// ==========================
$(window).load(function() {
  equalheight('.equalheight');
});

// ===========================================================
// DETECT WINDOW SIZE CHANGES FOR MOBILE / DESKTOP NAVIGATION
// ===========================================================
$(window).resize(function(){
  equalheight('.equalheight');
});