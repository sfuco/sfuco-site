/* main.js
 * JS functions for sfuco-site
 * Reinier E.
 * revangel@sfu.ca
 * 2016
 */
jQuery(document).ready(function()
{
    // Function Definitions
    ////////////////////////////////////////

    function updateVerticalNav ()
    {
        var windowPosition = jQuery(window).scrollTop();
        var firstSection = jQuery("section:eq(0)").offset().top;

        if(windowPosition >= firstSection)
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
            index++; // Since #home is not a <section> but it's still a link
            var currentSectionTop = jQuery(this).offset().top;
            var currentSectionBottom = currentSectionTop + jQuery(this).outerHeight(true);

            var currentSection = jQuery("#vertical-nav a:eq(" + index + ")");
            var currentSectionID = jQuery("#vertical-nav a:eq(" + index + ")").attr("id");

            if(windowPosition >= currentSectionTop )
            {
                currentSection.addClass("active-nav");
                jQuery("#vertical-nav a").not("#" + currentSectionID).each(function()
                {
                    jQuery(this).removeClass("active-nav");
                });
            }
        });
    }

    function closeModalBox()
    {
        // Since the exec section's modal boxes each have
        // unique hashes, it's easier to check for whether
        // the modal box is from one of the other sections
        // with hashes that we already know beforehand
        if(window.location.hash == "#contact-form-overlay")
        {
            window.location.hash = "#contact";
        }
        else
        {
            window.location.hash = '#execs';
        }
    };

    function validateContactForm()
    {
        var str;

        str = jQuery("input[name='name']").val();
        str = str.replace(/\s+/g, '');

        if (!str)
        {
            jQuery("#error-text").text("Sorry, what was your name again?");
            return false;
        }

        // Design note:
        // At the time of writing this, it seems plausible to
        // be able to leave the message field blank in case
        // the user just wants to leave contact info

        str = jQuery("input[name='email']").val();
        str = str.replace(/\s+/g, '');

        if (!str)
        {
            jQuery("#error-text").text("Please enter an email so we can get back to you!");
            return false;
        }
        else if(!ValidateEmail(str))
        {
            jQuery("#error-text").text("We need a valid email address from you!");
            return false;
        }

        str = jQuery("select[name='instrument']").val();
        if (!str)
        {
            jQuery("#error-text").text("Do you play an instrument?");
            return false;
        }

        return true;
    };

    // Helper Functions
    function ValidateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true);
        }
            return (false);
    }

    // Events
    ////////////////////////////////////////

    jQuery(window).load(function()
    {
        $(".loading-screen").fadeOut("slow");
    });

    var verticalNav = jQuery('#vertical-nav');

    // Initialize the vertical nav section as hidden
    // since the top of the page will have the
    // horizontal nav visible
    verticalNav.hide();

    // If the page was loaded somewhere halfway down
    updateVerticalNav();

    jQuery(window).on("scroll", function()
    {
        updateVerticalNav();
    });

    jQuery(".modal-overlay").on("click", function(e)
    {
        if(e.target != this)
        {
            return; // Only close if click is outside window
        }
        closeModalBox();
    });

    jQuery("#contact-form").on("submit", function(e)
    {
        if (!validateContactForm())
        {
            e.preventDefault();
        }
        var form =  document.getElementById('contact-form');
        form.setAttribute('action', '//formspree.io/' + 'revangel' + '@' + 'sfu' + '.' + 'ca');
    });

});
