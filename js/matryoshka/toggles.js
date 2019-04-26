/**
* TOGGLES
* Just toggle show/hide the target element of any trigger element
* Trigger: Element that fires the show/hide
* Toggle: Element to show/hide
* A toggle can have several triggers
* A single trigger can trig several toggles
<button my-toggle="foo">show hide</button>
<div my-toggle-name="foo">
    Any content
</div>
*/
var myToggle = {
    /**
    * OPEN TARGET
    * METHOD
    * Open the specified toggle target and set 'active' to its trigger(s)
    * @param {name} - string - The toggle target name
    */
    open: function(name) {
        var jQ_targets = jQuery('[my-toggle-name="'+name+'"]');
        if (jQ_targets.length > 0) {
            jQ_targets.addClass('active');
            jQuery('[my-toggle="'+name+'"]').addClass('active');
        }
    },
    /**
    * CLOSE TARGET
    * METHOD
    * Close the specified toggle target and remove 'active' to its trigger(s)
    * @param {name} - string - The toggle target name
    */
    close: function(name) {
        var jQ_targets = jQuery('[my-toggle-name="'+name+'"]');
        if (jQ_targets.length > 0) {
            jQ_targets.removeClass('active');
            jQuery('[my-toggle="'+name+'"]').removeClass('active');
        }
    },
    /**
    * OPEN ALL TARGETS
    * METHOD
    */
    openAll: function() {
        jQuery('[my-toggle-name], [my-toggle]').addClass('active');
    },
    /**
    * CLOSE ALL TARGETS
    * METHOD
    */
    closeAll: function() {
        jQuery('[my-toggle-name], [my-toggle]').removeClass('active');
    },
    /**
    * UPDATE
    * METHOD
    * Refresh toggles status and listeners
    */
    update: function() {
        jQuery('[my-toggle-name]').each(function() {
            var name = jQuery(this).attr('my-toggle-name');
            if (jQuery(this).hasClass('active')) {
                jQuery('[my-toggle="'+name+'"]').addClass('active');
            } else {
                jQuery('[my-toggle="'+name+'"]').removeClass('active');
            }
        });
        jQuery('[my-toggle]').off().on('click', function(e) {
            e.preventDefault();
            var name = jQuery(this).attr('my-toggle');
            if (jQuery(this).hasClass('active')) {
                myToggle.close(name);
            } else {
                myToggle.open(name);
            }
        });
    }
}
myToggle.update();
// export { myTab };
