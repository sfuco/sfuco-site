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

    jQuery(window).on("scroll", function()
    {
        updateVerticalNav();
    });

    function updateVerticalNav ()
    {
        var windowPosition = jQuery(window).scrollTop();
        var topOfPage = jQuery("section:first").offset().top;

        if(windowPosition >= topOfPage)
        {
            verticalNav.fadeIn();
            updateNavColors();
        }
        else
        {
            verticalNav.fadeOut();
        }
    }

    function updateNavColors ()
    {
        var windowPosition = jQuery(document).scrollTop();

        jQuery("section").each(function(index)
        {
            if(index < jQuery("section").size()-1)
            {
                var currentSectionTop = jQuery(this).offset().top;
                var currentSectionBottom = currentSectionTop + jQuery(this).outerHeight(true);

                var currentSection = jQuery("#vertical-nav a:eq(" + index + ")");
                var currentSectionID = jQuery("#vertical-nav a:eq(" + index + ")").attr("id");
                
                if(windowPosition >= currentSectionTop && windowPosition < currentSectionBottom)
                {

                    currentSection.addClass("active-nav");
                    jQuery("#vertical-nav a").not("#" + currentSectionID).each(function()
                    {
                        jQuery(this).removeClass("active-nav");
                    });
                }

            }

        });

    }

});
