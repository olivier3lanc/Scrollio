/**
*   DROPDOWN BUTTONS
*/
var myDropdown = {
    update: function() {
        jQuery('.dropdown > a').off().on('click', function(e) {
            e.preventDefault();
            jQuery(this).toggleClass('active');
            jQuery(this).next().toggleClass('active');
        });
    }
}
myDropdown.update();
// export { myDropdown };
