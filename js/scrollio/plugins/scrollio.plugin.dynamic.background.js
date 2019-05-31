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
            //Opacity of the background image
            opacity: 0.7,
            scaleFrom: 1,
            scaleTo: 1,
            fadeDuration: 1300,
            speed: 100
        };
        //Optionally add parameters and methods
        //to the Scrollio API:
        //A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI
        //Plugin API
        window.scrollioAPI[scrollioPlugin.id] = scrollioPlugin;


        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //When Scrollio is initialized
            jQuery(this).one('initForScrollio',function(){
                var pluginAPI = window.scrollioAPI[scrollioPlugin.id];
                pluginAPI.jQ_items = jQuery('#scrollio>.item');
                var itemHeight = window.scrollioAPI.defaults.scrollRange;
                //Include CSS
                jQuery('head').append(
                    '<style id="scrollio-dynamic-background-plugin">'+
                        '@keyframes dynamicBackgroundCoreAnim {'+
                            '0% {'+
                                'transform: scale('+pluginAPI.scaleFrom.toString()+');'+
                            '}'+
                        '100% {'+
                                'transform: scale('+pluginAPI.scaleTo.toString()+');'+
                            '}'+
                        '}'+
                        'body #scrollio>.item>.dynamic-background {'+
                            'position: fixed;'+
                            'top: 0%;'+
                            'left: 0%;'+
                            'width: 100%;'+
                            'height: 100%;'+
                            'opacity: 0;'+
                            'transition: '+pluginAPI.fadeDuration.toString()+'ms;'+
                            'background-position: center;'+
                            'background-repeat: no-repeat;'+
                            'background-size: cover;'+
                            'animation-name: dynamicBackgroundCoreAnim;'+
                            'animation-duration: '+pluginAPI.speed.toString()+'s;'+
                            'animation-iteration-count: 1;'+
                            'animation-fill-mode: forwards;'+
                        '}'+
                        'body #scrollio>.item>.dynamic-background.active {'+
                            'opacity: '+pluginAPI.opacity.toString()+';'+
                        '}'+
                    '</style>'
                );
                //Make a jQuery object of applicable items
                var jQ_itemsWithDynamicBackground = jQuery('#scrollio>.item[data-dynamic-background]');
                //Optimization: Work only if there are things to do
                if(jQ_itemsWithDynamicBackground.length > 0){
                    // console.log('lkmlk');
                    //Detect bg image on each item, then apply background image
                    jQuery('#scrollio>.item[data-dynamic-background]').each(function(){
                        var jQ_theItem = jQuery(this);
                        //Ckeck data-dynamic-background attribute
                        var imageURL = jQ_theItem.attr('data-dynamic-background');
                        //Now check if the URL is valid
                        jQuery.get(imageURL,function(){
                            var jQ_theImage = jQuery('<img src="'+imageURL+'">');
                            jQ_theImage.one('load', function() {
                                jQ_theItem.prepend('<div class="dynamic-background" style="background-image:url('+imageURL+')"></div>');
                                setTimeout(function() {
                                    jQ_theItem.children('.dynamic-background').addClass('active');
                                },80);
                            });
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
                    if (pluginAPI.scaleTo != pluginAPI.scaleFrom) {
                        //For other cases, listen to the item scroll amount
                        jQuery(this).on('scrollForScrollio',function(data){
                            // var scaleValue = pluginAPI.scaleFrom + (pluginAPI.scaleTo -  pluginAPI.scaleFrom) * data.itemProgressCoef;
                            // var translateXValue = Math.floor(pluginAPI.translateXFrom + (pluginAPI.translateXTo -  pluginAPI.translateXFrom) * data.itemProgressCoef);
                            // var translateYValue = Math.floor(pluginAPI.translateYFrom + (pluginAPI.translateYTo -  pluginAPI.translateYFrom) * data.itemProgressCoef);
                            // var rotateXValue = Math.floor(pluginAPI.rotateXFrom + (pluginAPI.rotateXTo -  pluginAPI.rotateXFrom) * data.itemProgressCoef);
                            // var rotateYValue = Math.floor(pluginAPI.rotateYFrom + (pluginAPI.rotateYTo -  pluginAPI.rotateYFrom) * data.itemProgressCoef);
                            // var scale = scaleValue.toString();
                            // var translateX = translateXValue.toString() + pluginAPI.translateUnit;
                            // var translateY = translateYValue.toString() + pluginAPI.translateUnit;
                            // var rotateX = rotateXValue.toString();
                            // var rotateY = rotateYValue.toString();
                            // console.log('transform scale('+scale+') translateX('+translateX+') translateY('+translateY+') rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)');
                            var amount = Math.round(pluginAPI.speed - parseInt(0.8 * pluginAPI.speed * scrollioAPI.relativeScroll / itemHeight));
                            console.log(amount);
                            // jQuery('body>div').eq(0).css('animation-duration', amount.+'s');
                            pluginAPI
                                .jQ_items
                                .eq(data.index)
                                .children('.dynamic-background')
                                .css({
                                    'animation-duration': amount.toString()+'s'
                                });
                        });
                    }
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
