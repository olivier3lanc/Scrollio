(function(jQuery){
    jQuery.fn.scrollshow = function(options) {
        //Defaults parameters
        var g_parameters = {
            id:                 'scrollshow',       //ID if the main Scrollshow wrapper
            scrollRange:        2000,               //Amount of pixels per item
            keepActive:         true,               //Once scrolled, letters keep active
            textEllipsis:       '...',              //String displayed at the end of each text to scroll
            fontSize:           6,                  //1-7: Font size of the scrolled text (managed by theme CSS)
            intro:              false,              //Enable/disable intro (document title + description)
            introTitle:         '',                 //Display a custom title for the intro
            introDescription:   '',                 //Display a custom description for the intro
            progressBar:        true,               //Enable/disable progress bar
            overlay:            true,               //Enable/disable overlay between items and body background
            onItemChange:       function(e){        //Callback on item change

            },
            onLetterChange:     function(e){        //Callback on letter change

            },
            onScroll:           function(e){        //Callback on scroll

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
        //Scrollshow API through jQuery.fn.scrollshow('get:[parameterName]')
        if(typeof options == 'string'){
            if(options.indexOf('get:') == 0){
                var parameter = options.replace('get:','');
                if(parameter == 'all'){
                    return g_parameters;
                }else if(g_parameters[parameter] !== undefined){
                    return g_parameters[parameter];
                }else{
                    console.log('not a valid scrollshow parameter');
                    return false;
                }
            }else{
                console.log('not a valid request');
                return false;
            }
        }
        //Main Scrollshow jQuery element
        var jQ_scrollshow = jQuery('#'+g_parameters.id);
        //Run only if Scrollshow not already initialized
        if(!jQ_scrollshow.hasClass('initialized')){
            //jQuery objects
            var jQ_body = jQuery('body');
            var jQ_windowWidth = window.innerWidth;
            var jQ_windowHeight = window.innerHeight;
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
            //Item progression coefficient
            var g_progressBarCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
            //Item progress bar width value in pixel
            var g_progressBarValue = g_progressBarCoef * jQ_windowWidth;
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
            //Page description
            var g_pageDescription = jQuery('head meta[name="description"]').attr('content');
            //Page title
            var g_pageTitle = document.title;

            //Wrap letters
            var wrapLetters = function(selector){
                if(typeof(selector) == 'string'){
                    //Wrap every letter of each item title
                    jQ_scrollshow.find(selector).each(function(){
                        //First child of the .item is the scroller
                        var jQ_text = jQuery(this).children().eq(0);
                        //Text content of the element to scroll
                        var text = jQ_text.text();
                        var result = '';
                        var zIndex = 1000;
                        result += '<span class="word">'; //Very first word
                        for(var i = 0; i < text.length; i++){
                            if(text[i] == ' '){
                               result += '</span>'; //end of a word
                               result += '<span class="separator"> </span>'; //add separator
                               result += '<span class="word">'; //restart another word
                            }else{
                               result += '<span class="letter" style="z-index:'+zIndex+';">'+text[i]+'</span>';
                            }
                            //Decrease z-index;
                            zIndex--;
                        }
                        result += '</span>'; //End of last word
                        //Ellipsis management
                        var ellipsis = ' ';
                        //if options for text ellipsis is not empty, use it
                        if(g_parameters.textEllipsis != ''){
                            ellipsis = g_parameters.textEllipsis;
                        }
                        var ellipsisLetters = '';
                        //Wrap each ellipsis letters like other letters
                        for(var i = 0; i < ellipsis.length; i++){
                            ellipsisLetters +=  '<span class="letter" style="z-index:'+zIndex+';">'+
                                                    ellipsis[i]+
                                                '</span>';
                            //Decrease z-index;
                            zIndex--;
                        }
                        //Insert the whole ellipsis into a .word span
                        var finalEllipsis = '<span class="word ellipsis">'+ellipsisLetters+'</span>';
                        var finalResult = result+finalEllipsis;
                        //Replace html
                        jQ_text.html(finalResult);
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

                    //Create the event for letter state change
                    var e_letterChange = jQuery.Event('letterChange');
                    jQ_scrollshow.trigger({
                        type: 'letterChange'
                    });

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

                    //If intro enabled, disable it at first mouse scroll
                    if(g_parameters.intro){
                        if(g_scrollTopRaw > 0){
                            jQ_scrollshow.children('.intro').removeClass('active');
                        }
                    }

                    //If progress bar is enabled
                    if(g_parameters.progressBar){
                        g_progressBarCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
                        g_progressBarValue = g_progressBarCoef * jQ_windowWidth;
                        jQ_scrollshow.children('.progress-bar').css('width',g_progressBarValue);
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

            //If keepActive, add a class to Scrollshow container
            if(g_parameters.keepActive){
                jQ_scrollshow.addClass('keep-active');
            }

            //Add CSS class for font size
            if(typeof g_parameters.fontSize == 'number'){
                if(g_parameters.fontSize >= 1 && g_parameters.fontSize <= 7){
                    g_parameters.fontSize = parseInt(g_parameters.fontSize);
                    var g_fontSizeClass = 'font-size-'+g_parameters.fontSize.toString();
                    jQ_scrollshow.find('.item>*:first-child').addClass(g_fontSizeClass);
                }else{
                    console.log('invalid font size: must be a integer from 1 to 7');
                }
            }else{
                console.log('fontSize option must be a number');
            }

            //If intro, include into DOM
            if(g_parameters.intro){
                //If custom intro title
                if(g_parameters.introTitle != ''){
                    g_pageTitle = g_parameters.introTitle;
                }else{
                    //Fallback if no page title
                    if(g_pageTitle === undefined || g_pageTitle == '' || g_pageTitle == g_parameters.textEllipsis){
                        g_pageTitle = 'Scrollshow';
                    }
                }
                //If custom intro description
                if(g_parameters.introDescription != ''){
                    g_pageDescription = g_parameters.introDescription;
                }else{
                    //Fallback if no meta description
                    if(g_pageDescription === undefined || g_pageDescription == ''){
                        g_pageDescription = 'Scroll down to discover';
                    }
                }
                //Include into scrollshow
                jQ_scrollshow.append(
                    '<div class="intro">'+
                        '<header>'+
                            '<h1 class="font-size-7">'+g_pageTitle+'</h1>'+
                            '<p class="description font-size-2">'+g_pageDescription+'</p>'+
                        '</header>'+
                    '</div>'
                );
                //Wrap letters
                wrapLetters('.intro header');

                //Wait a little to allow transition to be done
                setTimeout(function(){
                    //if page is not scrolled at start or refreshed, then display
                    //Avoids displaying intro if page is refreshed
                    if(g_previousLetterIndex == -1){
                        jQ_scrollshow.children('.intro').addClass('active');
                    }
                },16);
            //Otherwise, make the first item active
            }else{
                jQ_scrollshow.children('.item').eq(0).addClass('active');
            }

            //If progress bar, include into DOM
            if(g_parameters.progressBar){
                jQ_scrollshow.append('<div class="progress-bar"></div>');
            }

            //Now Scrollshow is initialized, this avoids recalls
            jQ_scrollshow.addClass('initialized');

            //On page scroll
            jQuery(document).on('scroll',function(e){
                //Get the current scrollTop, not the global g_scrollTopRaw to measure speed
                var currentScrollAmount = jQuery(window).scrollTop();
                //By default, we consider down scrolling
                var scrollDirectionDown = true;
                //Difference between previous scrolltop
                var scrollMove = currentScrollAmount - g_previousScrollAmount;
                //If scroll direction is up
                if(scrollMove < 0){
                    scrollDirectionDown = false;
                }
                //Track scroll amount and scroll move for further comparisons
                g_previousScrollAmount = currentScrollAmount;
                //Track scrollMove
                g_previousscrollMove = scrollMove;
                //Add callback for scrollDirectionDown
                //scrollDirectionDown == true means scroll down
                //scrollDirectionUp == false means scroll up
                g_parameters.onScroll({
                    //Returns current item index
                    index: g_index,
                    //Returns current amount of scroll for this item only
                    relativeScroll: g_relativeScroll,
                    //Returns true if scroll event is down
                    isScrollDown: scrollDirectionDown,
                    //Between 0 and 1, the overall progress of the Scrollshow
                    progressBarCoef: g_progressBarCoef,
                    //Between 0 and 1, the progress of the current item
                    itemProgressCoef: g_relativeScroll / g_itemScrollRange
                });
                //If scrollmove is too high, then beware user
                if(Math.abs(scrollMove) > 500){
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
            //Callback on letter change
            jQ_scrollshow.on('letterChange',function(e){
                //Enable user defined callback
                g_parameters.onLetterChange(e);
            });
            //Callback item end
            jQ_scrollshow.on('itemEnd',function(e){
                //If itemEnd not already launched few milliseconds ago
                if(g_okToTrigItemEnd){
                    //Enable user defined callback
                    var currentItemIndex = e.index;
                    g_parameters.onItemEnd(currentItemIndex);
                    //Make current item a jQuery object
                    var jQ_currentItem = jQ_scrollshow.children('.item').eq(currentItemIndex);
                    //Now block itemEnd works until next item load
                    //This avoids firing itemEnd several time as a result
                    g_okToTrigItemEnd = false;
                }
            });
            //Callback scroll end
            jQ_scrollshow.on('scrollEnd',function(e){
                //Enable user defined callback
                g_parameters.onScrollEnd(e);
            });
        }else{
            console.log('Scrollshow already initialized');
        }
    }
}(jQuery));
