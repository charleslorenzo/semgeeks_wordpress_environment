// Site variables
var adminBarID = '#wpadminbar';
var adminBarHeight = jQuery(adminBarID).height();

var fixedHeaderID = '#header';
var fixedHeaderHeight = jQuery(fixedHeaderID).height();

var hasScrolled = false;

var tabletHWidth = 1024;
var tabletVWidth = 768;
var mobileWidth = 480;




// Sets value for 'hasScrolled' variable depending on whether or not user has scrolled past the top of the window
function detectScroll()
{
	if(jQuery(window).scrollTop() > 0)
	{
		hasScrolled = true;
	}
	else
	{
		hasScrolled = false;
	}

	// Toggles class on body depending on whether or not user has scrolled past the top of the window
	if(hasScrolled)
	{
		jQuery('body').addClass('scrolled');
	}
	else
	{
		jQuery('body').removeClass('scrolled');
	}
}

// Toggle Primary menu's expanded class
function menuToggle()
{
  jQuery('.nav-primary').toggleClass('expanded');
}

// Set cookie
//  @cname  - Cookie name
//  @cvalue - cookie value
//  @exdays - expiration in number of days
function setCookie(cname, cvalue, exdays) 
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Get cookie value
//  @cname - Cookie name
//
//  @return - cname's value if cookie was found, else return empty string.
function getCookie(cname) 
{
  var name = cname + "=";
  var ca = document.cookie.split(';');

  for(var i = 0; i < ca.length; i++) 
  {
    var c = ca[i];

    while (c.charAt(0)==' ')
    { 
      c = c.substring(1);
    }

    if (c.indexOf(name) == 0)
    { 
      return c.substring(name.length,c.length);
    }
  }

  return "";
}

// Check if a cookie exists and has been set previously
//  @cname - cookie name
//
//  @return - true if cookie found, false otherwise.
function hasCookie(cname)
{
    var cookie = getCookie(cname);

    if(cookie !== "") 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}

// For smooth scrolling on pages with page anchors
	// Preventing updating url in address bar. Uncomment below lines to remove this.
jQuery('a[href^="#"]').on('click',function (e) {
    e.preventDefault();

    //var target = this.hash;
    var $target = jQuery(target);

    jQuery('html, body').stop().animate({
        'scrollTop': ($target.offset().top - adminBarHeight - fixedHeaderHeight)
    }, 700, 'swing', function () {
        //window.location.hash = target;
    });
});



jQuery.fn.extend({
	// Searches for a text string and wraps with an HTML tag.
	//  @string  - string to be searched for
	//  @tag     - HTML tag to wrap the string with
	//  @classes - class(es) to add to the wrapping HTML tag
	//  
	//  Usage: jQuery('#main').wrapString('$', 'span', 'dollar-sign-small');
	wrapString: function(string, tag, classes)
	{
		// Escape any characters present in the string that must be escaped
		var stringRE = new RegExp(string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi');

		jQuery(this).children().each(function() {
			if(jQuery(this).text().toLowerCase().indexOf(string.toLowerCase()) != -1)
			{
				jQuery(this).html(jQuery(this).html().replace(stringRE, '<' + tag + ' class="' + classes + '">' + string + '</' + tag + '>'));
			}
		});
	},
	// Detects a click/or tap anywhere outside of a selected container and its children.
	// 	@todoFunction - function to be executed if detection was successful
	detectClickOutside: function(todoFunction) 
	{
		jQuery(document).on('click touchstart', function(e) {
			var container = jQuery(this);

			if(!container.is(e.target) && container.has(e.target).length == 0)
			{
				todoFunction();
			}
	    });
	},
	// Removes any previously set widths/heights on an element
	resetDimensions: function()
	{
		jQuery(this).width('').height('');
	},
	// Sets an element to be fullscreen within the viewport of the device. 
	//   @withHeader - Incorporate a fixed header's height in the calculation of content block's height.
	function fullScreen(withHeader)
	{
		// Default to incorporating the fixed header's height in height calculations if no argument supplied.
		if(typeof withHeader === 'undefined' || withHeader === null)
		{
			withHeader = true;
		}

		// Set width to viewport width
		jQuery(this).width(jQuery(window).width());

		// Always take into account adminbar height if logged in so as to not disrupt the UI/UX.
		if(withHeader)
		{
			jQuery(this).height(jQuery(window).height() - adminBarHeight - fixedHeaderHeight);
		}
		else
		{
			jQuery(this).height(jQuery(window).height() - adminBarHeight); 
		}
	}
});




// Function Executions
jQuery(document).ready(function() {

	// Execute menu toggle functions when clicking on the nav trigger
	jQuery('.nav-toggle').on('click', function() {
        menuToggle();
    });

	// Detect if user has scrolled on document load and on scroll.
    detectScroll();
	jQuery(window).on('scroll', function() {
		detectScroll();
	});
});


