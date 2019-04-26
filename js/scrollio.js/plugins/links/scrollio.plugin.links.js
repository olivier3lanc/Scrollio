/**
* Links for Scrollio.js
*/

(function(jQuery){
    //Check if Scrollio is enabled
    if(window.scrollioAPI !== undefined){
        //Plugin definition
        var scrollioPlugin = {
            //A unique identifier for the plugin
            id: 'links',
            //The name of the plugin
            name: 'Links',
            //Description of the plugin
            description: 'Configurable links styles for Scrollio items'

        };
        //Optionally add parameters and methods
        //to the Scrollio API:
        //A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI
        //Plugin API
        window.scrollioAPI[scrollioPlugin.id] = scrollioPlugin;
        var pluginAPI = window.scrollioAPI[scrollioPlugin.id];

        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //When Scrollio is initialized
            jQuery(this).one('initForScrollio',function(){
                //Include CSS
                jQuery('head').append(
                    '<style>'+
                        'body #scrollio>.item a {'+
                            'color: currentColor;'+
                            'display: inline-block;'+
                            'padding: 1em 2em;'+
                            'font-size: large;'+
                            'text-transform: uppercase;'+
                            'text-decoration: none;'+
                            'letter-spacing: 0.1em;'+
                            'background-color: darkorange;'+
                            'border-radius: 3px;'+
                        '}'+
                        'body #scrollio>.item a.link-deepskyblue {'+
                            'background-color: deepskyblue;'+
                        '}'+
                    '</style>'
                );
            });
            //lightseagreen
            //lightskyblue
            //deepskyblue
            //darkorange
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
