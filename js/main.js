/* main.js
 * JS functions for sfuco-site
 * Reinier E.
 * revangel@sfu.ca
 * 2016
 */
$(document).ready(function()
{
    // Function Definitions
    ////////////////////////////////////////

    // Navigation

    function updateVerticalNav ()
    {
        var windowPosition = $(window).scrollTop();
        var firstSection = $("section:eq(0)").offset().top;

        if(windowPosition >= firstSection - (firstSection/4))
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
        var windowPosition = $(document).scrollTop();

        $("section").each(function(index)
        {
            index++; // Since #home is not a <section> but it's still a link
            var currentSectionTop = $(this).offset().top;
            var currentSectionBottom = currentSectionTop + $(this).outerHeight(true);

            var currentSection = $("#vertical-nav a:eq(" + index + ")");
            var currentSectionID = $("#vertical-nav a:eq(" + index + ")").attr("id");

            // Note: The (currentSectionTop/4) is to give some padding to the edge detection
            // so that the beginning of the current section doesn't have to be at the
            // very top of the window for it to be registered as the active-nav.
            if(windowPosition >= currentSectionTop - (currentSectionTop/4) )
            {
                currentSection.addClass("active-nav");
                $("#vertical-nav a").not("#" + currentSectionID).each(function()
                {
                    $(this).removeClass("active-nav");
                });
            }
        });
    };

    // Overlays

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

    function loadPrevExecPage(button)
    {
        var link = "#";
        link = link.concat(getPrevExecID(button));
        button.find("a").attr("href", link);
    };

    function loadNextExecPage(button)
    {
        var link = "#";
        link = link.concat(getNextExecID(button));
        button.find("a").attr("href", link);
    };

    function getPrevExecID(button)
    {
        var execID = button.parents().eq(3).prev().attr("id");
        return execID;
    }

    function getNextExecID(button)
    {
        var execID = button.parents().eq(3).next().attr("id");
        return execID;
    }

    // Contact Form

    function validateContactForm()
    {
        var str;

        str = $("input[name='name']").val();
        str = str.replace(/\s+/g, '');

        if (!str)
        {
            $("#error-text").text("Sorry, what was your name again?");
            return false;
        }

        // Design note:
        // At the time of writing this, it seems plausible to
        // be able to leave the message field blank in case
        // the user just wants to leave contact info

        str = $("input[name='email']").val();
        str = str.replace(/\s+/g, '');

        if (!str)
        {
            $("#error-text").text("Please enter an email so we can get back to you!");
            return false;
        }
        else if(!ValidateEmail(str))
        {
            $("#error-text").text("We need a valid email address from you!");
            return false;
        }

        str = $("select[name='instrument']").val();
        if (!str)
        {
            $("#error-text").text("Do you play an instrument?");
            return false;
        }

        return true;
    };

    function ValidateEmail(mail)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true);
        }
            return (false);
    };

    // Events
    ////////////////////////////////////////

    $(window).load(function()
    {
        $(".loading-screen").fadeOut("slow");
    });

    var verticalNav = $('#vertical-nav');

    // Initialize the vertical nav section as hidden
    // since the top of the page will have the
    // horizontal nav visible
    verticalNav.hide();

    // If the page was loaded somewhere halfway down
    updateVerticalNav();

    $(window).on("scroll", function()
    {
        updateVerticalNav();
    });

    $("#nav-toggle-container").on("click", function()
    {
        $(this).toggleClass("open");
    });

    $(".modal-overlay").on("click", function(e)
    {
        if(e.target != this)
        {
            return; // Only close if click is outside window
        }
        closeModalBox();
    });

    $(".prev-button").on("click", function (e)
    {
        loadPrevExecPage($(this));
    });

    $(".next-button").on("click", function (e)
    {
        loadNextExecPage($(this));
    });

    $("#contact-form-content").on("submit", function(e)
    {
        if (!validateContactForm())
        {
            e.preventDefault();
        }
        var form =  document.getElementById('contact-form-content');
        form.setAttribute('action', '//formspree.io/' + 'revangel' + '@' + 'sfu' + '.' + 'ca');
    });

});
