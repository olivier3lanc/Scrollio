(function(jQuery){
    jQuery.fn.scrollshow = function(options) {
        //jQuery objects
        var jQ_body = jQuery('body');
        var jQ_windowHeight = jQuery(window).height();
        var jQ_scrollshow = jQuery('#scrollshow');
        //Include overlay
        jQ_scrollshow.append('<div class="overlay"></div>');
        //Current item index
        var g_index = 0;
        //Amount of scroll
        var g_scrollTopRaw = 0;
        //Amount of items
        var g_amountOfItems = jQ_scrollshow.children('.item').length;
        //Scroll amount for an item
        var g_unitRange = 2000;
        //Apply body height
        jQ_body.height(g_amountOfItems * g_unitRange + jQ_windowHeight);

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
            var scrollAmount = currentIndex * g_unitRange;
            jQuery(document).scrollTop(scrollAmount);
        });

        //Wrap every letter of each item title
        jQ_scrollshow.children('.item').each(function(){
            //First child of the .item is the scroller
            var jQ_text = jQuery(this).children().eq(0);
            //Text content of the element to scroll
            var text = jQ_text.text()+' ...';
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
            g_scrollTopRaw = jQuery(document).scrollTop();
            //If end of scroll, decrease g_scrollTopRaw to avoid jump
            if(g_scrollTopRaw >= (g_amountOfItems * g_unitRange)){
                g_scrollTopRaw = g_amountOfItems * g_unitRange - 1;
            }
            //Calculates the displayed item in relation with scroll amount
            g_index = parseInt(g_scrollTopRaw / g_unitRange);
            //Amount of scroll for the current item
            var cur_relativeScroll = g_scrollTopRaw - g_unitRange * g_index;
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
            var cur_scrollSteps = parseInt(g_unitRange / cur_amountOfLetters);
            //Index of the letter
            var cur_letterIndex = parseInt(cur_relativeScroll / cur_scrollSteps);

            //Create event active item changed
            if(!jQ_activeItem.hasClass('active')){
                jQ_scrollshow.trigger('itemChange');
            }

            //Transformations on the active item
            jQ_activeItem.addClass('active');

            //Letters management of the active item
            //Make only the current letter index as active
            // jQ_activeItem
            //     .find('.letter:eq('+cur_letterIndex+')')
            //     .addClass('active');
            // jQ_activeItem
            //     .find('.letter:not(:eq('+cur_letterIndex+'))')
            //     .removeClass('active');

            //Make all the previous letters indexes active
            for (var z = 0; z < cur_amountOfLetters; z++) {
                if(z <= cur_letterIndex){
                    jQ_activeItem
                        .find('.letter:eq('+z.toString()+')')
                        .addClass('active');
                    g_temp_letterIndex = z;
                }else{
                    jQ_activeItem
                        .find('.letter:eq('+z.toString()+')')
                        .removeClass('active');
                }
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
            var cur_progressCoef = g_scrollTopRaw / (g_amountOfItems * g_unitRange);
            var cur_currentProgressHeight = cur_progressCoef * g_progressHeight;
            if(g_index + 1 == g_amountOfItems){
                cur_currentProgressHeight = g_progressHeight - g_navigationBulletMargin - g_navigationBulletHeight;
            }
            //Assign ratio width to the progress bar
            // jQ_stdNavigationFirstChild.children('.progress').height(cur_currentProgressHeight);
            jQ_stdNavigation.children('.progress').height(cur_currentProgressHeight);
        }

        //Apply routines on page start
        update();

        //On page scroll
        jQuery(document).on('scroll',function(e){
            update();
        });

        //On window change
        jQuery(window).on('resize',function(e){
            //Update window height value
            jQ_windowHeight = jQuery(window).height();
            //Update body height
            jQ_body.height(g_amountOfItems * g_unitRange + jQ_windowHeight);
        });

        jQ_scrollshow.on('itemChange',function(e){

        });
    };
}(jQuery));
