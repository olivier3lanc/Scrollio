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
            opacity: 0.7,
            //CSS translate unit (px, %, etc)
            translateUnit: 'px',
            //CSS perspective in px
            perspective: 1500,
            //Start item with horizontal translation
            translateXFrom: -10,
            //End item with horizontal translation
            translateXTo: 10,
            //Start item with vertical translation
            translateYFrom: -15,
            //End with vertical translation
            translateYTo: 15,
            //Start item from scale amount
            scaleFrom: 1,
            //End item with scale amount
            scaleTo: 1,
            //Start item from rotateX amount in degrees
            rotateXFrom: 0,
            //End item with rotateX amount in degrees
            rotateXTo: 0,
            //Start item from rotateY amount in degrees
            rotateYFrom: 0,
            //End item with rotateY amount in degrees
            rotateYTo: 0
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
                        'body #scrollio>.item>.dynamic-background {'+
                            'position: fixed;'+
                            'top: -5%;'+
                            'left: -5%;'+
                            'width: 110%;'+
                            'height: 110%;'+
                            'opacity: 0;'+
                            'transition: '+
                                'transform 200ms, '+
                                'opacity '+pluginAPI.fadeDuration.toString()+'ms;'+
                            'background-position: center;'+
                            'background-repeat: no-repeat;'+
                            'background-size: cover;'+
                            'prespective: '+pluginAPI.perspective.toString()+';'+
                        '}'+
                        'body #scrollio>.item>.dynamic-background.active {'+
                            'opacity: '+pluginAPI.opacity.toString()+';'+
                        '}'+
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
                if( pluginAPI.scaleFrom == 1 &&
                    pluginAPI.scaleTo == 1 &&
                    pluginAPI.translateXFrom == 0 &&
                    pluginAPI.translateYFrom == 0 &&
                    pluginAPI.translateXTo == 0 &&
                    pluginAPI.translateYTo == 0 &&
                    pluginAPI.rotateXFrom == 0 &&
                    pluginAPI.rotateYFrom == 0 &&
                    pluginAPI.rotateXTo == 0 &&
                    pluginAPI.rotateYTo == 0){
                    //This if OK, don't include listener
                }else{
                    //For other cases, listen to the item scroll amount
                    jQuery(this).on('scrollForScrollio',function(data){
                        var scaleValue = pluginAPI.scaleFrom + (pluginAPI.scaleTo -  pluginAPI.scaleFrom) * data.itemProgressCoef;
                        var translateXValue = pluginAPI.translateXFrom + (pluginAPI.translateXTo -  pluginAPI.translateXFrom) * data.itemProgressCoef;
                        var translateYValue = pluginAPI.translateYFrom + (pluginAPI.translateYTo -  pluginAPI.translateYFrom) * data.itemProgressCoef;
                        var rotateXValue = pluginAPI.rotateXFrom + (pluginAPI.rotateXTo -  pluginAPI.rotateXFrom) * data.itemProgressCoef;
                        var rotateYValue = pluginAPI.rotateYFrom + (pluginAPI.rotateYTo -  pluginAPI.rotateYFrom) * data.itemProgressCoef;
                        var scale = scaleValue.toString();
                        var translateX = translateXValue.toString() + pluginAPI.translateUnit;
                        var translateY = translateYValue.toString() + pluginAPI.translateUnit;
                        var rotateX = rotateXValue.toString();
                        var rotateY = rotateYValue.toString();
                        pluginAPI
                            .jQ_items
                            .eq(data.index)
                            .children('.dynamic-background')
                            .css({
                                'transform':    'scale('+scale+') '+
                                                'translateX('+translateX+') '+
                                                'translateY('+translateY+') '+
                                                'rotateX('+rotateX+'deg) '+
                                                'rotateY('+rotateY+'deg)'
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
