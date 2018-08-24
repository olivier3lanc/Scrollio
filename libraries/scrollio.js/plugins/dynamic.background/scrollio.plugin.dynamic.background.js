/**
* Dynamic Background Plugin for Scrollio.js
*/

(function(jQuery){
    //Check if Scrollio is enabled
    if(window.scrollioAPI !== undefined){
        //Plugin definition
        var scrollioPlugin = {
            //A unique identifier for the plugin
            id: 'dynamicBackground',
            //The name of the plugin
            name: 'Dynamic Background',
            //Description of the plugin
            description: 'Add animated background images to Scrollio items',
            style: '.media {position: fixed;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;transition: all 200ms;background-position: center;background-repeat: no-repeat;background-size: cover;}.media.active {opacity: .2;}'
        };
        //Optionally add parameters and methods
        //to the Scrollio API:
        //A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI
        window.scrollioAPI[scrollioPlugin.id] = {};
        window.scrollioAPI[scrollioPlugin.id].jQ_items = jQuery('#scrollio>.item');

        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //Now this plugin is installed
            jQuery('head').append('<style>'+scrollioPlugin.style+'</style>');

            jQuery(this).one('initForScrollio',function(){
                jQuery('#scrollio>.item[data-bg]').each(function(){
                    var imageURL = jQuery(this).attr('data-bg');
                    jQuery(this).prepend('<div class="media" style="background-image:url('+imageURL+')"></div>');
                    // jQuery(this).css('background-image','url("'+imageURL+'")');

                });

            });

            jQuery(this).on('itemChangeForScrollio',function(data){
                window.scrollioAPI[scrollioPlugin.id].jQ_items
                    .children('.media')
                    .removeClass('active');
                setTimeout(function(){
                    window.scrollioAPI[scrollioPlugin.id].jQ_items
                        .eq(data.index)
                        .children('.media')
                        .addClass('active');
                },300);
            });

            jQuery(this).on('scrollForScrollio',function(data){
                var translate = parseInt(data.itemProgressCoef * 10);
                var scale = 1 + data.itemProgressCoef * 0.1;
                window.scrollioAPI[scrollioPlugin.id].jQ_items
                    .eq(data.index)
                    .children('.media')
                    .css({
                        'transform': 'scale('+scale+') translateY(-'+translate+'px)'
                    });
            });
            //     .on('firstItemForScrollio',function(){
            //     })
            //     .on('lastItemForScrollio',function(){
            //     })
            //     .on('letterChangeForScrollio',function(){
            //     })
            //     .on('itemEndForScrollio',function(data){
            //     })
            //     .on('scrollEndForScrollio',function(){
            //     });
        });
        jQuery.Event('iAmaScrollioPlugin');
        jQuery(document).trigger({
            type: 'iAmaScrollioPlugin',
            id: scrollioPlugin.id,
            name: scrollioPlugin.name
        });
    }else{
        console.log('Scrollio is not detected, please install Scrollio');
    }
}(jQuery));
