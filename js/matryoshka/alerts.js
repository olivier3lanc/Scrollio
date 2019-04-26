/**
* ALERTS
* @return Inserts alerts into the specified element ID
* @param {data} string - required - The text or html to display into the alert
* @param {destination} string - required - ID if the target DOM element that will include the alert
* @param {colorName} string - optional - Color type of the alert
    For example: "success", "danger" or "warning"
*/
var myAlert = {
    open: function(data, colorName = 'brand', fixed = false) {
        if (typeof data == 'string' || typeof data == 'number') {
            var jQ_destination = jQuery('body');
            // Init optional modifiers
            var alertModifiers = '';
            // If position fixed
            if (fixed) {
                alertModifiers += 'mod-fixed';
            }
            // Markup of the alert
            var notificationMarkup = ''+
                '<div class="alert '+alertModifiers+' mod-'+colorName+'">'+
                    '<div>'+data+'</div>'+
                    '<div>'+
                        '<button my-alert-close>'+
                            '<span class="icon-x"></span>'+
                        '</button>'+
                    '</div>'+
                '</div>';
            // Include into DOM with its one click close listener
            jQ_destination.prepend(notificationMarkup);
            this.update();
        } else {
            return false;
        }
    },
    update: function() {
        jQuery('[my-alert-close]').one('click', function(e) {
            e.preventDefault();
            jQuery(this)
                .closest('.alert')
                .remove();
        });
    }
}
myAlert.update();
// export { myAlert };
