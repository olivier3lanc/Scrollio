/**
* Starter Plugin for Scrollio.js
*/

(function(jQuery){
    //Check if Scrollio is enabled
    if(window.scrollioAPI !== undefined){
        //Plugin definition
        var scrollioPlugin = {
            //A unique identifier for the plugin
            id: 'myFirstPlugin',
            //The name of the plugin
            name: 'My First Plugin Name',
            //Description of the plugin
            description: 'What my plugin really does',
            //Below you can add as much parameters and methods as you want
            exampleParamName1: true,
            exampleMethodName1: function(){
                //Your code
            }
        };
        //Optionally add parameters and methods
        //to the Scrollio API: A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI:
        //window.scrollioAPI[scrollioPlugin.id]

        //For example you can include the full plugin definition into the Scrollio API
        //window.scrollioAPI[scrollioPlugin.id] = scrollioPlugin;
        //Or a single parameter or method:
        //window.scrollioAPI[scrollioPlugin.id].mySpecialMethodName = scrollioPlugin.exampleMethodName1;

        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //Now this plugin is installed but Scrollio is not initialized yet
            //At this step, user overrides for this plugin are not taken into account
            //
            //YOUR CODE BEFORE INITIALIZATION
            //
            jQuery(this).one('initForScrollio',function(){
                //At this step, user overrides are completed into the scrollioAPI
                //
                //YOUR CODE AFTER INITIALIZATION
                //
            });

            //Here are the available listeners for plugin
            // jQuery(this)
            //     .on('scrollForScrollio',function(data){
            //     })
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
        //Notify Scrollio there is a plugin to install
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
