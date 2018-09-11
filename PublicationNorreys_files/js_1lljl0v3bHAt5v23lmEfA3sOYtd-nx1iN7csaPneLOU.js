(function($){Drupal.behaviors.image_caption={attach:function(context,settings){$("img.caption:not(.caption-processed)").each(function(i){var imgwidth=$(this).width()?$(this).width():false;var imgheight=$(this).height()?$(this).height():false;var captiontext=$(this).attr('title');if($(this).attr('align')){var alignment=$(this).attr('align');$(this).css({'float':alignment});$(this).removeAttr('align');}else if($(this).css('float')){var alignment=$(this).css('float');}else{var alignment='normal';}
var style=$(this).attr('style')?$(this).attr('style'):'';$(this).removeAttr('width');$(this).removeAttr('height');$(this).css('width','');$(this).css('height','');$(this).removeAttr('align');$(this).removeAttr('style');$(this).wrap("<span class=\"image-caption-container\" style=\"display:inline-block;"+style+"\"></span>");$(this).parent().addClass('image-caption-container-'+alignment);if(imgwidth){$(this).width(imgwidth);$(this).parent().width(imgwidth);}
if(imgheight){$(this).height(imgheight);}
$(this).parent().append("<span style=\"display:block;\" class=\"image-caption\">"+captiontext+"</span>");$(this).addClass('caption-processed');});}};})(jQuery);;
/*jQuery(document).ready( function() {
  jQuery('.authors').each(function() {
    var list_limit = 300;
    var full_text = jQuery(this).children('.full-text').html();
    var chopoff_point = full_text.indexOf(', ', list_limit);
    if (chopoff_point >= list_limit) {
      jQuery(this).children('.full-text').hide();
      var truncated_text = full_text.slice(0, chopoff_point);
      jQuery(this).append('<p class="truncated-text">'+truncated_text+' <a href="#" class="more">et al&hellip;</a></p>');
    }
  });

  jQuery('a.more').click( function() {
    jQuery(this).parent().hide();
    jQuery(this).parent().siblings('.full-text').show();
    return false;
  });


});
*/

(function ($) {
  Drupal.behaviors.symplectic = {
    attach: function (context, settings) {
      jQuery('.authors').each(function() {
        var list_limit = 300;
        var full_text = jQuery(this).children('.full-text').html();
        var chopoff_point = full_text.indexOf(', ', list_limit);
        if (chopoff_point >= list_limit) {
          jQuery(this).children('.full-text').hide();
          var truncated_text = full_text.slice(0, chopoff_point);
          jQuery(this).append('<p class="truncated-text">'+truncated_text+' <a href="#" class="more">et al&hellip;</a></p>');
        }
      });

      jQuery('a.more').click( function() {
        jQuery(this).parent().hide();
        jQuery(this).parent().siblings('.full-text').show();
        return false;
      });

    }
  };
}(jQuery));
;
jQuery('document').ready(function() {

  var $container = jQuery('.container');
  var $my_content = jQuery('#my-content');
  if ($my_content.length) {
      jQuery('li.dropdown').each(function() {
        var width = jQuery(this).outerWidth(true);
        jQuery(this).find('ul').css('min-width', width);
      });
      var container_width = $container.outerWidth(true);
      var container_position = $container.offset().left;
      var position = $my_content.parent().offset().left;
      var my_content_width = $my_content.outerWidth(true);
      var new_my_content_margin_left = - position + container_position - my_content_width + container_width - 14 - 2 - 2; // 14 is the padding of the ul, -2 is the border, the extra -2 is for luck!

      // If the new css style will shift it to the left, then apply it, otherwise leave it alone
      if ($my_content.css('margin-left').replace('px', '') > new_my_content_margin_left) {
        $my_content.css('margin-left', new_my_content_margin_left);
      }

      jQuery('.content-link').click(function() {
        return false;
      });
  }
});
;
