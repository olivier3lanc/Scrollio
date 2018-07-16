(function(jQuery){
    jQuery.fn.scrollshow = function(options) {
        //Defaults parameters
        var g_parameters = {
            id:                 'scrollshow',       //ID if the main Scrollshow wrapper
            scrollRange:        2000,               //Amount of pixels per item
            keepActive:         true,               //Once scrolled, letters keep active
            textEllipsis:       '...',              //String displayed at the end of each text to scroll
            intro:              true,               //Enable/disable intro (document title + description)
            navigation:         false,               //Enable/disable navigation progress and bullets
            progressBar:        true,               //Enable/disable progress bar
            overlay:            true,               //Enable/disable overlay between items and body background
            clickToGoNext:      true,               //Enable/disable need to click to display next item
            onItemChange:       function(e){        //Callback on item change

            },
            onItemEnd:          function(e){        //Callback on item end

            },
            onFirstItem:        function(e){        //Callback on first item

            },
            onLastItem:         function(e){        //Callback on last item

            },
            onScrollEnd:        function(e){        //Callback on scroll end

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
        var jQ_windowWidth = window.innerWidth;
        var jQ_windowHeight = window.innerHeight;
        var jQ_scrollshow = jQuery('#'+g_parameters.id);
        //If overlay, include it into DOM
        if(g_parameters.overlay){
            jQ_scrollshow.append('<div class="overlay"></div>');
        }
        //Current item index
        var g_index = 0;
        //Amount of scroll
        var g_scrollTopRaw = 0;
        //Amount of item relative scroll
        var g_relativeScroll = 0;
        //Amount of items
        var g_amountOfItems = jQ_scrollshow.children('.item').length;
        //Scroll amount for an item
        var g_itemScrollRange = g_parameters.scrollRange;
        //Scroll amount history
        var g_previousScrollAmount = 0;
        //Scroll speed history
        var g_previousscrollMove = 0;
        //Apply body height
        jQ_body.height(g_amountOfItems * g_itemScrollRange + jQ_windowHeight);
        //Initialize previous letter index to optimize performance and avoid no use computing
        var g_previousLetterIndex = -1;
        //Make a flag to trig itemEnd properly, this avoids to trig itemEnd event several times as a result
        var g_okToTrigItemEnd = true;

        //If navigation enabled, include it into DOM
        if(g_parameters.navigation){
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
        }

        //Wrap letters
        var wrapLetters = function(selector){
            if(typeof(selector) == 'string'){
                //Wrap every letter of each item title
                jQ_scrollshow.find(selector).each(function(){
                    //First child of the .item is the scroller
                    var jQ_text = jQuery(this).children().eq(0);
                    //Text content of the element to scroll
                    var text = jQ_text.text()+' '+g_parameters.textEllipsis;
                    var result = '';
                    var zIndex = 1000;
                    result += '<span class="word">'; //Very first word
                    for(var i = 0; i < text.length; i++){
                        if(text[i] == ' '){
                           result += '</span>'; //end of a word
                           result += '<span class="separator">'+text[i]+'</span>'; //add separator
                           result += '<span class="word">'; //restart another word
                        }else{
                           result += '<span class="letter" style="z-index:'+zIndex+';">'+text[i]+'</span>';
                        }
                        //Decrease z-index;
                        zIndex--;
                    }
                    result += '</span>';//End of last word
                    //Replace html
                    jQ_text.html(result);
                });
            }
        }

        wrapLetters('.item');

        //Update management
        var update = function(){
            //Update value of the scroll top amount
            g_scrollTopRaw = jQuery(window).scrollTop();
            //If end of scroll, decrease g_scrollTopRaw to avoid jump
            if(g_scrollTopRaw >= (g_amountOfItems * g_itemScrollRange)){
                g_scrollTopRaw = g_amountOfItems * g_itemScrollRange - 1;
                //Trigger event end of scroll
                var e_scrollEnd = jQuery.Event('scrollEnd');
                jQ_scrollshow.trigger({
                    type: 'scrollEnd'
                });
            }
            //Calculates the displayed item in relation with scroll amount
            g_index = parseInt(g_scrollTopRaw / g_itemScrollRange);
            //Amount of scroll for the current item
            g_relativeScroll = g_scrollTopRaw - g_itemScrollRange * g_index;
            //
            // var g_relativeScrollCoef = g_relativeScroll / g_itemScrollRange;
            // console.log(g_relativeScrollCoef);
            //CSS transform property
            // var g_transform = 'translateY(calc(-50% - '+g_relativeScroll / 100+'px))';
            //CSS text shadow property
            // var g_textShadow = '0px '+g_relativeScroll/50+'px 30px rgba(0,0,0,'+g_relativeScroll/1900+')';
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
            var cur_letterIndex = parseInt(g_relativeScroll / cur_scrollSteps);

            //Work only if needed: Compare previous letter index, if different, then work
            if(cur_letterIndex != g_previousLetterIndex){
                g_previousLetterIndex = cur_letterIndex;
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

                //If navigation is enabled, then process
                if(g_parameters.navigation){
                    //Navigation and its progress
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

                //If intro enabled, disable it at first mouse scroll
                if(g_parameters.intro){
                    if(g_scrollTopRaw > 0){
                        jQ_scrollshow.children('.intro').removeClass('active');
                    }
                }

                //If progress bar is enabled
                if(g_parameters.progressBar){
                    var cur_progressBarCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
                    var cur_progressBarValue = cur_progressBarCoef * jQ_windowWidth;
                    jQ_scrollshow.children('.progress-bar').css('width',cur_progressBarValue);
                }
                //After all work done, update previous letter index value
                g_previousLetterIndex = cur_letterIndex;
            }
            //Create item end event
            if(cur_letterIndex == (cur_amountOfLetters - 1)){
                var e_itemEnd = jQuery.Event('itemEnd');
                jQ_scrollshow.trigger({
                    type: 'itemEnd',
                    index: g_index
                });
            }
        }

        //If intro, include into DOM
        if(g_parameters.intro){
            jQ_scrollshow.append(
                '<div class="intro">'+
                    '<header>'+
                        '<h1>'+document.title+'</h1>'+
                        '<p class="description">'+jQuery('head meta[name="description"]').attr('content')+'</p>'+
                    '</header>'+
                '</div>'
            );
            wrapLetters('.intro header');

            //Wait a little to allow transition to be done
            setTimeout(function(){
                //if page is not scrolled at start or refreshed, then display
                //Avoids displaying intro if page is refreshed
                if(g_previousLetterIndex == -1){
                    jQ_scrollshow.children('.intro').addClass('active');
                }
            },16);
        }

        //If progress bar, include into DOM
        if(g_parameters.progressBar){
            jQ_scrollshow.append('<div class="progress-bar"></div>');
        }

        //If clickToGoNext, include the button into DOM
        if(g_parameters.clickToGoNext){
            jQ_scrollshow.append(
                '<div class="click-to-go-next">'+
                    '<p>'+
                        '<a href="#next">'+
                            '<span>next</span>'+
                        '</a>'+
                    '</p>'+
                '</div>'
            );
        }

        //On page scroll
        jQuery(document).on('scroll',function(e){
            //Get the current scrollTop, not the global g_scrollTopRaw to measure speed
            var currentScrollAmount = jQuery(window).scrollTop();
            //Difference between previous scrolltop
            var scrollMove = currentScrollAmount - g_previousScrollAmount;
            //Track scroll amount and scroll move for further comparisons
            g_previousScrollAmount = currentScrollAmount;
            g_previousscrollMove = scrollMove;
            //If scrollmove is too high, then beware user
            if(Math.abs(scrollMove) > 500){
                jQ_body.css('overflow','hidden');
                alert('you are scrolling too fast, scroll slower');
                jQ_body.css('overflow','auto');
            }
            //Update scroll work
            update();

        });

        //On window change
        jQuery(window).on('resize',function(e){
            //Update window width value
            jQ_windowWidth = window.innerWidth;
            //Update window height value
            jQ_windowHeight = window.innerHeight;
            //Update body height
            jQ_body.height(g_amountOfItems * g_itemScrollRange + window.innerHeight);
        });


        //Callback item change
        //Returns the target index
        jQ_scrollshow.on('itemChange',function(e){
            //Enable user defined callback
            var targetIndex = e.targetIndex;
            g_parameters.onItemChange(targetIndex);
            g_okToTrigItemEnd = true;
        });
        //Callback current item is the first
        jQ_scrollshow.on('firstItem',function(e){
            //Enable user defined callback
            g_parameters.onFirstItem(e);
        });
        //Callback current item is the last
        jQ_scrollshow.on('lastItem',function(e){
            //Enable user defined callback
            g_parameters.onLastItem(e);
        });
        //Callback item end
        jQ_scrollshow.on('itemEnd',function(e){
            //If itemEnd not already launched few milliseconds ago 
            if(g_okToTrigItemEnd == true){
                //Enable user defined callback
                var currentItemIndex = e.index;
                g_parameters.onItemEnd(currentItemIndex);
                //If clickToGoNext parameter is set to true, display the clickToGoNext DOM element
                if(g_parameters.clickToGoNext){
                    //Only for positive scroll and not the last item
                    if((g_previousscrollMove > 0) && (currentItemIndex != g_amountOfItems - 1)){
                        //Set the new target index
                        var target = currentItemIndex + 1;
                        //Avoids user to scroll during clickToGoNext steps prompt
                        jQ_body.css('overflow','hidden');
                        //Manage click
                        jQuery('.click-to-go-next')
                            .addClass('active')
                            .one('click',function(){
                                //Make the scroll work again
                                jQ_body.css('overflow','auto');
                                //Calculate the amount of scrolltop to go to the next item
                                var scrollAmount = target * g_itemScrollRange;
                                //Scroll to the next item
                                jQuery(window).scrollTop(scrollAmount);
                                //Remove clickToGoNext slide
                                jQuery(this).removeClass('active');
                            });
                    }
                }
                //Now block itemEnd works until next item load
                g_okToTrigItemEnd = false;
            }

        });
        //Callback scroll end
        jQ_scrollshow.on('scrollEnd',function(e){
            //Enable user defined callback
            g_parameters.onScrollEnd(e);
        });
    };
}(jQuery));
