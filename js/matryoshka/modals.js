/**
*   MODALS
*/
var myModal = {
    update: function() {
        /**
        *   MODAL OPEN
        *   Opens the specified modal when user clicks on a tag
        *   with attribute my-modal-open="id-of-the-modal"
        */
        jQuery('[my-modal-open]').off().on('click', function(e) {
            e.preventDefault();
            // Get the modal id from the "my-modal-open" attribute
            var id = jQuery(this).attr('my-modal-open');
            if (id == "") {
                // If empty id, it is lighbox, send url
                myModal.open(jQuery(this).attr('href'));
            } else {
                // Open the specified modal
                myModal.open(id);
            }
        });
        /**
        *   MODAL CLOSE
        *   Closes the specified modal:
        *       my-modal-close="[id-of-the-modal]"
        *   All modals if not into a modal
        *       my-modal-close=""
        *   If contained into an opened modal
        *       my-modal-close="" self closes the modal
        */
        jQuery('[my-modal-close]').off().on('click', function(e) {
            e.preventDefault();
            // If contained into a modal, close this modal
            if (jQuery(this).closest('.modal').attr('id') !== undefined) {
                myModal.close(jQuery(this).closest('.modal').attr('id'));
            // If not contained into a modal, close all modals
            } else if (jQuery(this).attr('my-modal-close') == '') {
                myModal.close();
            // Close the specified modal
            } else if (jQuery(this).attr('my-modal-close') != '') {
                myModal.close(jQuery(this).attr('my-modal-close'));
            } else {
                return false;
            }
        });
    },
    close: function(id) {
        // For event puprose
        var closedId = '';
        // If ID is a string, close the specified modal
        if (typeof id == 'string') {
            // Remove hashtag if present
            id = id.replace('#','');
            // Now check if there is a modal with this id
            if (jQuery('#'+id).length > 0) {
                jQuery('#'+id).removeClass('active');
                jQuery('#modal-backdrop-'+id)
                    .one('transitionend', function() {
                        jQuery(this).remove();
                    })
                    .removeClass('active');
                closedId = id;
            }
        // If id is undefined, close all modals
        } else if (typeof id == 'undefined') {
            jQuery('.modal, .modal-backdrop')
                .one('transitionend', function() {
                    jQuery(this).remove();
                })
                .removeClass('active');
                closedId = 'all';
        } else {
            return false;
        }
        // Create the event that returns
        // '[id]' - string - of closed modal
        // 'all' - string - when all modals are closed
        // jQuery.Event('my-modal-close');
        // jQuery(window).trigger({
        //     type: 'my-modal-close',
        //     closed: closedId
        // });
        var event = new CustomEvent('my-modal-close', {
            detail: {
                id: closedId
            }
        });
        window.dispatchEvent(event);
    },
    open: function(id) {
        // ID must be a string
        if (typeof id == 'string') {
            // Remove hashtag if present
            id = id.replace('#','');
            // Make a test string for image URL
            var imageTestString = id.toLowerCase();
            // console.log(imageTestString);
            // Check it is an URL
            if (id.indexOf('/') != -1 || id.indexOf('.') != -1) {
                // Check whether it is an image URL for lightbox
                if (imageTestString.indexOf('.jpg') > -1 || imageTestString.indexOf('.jpeg') > -1 || imageTestString.indexOf('.gif') > -1 || imageTestString.indexOf('.svg') > -1 || imageTestString.indexOf('.png') > -1 || imageTestString.indexOf('.webp') > -1) {
                    console.log('ok it is an image');
                    // Then image url = id
                    var imageUrl = id;
                    if (imageUrl.indexOf('/') == 0) {
                        imageUrl = window.location.origin+imageUrl;
                    }
                    // Transform url into an proper slug id
                    id = id
                        .toLowerCase()
                        .replace(/ /g,'-')
                        .replace(/[^\w-]+/g,'');
                    // OK it is an image, now check if there is the markup
                    if (jQuery('#'+id).length > 0) {

                    } else {
                        // Include the lightbox markup
                        jQuery('body').append(
                            '<div class="modal mod-transparent mod-lightbox mod-no-shadow" id="'+id+'">'+
                                '<button class="btn" my-modal-close="fixed">x</button>'+
                                '<img src="'+imageUrl+'">'+
                            '</div>'
                        );
                    }
                    // Add listener on lightbox close button
                    jQuery('#'+id+' [my-modal-close]').on('click', function() {
                        myModal.close(id);
                    });
                } else {
                    //TEMPORARY CASE FOR IMAGE WITHOUT EXTENSION
                    // It is an iframe or similar
                    // Transform url into an proper slug id
                    // Then image url = id
                    var imageUrl = id;
                    // Transform url into an proper slug id
                    id = id
                        .toLowerCase()
                        .replace(/ /g,'-')
                        .replace(/[^\w-]+/g,'');
                    // OK it is an image, now check if there is the markup
                    if (jQuery('#'+id).length > 0) {

                    } else {
                        // Include the lightbox markup
                        jQuery('body').append(
                            '<div class="modal mod-transparent mod-lightbox mod-no-shadow" id="'+id+'">'+
                                '<button class="btn" my-modal-close="fixed">x</button>'+
                                '<img src="'+imageUrl+'">'+
                            '</div>'
                        );
                    }
                    // Add listener on lightbox close button
                    jQuery('#'+id+' [my-modal-close]').on('click', function() {
                        myModal.close(id);
                    });
                }
            } else {

            }

            // Now check if there is a modal with this id
            var selector = '#'+id;
            if (jQuery(selector).length > 0) {
                // Check if not already opened
                if (!jQuery(selector).hasClass('active')) {
                    // Sets the modal to active
                    jQuery(selector).addClass('active');
                    // Check if a modal bacdrop is declared
                    var modalBackdropClasses = '';
                    if (typeof jQuery(selector).attr('my-modal-backdrop') != 'undefined') {
                        modalBackdropClasses = jQuery(selector).attr('my-modal-backdrop');
                    };
                    // Create a backdrop to make a custom overlay
                    jQuery('body').append(
                        '<div class="modal-backdrop '+modalBackdropClasses+'" id="modal-backdrop-'+id+'"></div>'
                    );
                    jQuery('#modal-backdrop-'+id).one('click', function() {
                        myModal.close(id);
                    });
                    // Then wait a ms then enable it to enable CSS transition feature
                    setTimeout(function() {
                        // Enable the modal backdrop associated to this modal
                        jQuery('#modal-backdrop-'+id).addClass('active');
                    },20);
                } else {
                    return false;
                }
            }
        // If not a string, die
        } else {
            return false;
        }
        // Make the event that returns id of the opened modal
        // jQuery.Event('my-modal-open');
        // jQuery(window).trigger({
        //     type: 'my-modal-open',
        //     id: id
        // });
        var event = new CustomEvent('my-modal-open', {
            detail: {
                id: id
            }
        });
        window.dispatchEvent(event);
    }
}
myModal.update();
// export { myModal };
