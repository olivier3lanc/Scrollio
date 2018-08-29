/**
* Fullscreen Plugin for Scrollio.js
*/

(function(jQuery){
    //Check if Scrollio is enabled
    if(window.scrollioAPI !== undefined){
        //Plugin definition
        var scrollioPlugin = {
            //A unique identifier for the plugin
            id:             'fullScreenPlugin',
            //The name of the plugin
            name:           'Fullscreen Plugin',
            //Description of the plugin
            description:    'Add a configurable button command for full screen toggle',
            //Object containing the icons svg resources
            icons: {
                //Minimize SVG code
                minimize:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>',
                //Maximize SVG code
                maximize:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>'
            },
            //Color of icons
            iconsColor: 'white',
            //Position of the icons (top, bottom)
            position: 'top',
            //Alignment of the icons (left, center, right)
            alignment: 'left',
            //Space between the icons and the edge of the viewport
            padding: '1em'
        };
        //Plugin API
        window.scrollioAPI[scrollioPlugin.id] = scrollioPlugin;
        //Populate pluginAPI with the plugin definition scrollioPlugin
        var pluginAPI = window.scrollioAPI[scrollioPlugin.id];
        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //Enter full screen
            var enterFs = function(element) {
                if(element === undefined){
                    element = document.documentElement;
                }
                if(element.requestFullscreen){
                    element.requestFullscreen();
                }else if(element.mozRequestFullScreen){
                    element.mozRequestFullScreen();
                }else if(element.webkitRequestFullscreen){
                    element.webkitRequestFullscreen();
                }else if(element.msRequestFullscreen){
                    element.msRequestFullscreen();
                }
                pluginAPI.isFullScreen = true;
            };
            //Exit full screen
            var exitFs = function() {
                if(document.exitFullscreen){
                    document.exitFullscreen();
                }else if(document.mozCancelFullScreen){
                    document.mozCancelFullScreen();
                }else if(document.webkitExitFullscreen){
                    document.webkitExitFullscreen();
                }
                pluginAPI.isFullScreen = false;
            };
            //Make it available in API
            pluginAPI.enterFullScreen = enterFs;
            pluginAPI.exitFullScreen = exitFs;
            //When Scrollio is initialized
            jQuery(this).one('initForScrollio',function(){
                //Button style
                jQuery('head').append(
                    '<style id="scrollio-fullscreen-plugin">'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"] {'+
                            'position: fixed;'+
                            pluginAPI.position+': '+pluginAPI.padding+';'+
                            pluginAPI.alignment+': '+pluginAPI.padding+';'+
                            'z-index: 1000;'+
                            'cursor: pointer;'+
                            'background-color: transparent;'+
                            'padding: 0;'+
                            'margin: 0;'+
                            'line-height: 0;'+
                            'border: none;'+
                            'outline: none;'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"]>span {'+
                            'display: inline-block;'+
                            'padding: 0;'+
                            'margin: 0;'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"]>span>svg {'+
                            'stroke: '+pluginAPI.iconsColor+';'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"]>.minimize,'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"].isFullScreen>.maximize {'+
                            'display:none;'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"].isFullScreen>.minimize {'+
                            'display:inherit;'+
                        '}'+
                    '</style>'
                );
                //Include the markup into the DOM
                jQuery('body').append(
                    '<button data-scrollio-plugin="'+scrollioPlugin.id+'">'+
                        '<span class="minimize">'+pluginAPI.icons.minimize+'</span>'+
                        '<span class="maximize">'+pluginAPI.icons.maximize+'</span>'+
                    '</button>'
                );
                //Listen to the click
                jQuery('[data-scrollio-plugin="'+scrollioPlugin.id+'"]').on('click',function(){
                    //Once clicked, check full screen status and act accordingly
                    if(pluginAPI.isFullScreen){
                        exitFs();
                        jQuery(this).removeClass('isFullScreen');
                    }else{
                        enterFs();
                        jQuery(this).addClass('isFullScreen');
                    }
                });
            });
        });
        //Notify Scrollio the presence of this plugin
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
