/**
* TABS
* Open only the specified tab name included into a .tabs <div> and update listeners for tabs buttons
* For example <a href="#" my-tab="foo">text</a> add "active" class to the element <div my-tab-name="foo"></div>
*/
var myTab = {
    options: {
        autoHide: false, // Hide trigger if target tab is empty
        toggleMode: false // Toggle show/hide the tab even if active
    },
    /**
    * OPEN TAB PANE
    * METHOD
    * Open the specified tab pane name or the first pane of a tag group
    * @param {name} - string - The tab pane name or tab group name to open
    */
    open: function(name) {
        // Get the tab group jQ object
        var jQ_group = jQuery('[my-tab-group="'+name+'"]');
        // If it is a tabs group, open the first tab
        if (jQ_group.length > 0) {
            jQ_group.find('[my-tab-name]')
                .removeClass('active')
                .eq(0)
                .addClass('active');
        // Otherwise it is a single tab name, then open this tab
        } else {
            jQuery('[my-tab-name="'+name+'"]')
                .closest('.tabs')
                .find('[my-tab-name]')
                .removeClass('active');
            // Show the requested tab
            jQuery('[my-tab-name="'+name+'"]').addClass('active');
        }
    },
    /**
    * REFRESH TABS
    * METHOD
    * Check all opened tab panes into their respective .tabs container and
    * add "active" to the toggle elements (w/ attribute my-tab="foo")
    * that point to that tab (w/ attribute my-tab-name="foo")
    */
    refreshTabs: function() {
        jQuery('.tabs').each(function() {
            var autoHideFirstTabName = '';
            jQuery(this).find('[my-tab-name]').each(function() {
                var tabName = jQuery(this).attr('my-tab-name');
                if (jQuery(this).hasClass('active')) {
                    jQuery('[my-tab="'+tabName+'"]')
                        .addClass('active')
                        .removeClass('disabled');
                } else {
                    jQuery('[my-tab="'+tabName+'"]')
                        .removeClass('active');
                }
                // If Auto hide is enabled
                if (myTab.options.autoHide) {
                    // Check content of the tab
                    var tabContent = jQuery(this).html();
                    // Trim content to verify it is blank
                    if(tabContent.trim() == '') {
                        // Tab is blank, disable tab button
                        jQuery('[my-tab="'+tabName+'"]')
                            .addClass('disabled')
                            .removeClass('active');
                    } else {
                        // Tab has content, set the tab button as elligible to be active
                        jQuery('[my-tab="'+tabName+'"]').removeClass('disabled');
                        // Use the very first tab with content as default openened tab
                        if (autoHideFirstTabName == '') {
                            autoHideFirstTabName = tabName;
                        }
                    }
                }
            });
            // If Auto hide is enabled
            if (myTab.options.autoHide) {
                // Check current active tab content
                var jQ_activeTab = jQuery(this).find('[my-tab-name].active');
                // Only if 1 active tab
                if (jQ_activeTab.length == 1) {
                    var activeTabContent = jQ_activeTab.html();
                    // If the current tab content is blank,
                    // open the first tab with content with its associated button
                    if (jQuery.trim(activeTabContent) == '') {
                        jQ_activeTab.removeClass('active');
                        jQuery( '[my-tab-name="'+autoHideFirstTabName+'"], '+
                                '[my-tab="'+autoHideFirstTabName+'"]')
                            .addClass('active');
                    }
                }
            }
        });
    },
    /**
    * UPDATE
    * METHOD
    * Refresh tabs status and tab listeners
    */
    update: function() {
        myTab.refreshTabs();
        jQuery('[my-tab]').off().on('click', function(e) {
            e.preventDefault();
            var targetName = jQuery(this).attr('my-tab');
            // Toggle mode management
            if (myTab.options.toggleMode) {
                if (jQuery(this).hasClass('active')) {
                    jQuery('[my-tab-name="'+targetName+'"]').removeClass('active');
                    jQuery(this).removeClass('active');
                } else {
                    myTab.open(targetName);
                }
            } else {
                myTab.open(targetName);
            }
            myTab.refreshTabs();
        });
    }
}
myTab.update();
// export { myTab };
