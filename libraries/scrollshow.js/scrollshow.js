(function(jQuery){
    jQuery.fn.scrollshow = function(options) {
        //Defaults parameters
        var g_parameters = {
            id:                 'scrollshow',               //ID if the main Scrollshow wrapper
            scrollRange:        1000,                       //Amount of pixels per item
            keepActive:         true,                      //Once scrolled, letters keep active
            textEllipsis:       '...',                      //String displayed at the end of each text to scroll
            intro:              true,                       //Enable or not intro (document title + description)
            onItemChange:       function(e){                //Callback on item change

            },
            onFirstItem:        function(e){                //Callback on first item

            },
            onLastItem:         function(e){                //Callback on last item

            }
        }
        //Check user parameters
        if(typeof options == 'object'){
            //Manage parameters
            var userProperties = Object.getOwnPropertyNames(options);
            //Replace each parameter by its new value
            userProperties.forEach(function(property){
                if(g_parameters.hasOwnProperty(property)){
                    g_parameters[property] = options[property];
                }
            });
        }
        //jQuery objects
        var jQ_body = jQuery('body');
        var jQ_windowHeight = jQuery(window).height();
        var jQ_scrollshow = jQuery('#'+g_parameters.id);
        //Include overlay
        jQ_scrollshow.append('<div class="overlay"></div>');
        //If intro, include intro DOM
        if(g_parameters.intro){
            jQ_scrollshow.append(
                '<div class="intro active">'+
                    '<header>'+
                        '<h1>'+document.title+'</h1>'+
                        '<p class="description">'+jQuery('head meta[name="description"]').attr('content')+'</p>'+
                        '<p>Scroll down</p>'+
                    '</header>'+
                '</div>'
            );
        }
        //Current item index
        var g_index = 0;
        //Amount of scroll
        var g_scrollTopRaw = 0;
        //Amount of items
        var g_amountOfItems = jQ_scrollshow.children('.item').length;
        //Scroll amount for an item
        var g_itemScrollRange = g_parameters.scrollRange;
        //Apply body height
        jQ_body.height(g_amountOfItems * g_itemScrollRange + jQ_windowHeight);

        //Navigation and progress
        //Include navigation
        jQ_scrollshow.append('<nav class="navigation"></nav>');
        //jQuery object of the navigation
        var jQ_stdNavigation = jQ_scrollshow.children('.navigation');
        //Include a bullet link for each item
        for (var i = 0; i < g_amountOfItems; i++) {
            jQ_stdNavigation.append('<a href="#'+i.toString()+'"></a>');
            //Include progress bar on the first item
            if(i == 0){
                // jQ_stdNavigation.children('a:first-child').append('<span class="progress"></span>');
                jQ_stdNavigation.append('<span class="progress"></span>');
            }
        }
        //First bullet link jQuery object
        var jQ_stdNavigationFirstChild = jQ_stdNavigation.children('a:first-child');
        //Link bullet width
        var g_navigationBulletWidth = jQ_stdNavigationFirstChild.outerWidth();
        //Link bullet height
        var g_navigationBulletHeight = jQ_stdNavigationFirstChild.outerHeight();
        //Link bullet margin
        var g_navigationBulletMargin = parseFloat(jQ_stdNavigationFirstChild.css('margin-bottom'));
        //Computed 100% progress height
        var g_progressHeight = g_amountOfItems * (g_navigationBulletHeight + g_navigationBulletMargin);


        //Manage click on bullet link: Go to the target item
        jQ_stdNavigation.find('a').on('click',function(e){
            e.preventDefault();
            var currentHash = jQuery(this).attr('href');
            var currentIndex = currentHash.replace('#','');
            currentIndex = parseInt(currentIndex);
            var scrollAmount = currentIndex * g_itemScrollRange;
            jQuery(document).scrollTop(scrollAmount);
        });

        //Wrap every letter of each item title
        jQ_scrollshow.children('.item').each(function(){
            //First child of the .item is the scroller
            var jQ_text = jQuery(this).children().eq(0);
            //Text content of the element to scroll
            var text = jQ_text.text()+' '+g_parameters.textEllipsis;
            var result = '';
            var zIndex = 1000;
            for(var i = 0; i < text.length; i++){
                if(text[i] == ' '){
                   result += '</span><span class="separator">'+text[i]+'</span><span class="word">';
                }else{
                   result += '<span class="letter" style="z-index:'+zIndex+';">'+text[i]+'</span>';
                }
                zIndex--;
            }
            jQ_text.html('<span class="word">'+result+'</span>');
        });

        //Update management
        var update = function(){
            //Update value of the scroll top amount
            g_scrollTopRaw = jQuery(window).scrollTop();
            //If end of scroll, decrease g_scrollTopRaw to avoid jump
            if(g_scrollTopRaw >= (g_amountOfItems * g_itemScrollRange)){
                g_scrollTopRaw = g_amountOfItems * g_itemScrollRange - 1;
            }
            //Calculates the displayed item in relation with scroll amount
            g_index = parseInt(g_scrollTopRaw / g_itemScrollRange);
            //Amount of scroll for the current item
            var cur_relativeScroll = g_scrollTopRaw - g_itemScrollRange * g_index;
            //CSS transform property
            // var g_transform = 'translateY(calc(-50% - '+cur_relativeScroll / 100+'px))';
            //CSS text shadow property
            // var g_textShadow = '0px '+cur_relativeScroll/50+'px 30px rgba(0,0,0,'+cur_relativeScroll/1900+')';
            //jQuery object of the active item
            var jQ_activeItem = jQ_scrollshow.children('.item:eq('+g_index+')');
            //jQuery object of the inactive items
            var jQ_inactiveItems = jQ_scrollshow.children('.item:not(:eq('+g_index+'))');

            //LETTERS
            //How many letters into this item title
            var cur_amountOfLetters = jQ_scrollshow.find('.item:eq('+g_index+') .letter').length;
            //Amount of scroll per step
            var cur_scrollSteps = parseInt(g_itemScrollRange / cur_amountOfLetters);
            //Index of the letter
            var cur_letterIndex = parseInt(cur_relativeScroll / cur_scrollSteps);

            //Create event active item changed for the target item
            if(!jQ_activeItem.hasClass('active')){
                var e_itemChange = jQuery.Event('itemChange');
                var e_lastItem = jQuery.Event('lastItem');
                var e_firstItem = jQuery.Event('firstItem');
                jQ_scrollshow.trigger({
                    type: 'itemChange',
                    targetIndex: g_index
                });
                if(g_index == 0){
                    jQ_scrollshow.trigger({
                        type: 'firstItem'
                    });
                }
                if(g_index == (g_amountOfItems - 1)){
                    jQ_scrollshow.trigger({
                        type: 'lastItem'
                    });
                }
            }

            //Transformations on the active item
            jQ_activeItem.addClass('active');


            //Letters management
            //Common task
            jQ_activeItem
                .find('.letter:eq('+cur_letterIndex+')')
                .addClass('active current');
            //If keepActive enabled
            if(g_parameters.keepActive) {
                for (var z = 0; z < cur_letterIndex; z++) {
                    jQ_activeItem
                        .find('.letter:eq('+z+')')
                        .addClass('active')
                        .removeClass('current');
                }
                for (var z = cur_letterIndex + 1; z < cur_amountOfLetters; z++) {
                    jQ_activeItem
                        .find('.letter:eq('+z+')')
                        .removeClass('active current');
                }
            //If keepActive disabled
            }else{
                jQ_activeItem
                    .find('.letter:not(:eq('+cur_letterIndex+'))')
                    .removeClass('active current');
            }

            //Transformations on non current item
            jQ_inactiveItems.removeClass('active');

            //Navigation and progress
            for (var i = 0; i < g_amountOfItems; i++) {
                if(i <= g_index){
                    //Add class active to all read items
                    jQ_stdNavigation.find('a[href="#'+i.toString()+'"]').addClass('active');
                }else{
                    //Remove class active for all unread items
                    jQ_stdNavigation.find('a[href="#'+i.toString()+'"]').removeClass('active');
                }
            }
            //Calculates progress ratio between 0 and 1
            var cur_progressCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
            var cur_currentProgressHeight = cur_progressCoef * g_progressHeight;
            if(g_index + 1 == g_amountOfItems){
                cur_currentProgressHeight = g_progressHeight - g_navigationBulletMargin - g_navigationBulletHeight;
            }
            //Assign ratio width to the progress bar
            // jQ_stdNavigationFirstChild.children('.progress').height(cur_currentProgressHeight);
            jQ_stdNavigation.children('.progress').height(cur_currentProgressHeight);
        }

        //On page scroll
        jQuery(document).on('scroll',function(e){
            update();
            //If intro enabled, disable it at first mouse scroll
            if(g_parameters.intro){
                if(g_scrollTopRaw > 0){
                    jQ_scrollshow.children('.intro').removeClass('active');
                }
            }
        });

        //On window change
        jQuery(window).on('resize',function(e){
            //Update window height value
            jQ_windowHeight = jQuery(window).height();
            //Update body height
            jQ_body.height(g_amountOfItems * g_itemScrollRange + jQ_windowHeight);
        });

        //Manage itemChange callback
        //Returns the target index
        jQ_scrollshow.on('itemChange',function(e){
            var targetIndex = e.targetIndex;
            g_parameters.onItemChange(targetIndex);
        });
        jQ_scrollshow.on('firstItem',function(){
            g_parameters.onFirstItem(console.log('first'));
        });
        jQ_scrollshow.on('lastItem',function(){
            g_parameters.onLastItem(console.log('last'));
        });
    };
}(jQuery));
