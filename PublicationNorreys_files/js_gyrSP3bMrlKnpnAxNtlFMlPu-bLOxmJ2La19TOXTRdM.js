/*
 * jQuery Easing Compatibility v1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Adds compatibility for applications that use the pre 1.2 easing names
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend( jQuery.easing,
{
	easeIn: function (x, t, b, c, d) {
		return jQuery.easing.easeInQuad(x, t, b, c, d);
	},
	easeOut: function (x, t, b, c, d) {
		return jQuery.easing.easeOutQuad(x, t, b, c, d);
	},
	easeInOut: function (x, t, b, c, d) {
		return jQuery.easing.easeInOutQuad(x, t, b, c, d);
	},
	expoin: function(x, t, b, c, d) {
		return jQuery.easing.easeInExpo(x, t, b, c, d);
	},
	expoout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutExpo(x, t, b, c, d);
	},
	expoinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutExpo(x, t, b, c, d);
	},
	bouncein: function(x, t, b, c, d) {
		return jQuery.easing.easeInBounce(x, t, b, c, d);
	},
	bounceout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBounce(x, t, b, c, d);
	},
	bounceinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBounce(x, t, b, c, d);
	},
	elasin: function(x, t, b, c, d) {
		return jQuery.easing.easeInElastic(x, t, b, c, d);
	},
	elasout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutElastic(x, t, b, c, d);
	},
	elasinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutElastic(x, t, b, c, d);
	},
	backin: function(x, t, b, c, d) {
		return jQuery.easing.easeInBack(x, t, b, c, d);
	},
	backout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBack(x, t, b, c, d);
	},
	backinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBack(x, t, b, c, d);
	}
});;
//================================================================================
// Physics site code
//================================================================================

jQuery('document').ready(function() {
    // Clickable blocks functionality
    jQuery.fn.clickableBlocks = function () {
        return this.each(function() {
            var $this = jQuery(this);
            var $anchor = $this.find("a");
            if ($anchor.length == 1) {
                $this.addClass("clickable");
                $this.css("cursor", "pointer").click (function () {
                    location.href = $anchor[0].href;
                });
            }
        });
    };

     // Change font to user defined size

    var small_current = '';
    var medium_current = '';
    var large_current = '';
    if (jQuery.cookie('font-size')) {
        jQuery('.main-text').addClass(jQuery.cookie('font-size'));
        //jQuery('.font-chooser a.' + jQuery.cookie('font-size')).addClass('current');
        if (jQuery.cookie('font-size') == 'large-font') {
          large_current = 'current';
        } else if (jQuery.cookie('font-size') == 'medium-font') {
          medium_current = 'current';
        } else {
          small_current = 'current';
        }

    } else {
      small_current = 'current';
    }

    // This html injection is a cop out to get the page to validate XHTML when it does not specify a data-* attribute.
    // Of course the correct way to do this is to change the whole site to HTML 5 but I feel a bit too enterprisey 
    // at the moment to do that.
    var font_chooser_html = '';
    font_chooser_html += "<a class='change-font small-font " + small_current + "' title='Small font' href='#' data-class='small-font'>A</a> ";
    font_chooser_html += "<a class='change-font medium-font " + medium_current + "' title='Medium font' href='#' data-class='medium-font'>A</a> ";
    font_chooser_html += "<a class='change-font large-font " + large_current + "' title='Large font' href='#' data-class='large-font'>A</a>";

 
    jQuery('.font-chooser').html(font_chooser_html);
    jQuery('a.change-font').click(function() {
        jQuery('.main-text').removeClass('small-font medium-font large-font');
        jQuery('.font-chooser a').removeClass('current');
        var new_size = jQuery(this).attr('data-class');
        jQuery('.main-text').addClass(new_size);
        jQuery('.font-chooser a.' + new_size).addClass('current');
        jQuery.cookie('font-size', new_size, {'domain': 'physics.ox.ac.uk'});
        $sliders.each(function(){ calibrateSlider(jQuery(this))});
        return false;
    });

    /**
     * Categories of Event and News content type
     * hide term Research (tid = 28) and make label bold
     */
    //jQuery('#edit-taxonomy-vocabulary-3-und-28').attr("type", "hidden");
    jQuery('#edit-taxonomy-vocabulary-3-und-28').remove();
    jQuery('.form-item-taxonomy-vocabulary-3-und-28 > label').css('font-weight', 'bold');
    

    /***********************************************
     * Set up Sliders
     ***********************************************/
    var $sliders = jQuery(".slider ul");
    if (jQuery.fn.tabs) {
        //jQuery('#profile-tabs .tabs-bg-primary').tabs();
        jQuery('#profile-tabs').tabs();
    }
    var elements_per_slide = 4;


    /* CalibrateSlider is called every time a font change is registered, because
     * the heights are different
     */
    function calibrateSlider($slider) {
        var li_height = $slider.children(':first-child').outerHeight(true);
        var current = $slider.data('current');
        $slider.data('li_height', li_height);
        $slider.children().css('top', (current * li_height + 27).toString() + 'px');
        $slider.css({
            'overflow': 'hidden',
            'height': (elements_per_slide * li_height + 2 * 27).toString() + 'px',
            'position': 'relative'
        }).children().css({
            'position': 'relative',
            'top': (27 - current * li_height).toString() + 'px'
        });
    };

    function setupSliders() {
        $sliders.each (function (idx) {
            var $this = jQuery(this), // local copy to keep the sliders independent of eachother
                total = $this.children().length;
                $up = jQuery('<span id="slidercontrolup-' + idx + '" class="slidercontrol slidercontrolup" />'),
                $down = jQuery('<span id="slidercontroldown-' + idx +'" class="slidercontrol slidercontroldown" />');

            $this.data('current', 0);
            // can only move down if there are more than 3 items in the list
            if (total > elements_per_slide + 1)
            {
                calibrateSlider($this);
                $down.addClass('canmove');
            } else {
                return;
            }

            $up.click (function () {
                var li_height = $this.data('li_height');
                var current = $this.data('current');
                if (current <= 0)
                    return;

                $this.children().animate ({
                    top: '+=' + (elements_per_slide * li_height).toString()
                }, {duration:800});
                current -= elements_per_slide;
                $this.data('current', current);
                if (current <= 0)
                {
                    jQuery(this).removeClass('canmove');
                }
                if (current <= total - elements_per_slide  + 1 )
                {
                    jQuery("#slidercontroldown-" + idx).addClass('canmove');
                }
            }).insertBefore(this);

            $down.click (function () {
                var li_height = $this.data('li_height');
                var current = $this.data('current');
                if (current >= total - elements_per_slide)
                    return;

                $this.children().animate ({
                    top: '-=' + (elements_per_slide * li_height).toString()
                }, {duration:800});
                current += elements_per_slide;
                $this.data('current', current);
                if (current >= total - elements_per_slide) {
                    jQuery(this).removeClass('canmove');
                }
                if (current > 0) {
                    jQuery("#slidercontrolup-" + idx).addClass('canmove');
                }
            }).insertBefore(this);
        });
    };

    setupSliders();
    jQuery('.sidebar-infobox li, .sidebar-toolbox li, .searchresults li, .landing-grid-row-title, .landing-grid-cell').clickableBlocks();
    jQuery('div.view-researchgroup-people div.item-list').find('li').clickableBlocks();
    jQuery('div.view-research-subdepartment div.views-row').clickableBlocks();
    jQuery('div.view-researchexternal-subdepartment div.views-row').clickableBlocks();
    // Generic clickable blocks
    jQuery(".view-content .item-list ul li").wrapInner("<div class='list-container clickable'></div>");
    // :not(.inline) is for the edit, configure buttons
    // :not(.diigo-cloud) is for the diigo tag cloud
    jQuery('div.middle-right-column').find('li').clickableBlocks();
    jQuery("div.right-column div.content  ul:not(.inline, .diigo-cloud) li a").parent().addClass('clickable');
    jQuery("div.right-column div.content ul:not(.inline, .diigo-cloud) li").wrapInner("<div class='list-container'></div>");
    jQuery(".clickable").clickableBlocks();


    jQuery('body').removeClass('nojs'); // .no-js seems to break sliders. Didn't look at why though.
    jQuery('body').addClass('has-js');

    // **********************************************************************
    // Collapsible sections
    // **********************************************************************
    
    // If [collapse] starts with an <h3> (aka confusingly as [h2]), then collapse
    // around the h3 tags, keeping the headings.
    //
    // Otherwise, collapse the entire section, giving a helper message asking the person
    // viewing the page to expand
    //
    //
    function make_collapsible($link, $div) {                // Handle clicks on the headings
        $div.addClass("collapsed");
        $link.addClass("collapsed");
        $link.click(function() {
            //var $div = $h3.next();
            if (!$div.hasClass("collapsed")) {

                // Div is open, so we're going to close it...
                // Slide the div closed
                $div.slideUp("slow", function() {
                    // Enable printing of collapsed sections by removing
                    // display:none and replacing it with a class
                    $div.addClass("collapsed").css("display", "");
                });

                // Change $link class
                $link.removeClass("expanded").addClass("collapsed");

            } else {

                // Div is closed, so we're going to open it...
                $div.removeClass("collapsed")
                    // Hack to prevent it jumping!
                    // First calculate the div height, and fix that height temporarily
                    .show()
                    .height("auto")
                    .height($div.height())
                    // Now hide it again, and remove the .collapsed class
                    .hide()
                    .removeClass("collapsed")
                    .addClass("expanded")
                    // Now slide it open
                    .slideDown("slow", function() {
                        // Finally remove the fixed height so it can be resized
                        // (e.g. if font size is changed)
                        $div.height("auto");
                    });

                // Change <h3> class
                $link.removeClass("collapsed").addClass("expanded");

            }
            return false;
        });
    }

    jQuery(".collapse").each (function() {
        var $collapse_div = jQuery(this);
        if ($collapse_div.html().replace(/^[\n\s][\n\s]*/, '').match(/^<h3/i)) {
            $collapse_div.addClass("faq-collapse");
            $collapse_div.find("h3").each(function() {
                jQuery(this).addClass('collapse-expand-link');
                var $collapsible_content = jQuery(this).nextUntil("h3")
                    .wrapAll("<div class=\"collapsible collapsed\"><div class=\"collapsible-inner\"/></div>").parent().parent();
                // var $collapsible_content = $(this).nextUntil("h3");
                make_collapsible(jQuery(this), $collapsible_content);
                // Add two <div>s around all the sections
                // The outer one is used to do the slide effect - it starts hidden
                // The inner one is used to add padding around the content
            });
        } else {
          $collapse_div.addClass("simple-collapse");
          var $link = jQuery('<div class="collapse-expand-link"><span class="more-less-image" /></div>');
          var $collapsible_content = $collapse_div
              .wrapInner("<div class=\"collapsible collapsed\"><div class=\"collapsible-inner\" /></div>")
              .children(".collapsible");
          $collapse_div.append($link);
          make_collapsible($link, $collapsible_content);
        }
    });

    


    var $img = jQuery(".profile-page .profile-image img").eq(0); // Get my img elem
    if ($img.length) {
        function updateWidth() {
            if (this.width > 0) {
                var header_width = this.width + 20;
                jQuery(".profile-page .profile-header").css("margin-left", header_width+"px");
            }
        }
        $img.load(updateWidth)  // In case it loads later
            .each(updateWidth); // In case it is loaded already
    }

    // **********************************************************************
    // Infinite blink/fade
    // **********************************************************************
    jQuery.fn.fadeInOut = function(time, delaytime, targetOpacity) {
        // This is to prevent problems when the selector matches more than one -
        // if you animate them all at once, the callback gets run X times
        this.each(function()
        {
            var $obj = jQuery(this);
            function fadeIn()
            {
                $obj.fadeTo(time, 1, function() { setTimeout(fadeOut, delaytime) });
            }
            function fadeOut()
            {
                // FadeTo almost invisible instead of fadeOut to prevent the momentary
                // removing of the object from the page, which causes other elements
                // to reflow into the space it occupied
                $obj.fadeTo(time, targetOpacity, fadeIn);
            }
            fadeOut();
        });
    }
    jQuery(".bullet-flashing").fadeInOut(400, 800, 0.001);
    jQuery(".unpublished-nodes a").fadeInOut(400, 800, 0.4);

    // Simplify the blocks table (especially Node Level Blocks) by putting all
    // disabled blocks in a dropdown list
    jQuery("table#blocks").each(function() {
        var $table = jQuery(this);

        // Find the regions
        var $allRegions = $table.find("tr.region");

        // Find the special Disabled region and separate it from the rest
        var $disabledRegion = $allRegions.filter(":last");
        $allRegions = $allRegions.not($disabledRegion);

        var $disabledRows = $disabledRegion.nextAll().not(".region-message");

        // Move all the disabled blocks into a hidden region
        $disabledRegion.after("<tr class='region region--2' style='display:none;'><td class='region' colspan='5'>Blocks to add</td></tr>");

        // Change the name of the existing "empty region" message to match the hidden region
        $disabledRegion.nextAll(".region-message").removeClass("region--1-message").addClass("region--2-message");

        // And add a new "empty region" message for the disabled region
        $disabledRegion.after("<tr class='region-message region--1-message region-empty'><td colspan='5'><em>" + Drupal.t("Drag blocks here to remove them") + "</em></td></tr>");

        // Hide the rows until they are selected from the dropdown list
        $disabledRows.hide();

        // Create a dropdown listing all the hidden rows
        var $select = jQuery("<select>");
        $select.append(jQuery("<option>").text("Select a block..."));
        $disabledRows.each(function() {
            var $row = jQuery(this);
            var $option = jQuery("<option />");
            $option.data("row", $row);
            $option.text( jQuery.trim( $row.children(":first").text() ) );
            $select.append($option);
        });
        if ($select.children().length <= 1) {
          $select.parents('tfoot').hide();
        } else {
          $select.change(function()
          {
              var $option = $select.find("option:selected");

              // Make the selected row visible
              var $row = $option.data("row");
              $row.show();

              // If there's only one region, put the block into it automatically
              // Otherwise put it in Disabled so the user can decide where to put it
              var regionName;
              if ($allRegions.length == 1) {
                  regionName = $allRegions.get(0).className.replace(/([^ ]+[ ]+)*region-([^ ]+)([ ]+[^ ]+)*/, '$2');
              }
              if (!regionName) {
                  regionName = "-1";
              }
              $row.find("select")
                  .val(regionName)
                  .trigger("change");

              // Remove it from the dropdown list now
              $option.remove();
              $select.get(0).selectedIndex = 0;
          });

          var $td = jQuery("<td>");
          $td.append($select);

          var $tr = jQuery("<tr>");
          $tr.append($td);

          var $tfoot = jQuery("<tfoot>");
          $tfoot.append("<tr><td class='region' colspan='5'>Add a block</td></tr>");
          $tfoot.append($tr)

          $table.append($tfoot);
        }

        // If this is the node edit page, remove the yellow bar warning
        // because it is incorrect for Node Level Blocks, and it shows for all
        // draggable regions such as Section Editors as well
        if (jQuery("#node-form").length) {
            Drupal.theme.tableDragChangedWarning = function () {
                // Cannot be empty string, must be a DOM object
                return '<div></div>';
            }
        }
    });
 

    // Add first-child non-pseudo selectors
    // Lists
    jQuery("li:first-child").addClass("first-child");
    jQuery("li:last-child").addClass("last-child");

    // Add check all functionality for those that want it
    jQuery('.checkall').click(function () {
        jQuery(this).parents('fieldset:eq(0)').find(':checkbox').attr('checked', true);
        return false;
    });
    jQuery('.uncheckall').click(function () {
        jQuery(this).parents('fieldset:eq(0)').find(':checkbox').attr('checked', false);
        return false;
    });

    // Add target=_blank for PDF documents and their kind
    jQuery('a[href*=".pdf"],a[href*=".doc"],a[href*=".docx"],a[href*=".xls"],a[href*=".xlsx"],a[href*=".pps"],a[href*=".ppsx"]').click(function(){
      window.open(this.href,'_blank');return false;
    });


    // *******************************************
    // Expand pre and codeblock tags when clicked.
    // *******************************************
    //
    // Because of the nature of the site,
    // this is not easy to achieve. The code below copies the content of a codeblock, makes it hidden, and whenever
    // the expand link is clicked it moves the copy over the top of the original and sets the opacity to 1.
    //
    // $floater is the clone (and is called floater because it floats above the original when it is visible.)
    jQuery('.codeblock, pre').each(
        function(codeblock_number) {
            var $this = jQuery(this);
            if ($this.get(0).scrollHeight < $this.innerHeight()) {
                var $floater = jQuery("<div class='injected-floater codeblock xbbcode'></div>");
                var offset = $this.offset();
                var width = $this.outerWidth();
                $floater.html($this.html());
                $floater.append("<a class='click-to-collapse'>Collapse...</a>");

                // Add this clone to the end of the document, out the way
                var $injected_floater = $floater.appendTo('body');
                $this.addClass("overflowable-block");
                var $expand_link = jQuery("<a class='click-to-expand'>Expand....</a>");
                $expand_link.attr('data-codeblock-number', codeblock_number);
                $expand_link.insertAfter($this);
                
                // Insert the data attributes to match up the relevant parts of the DOM
                $injected_floater.attr('id', 'codeblock-number-' + codeblock_number);
                $injected_floater.attr('data-codeblock-number', codeblock_number);
                $this.attr('data-codeblock-number', codeblock_number);
            };
        }
    );


    // Remove the overlaid codeblock
    var reset_floating_codeblock = function() {
        var $injected_floater = jQuery(this).parent();
        var codeblock_number = $injected_floater.attr('data-codeblock-number');
        $injected_floater.animate({'opacity': 0}, 100).css('z-index', -1);
        jQuery('.overflowable-block[data-codeblock-number=' + codeblock_number + ']').css('overflow-x', 'scroll').css('margin', '13px 0');
        jQuery('.click-to-expand[data-codeblock-number=' + codeblock_number + ']').show();
        return false;
    };

    // Offer reset of codeblocks
    var reset_floating_codeblocks = function() {
       jQuery('.click-to-collapse').each(reset_floating_codeblock);
    };

    // As well as an on-demand callback
    jQuery('.click-to-collapse').click(reset_floating_codeblock);

    // Callback which expands the code being viewed
    jQuery('.click-to-expand').click( function() {
        reset_floating_codeblocks();
        var codeblock_number = jQuery(this).attr('data-codeblock-number');
        var $overflowed_block = jQuery('.overflowable-block[data-codeblock-number=' + codeblock_number + ']');
        var $injected_floater = jQuery('#codeblock-number-' + codeblock_number);
        $overflowed_block.css('overflow-x', 'hidden').css('margin', '20px 0 35px 0');
        var $offset = $overflowed_block.offset();
        $injected_floater.stop();
        $injected_floater.css({
            'position': 'absolute',
            'display': 'block',
            'left': $offset.left - 6, // Because of the border
            'top': $offset.top - 6 ,
            'text-align': 'left',
            'z-index': 100,
            'width': 'auto',
            'opacity': 0,
        }).animate({'opacity':1}, 100);
        jQuery(this).hide();
        return false;
    });


});
;
jQuery(document).ready(function() {
    if (jQuery('body').hasClass('logged-in')) {
        jQuery.cookie('cookies-opted-in', true, {'domain': 'physics.ox.ac.uk', 'expires': 5});
    } else if (!jQuery.cookie('cookies-opted-in')) {
        var banner =  '<div class="grey cookies-warning">';
            banner += '<div class="five-col"><span class="cookies-warning-text">';
            banner += 'We use cookies to help improve our website and provide a better experience for visitors. ';
            banner += 'By continuing to browse the site you are agreeing to our use of these cookies. ';
            banner += '<a href="https://www2.physics.ox.ac.uk/about-cookies-and-web-privacy" class="cookies-warning-learn-more">Find out more &raquo;</a>';
            banner += '</span></div>';
            banner += '<div class="right"><span class="cookies-warning-buttons"><a href="#" class="form-submit red cookies-warning-opt-in"><span>Accept and close</span></a></span>';
            banner += '</div><div class="clear" /></div></div>';
        var $banner = jQuery(banner);
        $banner.find('.cookies-warning-opt-in').click(function() {
            jQuery.cookie('cookies-opted-in', true, {'domain': 'physics.ox.ac.uk', 'expires': 36500});
            jQuery('.cookies-warning').slideUp();
        });
        jQuery('#header .titlebar').before($banner);
    }
});
;
