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
            description:    'Add a contextual and parametrable button command for full screen toggle',
            icons: {
                minimize:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>',
                maximize:   '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>'
            },
            iconsColor: 'white'
            //Parameters of the plugin
            // enterFullScreen: function(){
            //     enter();
            // },
            // exitFullScreen: function(){
            //     exit();
            // }
        };
        //Plugin API
        var pluginAPI = window.scrollioAPI[scrollioPlugin.id];
        //Populate pluginAPI with the plugin definition scrollioPlugin
        pluginAPI = scrollioPlugin;
        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //Now this plugin is installed
            //Enter full screen
            var enterFs = function(element) {
                if(element === undefined){
                    element = document.documentElement;
                }
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
                pluginAPI.isFullScreen = true;
            };
            //Exit full screen
            var exitFs = function() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
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
                    '<style>'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"] {'+
                            'position: fixed;'+
                            'top: 20px;'+
                            'left: 20px;'+
                            'z-index: 1000;'+
                            'cursor: pointer;'+
                            'background-color: transparent;'+
                            'padding: 0;'+
                            'margin: 0;'+
                            'line-height: 0;'+
                            'border: none;'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"]>span {'+
                            'display: inline-block;'+
                            'padding: 0;'+
                            'margin: 0;'+
                        '}'+
                        '[data-scrollio-plugin="'+scrollioPlugin.id+'"]>span>svg {'+
                            'stroke: '+scrollioPlugin.iconsColor+';'+
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
                //Include the following markup into the DOM
                jQuery('body').append(
                    '<button data-scrollio-plugin="'+scrollioPlugin.id+'">'+
                        '<span class="minimize">'+scrollioPlugin.icons.minimize+'</span>'+
                        '<span class="maximize">'+scrollioPlugin.icons.maximize+'</span>'+
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
            //Here are the available listeners for plugin
            // jQuery(this)
            //     .on('initForScrollio',function(){
            //     })
            //     .on('itemChangeForScrollio',function(data){
            //     })
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
