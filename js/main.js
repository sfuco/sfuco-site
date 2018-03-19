/*  main.js
 *  JS functions for sfuco-site
 *  Reinier E.
 *  revangel@sfu.ca
 *  2016-2018
 */

// Function Definitions
///////////////////////////////////////
// Returns true if the mobile nav window
// is down
function navIsDown() {
  return ($('footer .nav-container').hasClass('.down'));
};

// Loads the cooresponding nav based on which footer
// button was pressed
function loadNav(id) {
  if (!navIsDown()) {
    $('footer .nav-container').addClass('down');
  }

  $('footer .nav-container nav').removeClass('active');

  if (id == 'tab1') {
    $('footer #pages').addClass('active');

  } else if (id == 'tab2') {
    $('footer #media').addClass('active');

  } else if (id == 'tab3') {
    $('footer #social').addClass('active');
  }

}

// Events
////////////////////////////////////////
$(document).ready(function() {

  // Play loading screen animation when page loads
  $(window).load(function() {
    $('.loading-screen').fadeOut('slow');
  });

  $('footer input').on('click', function() {
    $('footer label').removeClass('active');
    $(this).next().addClass('active');
    loadNav(this.id);
  });

  $('footer button.arrow').on('click', function() {
    $('footer .nav-container').removeClass('down');
    $('footer label').removeClass('active');
  });
});
