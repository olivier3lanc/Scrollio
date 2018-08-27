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
            description: 'Add animated background images synchronized to scroll amount of Scrollio items',
            //Fade in duration in ms
            fadeDuration: 1300,
            //Opacity of the background image
            opacity: 0.2,
            //CSS translate unit (px, %, etc)
            translateUnit: '%',
            //Horizontal parallax amount
            translateToHorizontal: 0,
            //Vertical parallax amount
            translateToVertical: 0,
            //Scale amount
            scaleTo: 1.1
        };
        //Optionally add parameters and methods
        //to the Scrollio API:
        //A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI
        //Plugin API
        window.scrollioAPI[scrollioPlugin.id] = scrollioPlugin;
        var pluginAPI = window.scrollioAPI[scrollioPlugin.id];
        pluginAPI.jQ_items = jQuery('#scrollio>.item');

        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //When Scrollio is initialized
            jQuery(this).one('initForScrollio',function(){
                //Include CSS
                jQuery('head').append(
                    '<style>'+
                        '#scrollio>.item>.dynamic-background {'+
                            'position: fixed;'+
                            'top: 0;'+
                            'left: 0;'+
                            'width: 100%;'+
                            'height: 100%;'+
                            'opacity: 0;'+
                            'transition: '+
                                'transform 200ms, '+
                                'opacity '+pluginAPI.fadeDuration+'ms;'+
                            'background-position: center;'+
                            'background-repeat: no-repeat;'+
                            'background-size: cover;'+
                        '}'+
                        '#scrollio>.item>.dynamic-background.active { opacity: '+pluginAPI.opacity+';}'+
                    '</style>'
                );

                //Detect bg image on each item, then apply background image
                jQuery('#scrollio>.item[data-dynamic-background]').each(function(){
                    var jQ_theItem = jQuery(this);
                    //Ckeck data-dynamic-background attribute
                    var imageURL = jQ_theItem.attr('data-dynamic-background');
                    //Now check if the URL is valid
                    jQuery.get(imageURL,function(){
                        //If OK, include the media div
                        jQ_theItem.prepend('<div class="dynamic-background" style="background-image:url('+imageURL+')"></div>');
                    }).fail(function(){
                        //In case of invalid URL
                        console.log(imageURL+' is not a valid image URL');
                    });
                });

                //On each item change
                jQuery(this).on('itemChangeForScrollio',function(data){
                    //remove all active class to the dynamic-background div
                    pluginAPI
                        .jQ_items
                        .children('.dynamic-background')
                        .removeClass('active');
                    //Then wait the Scrollio default transition time for items appearence
                    setTimeout(function(){
                        //Set as active the current dynamic-background div
                        pluginAPI
                            .jQ_items
                            .eq(data.index)
                            .children('.dynamic-background')
                            .addClass('active');
                    },300);
                });

                //If these values are neutral, then don't do unnecessary work
                if(pluginAPI.ScaleTo == 1 && pluginAPI.translateToHorizontal == 0 && pluginAPI.translateToVertical == 0){
                    //This if OK, don't include listener
                }else{
                    //For other cases, listen to the item scroll amount
                    jQuery(this).on('scrollForScrollio',function(data){
                        var translateYValue = parseInt(data.itemProgressCoef * pluginAPI.translateToVertical);
                        var translateXValue = parseInt(data.itemProgressCoef * pluginAPI.translateToHorizontal);
                        var scaleValue = 1 + (pluginAPI.scaleTo -  1) * data.itemProgressCoef;
                        var translateX = translateXValue.toString() + pluginAPI.translateUnit;
                        var translateY = translateYValue.toString() + pluginAPI.translateUnit;
                        var scale = scaleValue.toString();
                        pluginAPI
                            .jQ_items
                            .eq(data.index)
                            .children('.dynamic-background')
                            .css({
                                'transform':    'scale('+scale+') '+
                                                'translateX('+translateX+') '+
                                                'translateY('+translateY+')'
                            });
                    });
                }
            });
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
