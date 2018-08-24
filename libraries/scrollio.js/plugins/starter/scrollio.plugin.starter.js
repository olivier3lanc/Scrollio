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
            name: 'My First Plugin',
            //Description of the plugin
            description: '',
            //Below you can add as much parameters and methods as you want
            exampleParamName1: true,
            exampleMethodName1: function(){
                //Your code
            }
        };
        //Optionally add parameters and methods
        //to the Scrollio API:
        //A scrollio plugin can have its own API stored
        //into an object inside the scrollioAPI
        //window.scrollioAPI[scrollioPlugin.id]

        //Wait Scrollio detects this plugin
        jQuery(document).one(scrollioPlugin.id,function(data){
            //Now this plugin is installed
            //
            //Your code here
            //
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
