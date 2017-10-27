/*  main.js
 *  JS functions for sfuco-site
 *  Reinier E.
 *  revangel@sfu.ca
 *  2016-2017
 */

// Namespaces
////////////////////////////////////////
// This namespace is used to safely hold
// global variables. Global variables are
// necessary here since the function definitions
// are outside the document.ready function so
// using variables between the two will be out of
// scope. The namespace prevents the unintended
// use of these global variables
var globals = {};

// Function Definitions
////////////////////////////////////////

// Navigation

// Hides the vertical nav when the horizontal nav
// is still in view and highlights the anchor tag
// corresponding to the current section in view
function updateVerticalNav() {
  var windowPosition = $(window).scrollTop();
  var firstSection = $('section:eq(0)').offset().top;

  if (windowPosition >= firstSection - (firstSection / 4)) {
    globals.verticalNav.fadeIn();
    updateNavColors();
  } else {
    globals.verticalNav.fadeOut();
  }
}

// Updates the styling of the vertical nav <a>s based on the
// current position on the document
function updateNavColors() {
  // The actual windowPosition is offset by 150 to compensate for the
  // margin-bottom in the #homepage > section css
  var windowPosition = $(document).scrollTop() + 150;
  $('section').each(function(i) {
    if ($(this).offset().top <= windowPosition) {
      $('#vertical-nav a.active-nav').removeClass('active-nav');
      $('#vertical-nav a').eq(i + 1).addClass('active-nav');
    }
  });
}

// Overlays

function closeModalBox() {
  // Since the exec section's modal boxes each have
  // unique hashes, it's easier to check for whether
  // the modal box is from one of the other sections
  // with hashes that we already know beforehand
  if (window.location.hash == '#contact-form-overlay') {
    window.location.hash = '#contact';
  } else {
    window.location.hash = '#execs';
  }
}

// Sets the href for an <a>
// PARAMS:
// anchor -> the <a> that was pressed
// direction -> -1 for prev, 1 for next
function setNavLink(anchor, direction) {
  var link = '#';
  if (direction == -1) {
    link = link.concat(getPrevExecID(anchor));
  } else if (direction == 1) {
    link = link.concat(getNextExecID(anchor));
  }
  anchor.attr('href', link);
}

// Returns the id of the sibling immediately
// before the anchor's top-level parent in the DOM
// (By default, the <a>s in the exec modal box
// are nested 4 times within the top level exec div,
// so that div will be the 4th ancestor element)
function getPrevExecID(anchor) {
  return anchor.parents().eq(3).prev().attr('id');
}

// Returns the id of the sibling immediately
// after the anchor's top-level parent in the DOM
function getNextExecID(anchor) {
  return anchor.parents().eq(3).next().attr('id');
}

function lockScrollingIfModalIsActive() {
  if ($('.modal-overlay').is(':visible')) {
    $('body').addClass('scroll-lock');
  } else {
    $('body').removeClass('scroll-lock');
  }
}

// Contact Form

function validateContactForm() {
  var str;

  str = $('input[name="name"]').val();
  if (!isNonEmptyField(str)) { // Check that name isn't blank
    $('#error-text').text(
      'Sorry, what was your name again?'
    );
    return false;
  }

  str = $('input[name="email"]').val();
  if (!isValidEmail(str)) { // Check that email is valid (and non-blank)
    $('#error-text').text(
     'We need a valid email address from you!'
    );
    return false;
  }

  str = $('textarea[name="message"]').val();
  if (!isNonEmptyField(str)) { // Check that message isn't blank
    $('#error-text').text(
       'What did you want to contact us about (fill in message field)?'
    );
    return false;
  }
  return true;
}

// Returns true if fieldValue is non-empty
function isNonEmptyField(fieldValue) {
  fieldValue.replace(/\s+/g, ''); // Remove whitespace
  if (fieldValue) {
    return true;
  }
  return false;
}

// Returns true if emailString is a valid email address
function isValidEmail(emailString) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailString)) {
    return true;
  }
  return false;
}

// Events
////////////////////////////////////////
$(document).ready(function() {

  // Play loading screen animation when page loads
  $(window).load(function() {
    $('.loading-screen').fadeOut('slow');
  });

  /// Initializations ///
  globals.verticalNav = $('#vertical-nav');

  // Initialize the vertical nav section as hidden
  // since the top of the page will have the
  // horizontal nav visible
  //verticalNav.hide();

  // Initialize exec modal window nav links
  $('.prev-button').each(function() {
    setNavLink($(this), -1);
  });
  $('.next-button').each(function() {
    setNavLink($(this), 1);
  });

  // If the page was loaded somewhere halfway down
  updateVerticalNav();

  /// Event handling ///

  // General
  $(window).on('scroll', function() {
    updateVerticalNav();
    lockScrollingIfModalIsActive();
  });

  $('.nav-trigger').on('click', function() {
    $('.trigger-icon, .nav-menu, .logo').toggleClass('is-active');
  });

  // Modal Window
  $('.modal-overlay').on('click', function(e) {
    if (e.target != this) {
      return; // Only close if click is outside window
    }
    closeModalBox();
  });

  $('.close-button').on('click', function(e) {
    closeModalBox();
  });

  // Contact Form
  $('#contact-form').on('submit', function(e) {
    if (!validateContactForm()) {
      e.preventDefault();
    }
    var form = document.getElementById('contact-form');
    form.setAttribute(
        'action', '//formspree.io/' + 'sfuco.team' + '@' + 'gmail' + '.' + 'com'
    );
  });
});
