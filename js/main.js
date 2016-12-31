/* main.js
 * JS functions for sfuco-site
 * Reinier E.
 * revangel@sfu.ca
 * 2016
 */

jQuery(document).ready(function()
{
    var verticalNav = jQuery('#vertical-nav');

    // Initialize the vertical nav section as hidden
    // since the top of the page will have the
    // horizontal nav visible
    verticalNav.hide();

    jQuery(window).on('scroll', function()
    {
        updateVerticalNav();
    });

    function updateVerticalNav ()
    {
        var windowPosition = jQuery(window).scrollTop();
        var topOfPage = jQuery('section:first').offset().top;

        if(windowPosition >= topOfPage)
        {
            verticalNav.fadeIn();
        }
        else
        {
            verticalNav.fadeOut();
        }
    }
});
