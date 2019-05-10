(function(jQuery){
    //Listen to Scrollio plugins
    jQuery(document).on('iAmaScrollioPlugin',function(data){
        console.log('Scrollio plugin detected:'+data.name);
        jQuery.Event(data.id);
        jQuery(document).trigger({
            type: data.id,
            name: data.name
        });
    });
    //Once page loaded, remove Scrollio plugins listener
    jQuery(window).on('load',function(){
        jQuery(document).off('scrollioPlugin');
    });
    //Include an API object updated while Scrollio is running
    window.scrollioAPI = {
        defaults: {},
        goToNextItem: function(){
            if(this.index < (this.amountOfItems - 1)){
                jQuery('body,html').animate({
                    scrollTop:(window.scrollioAPI.index + 1) * window.scrollioAPI.defaults .scrollRange
                },this.defaults.scrollRange);
            }else{
                console.log('unable to go to next item, this is the last item');
            }
        },
        goToPreviousItem: function(){
            if(this.index > 0){
                //One ms per pixel
                jQuery('body,html').animate({
                    scrollTop: (window.scrollioAPI.index - 1) * window.scrollioAPI.defaults.scrollRange
                },this.defaults.scrollRange);
            }else{
                console.log('unable to go to previous item, this is the first item');
            }
        },
        goToFirstItem: function(){
            //One ms per pixel
            jQuery('body,html').animate({scrollTop:0},this.scrollTop);
        },
        goToLastItem: function(){
            var scrollTarget = (this.amountOfItems - 1) * this.defaults.scrollRange;
            //One ms per pixel
            jQuery('body,html').animate({
                scrollTop: scrollTarget
            },scrollTarget);
        },
        goToItemStart: function(){
            var scrollTarget =  this.index * this.defaults.scrollRange;
            //One ms per pixel
            jQuery('body,html').animate({
                scrollTop: scrollTarget
            },this.relativeScroll);
        },
        goToItemEnd: function(){
            var scrollTarget = this.index * this.defaults.scrollRange + this.defaults.scrollRange - 20;
            //One ms per pixel
            jQuery('body,html').animate({
                scrollTop: scrollTarget
            },this.defaults.scrollRange);
        }
    };
    jQuery.fn.scrollio = function(options) {
        //Defaults parameters
        var g_parameters = {
            //ID if the main Scrollio wrapper
            id:                     'scrollio',
            //Amount of pixels scrolled per item
            scrollRange:            2000,
            //Once scrolled, letters keep active CSS class
            keepActive:             true,
            //String displayed at the end of each text to scroll
            textEllipsis:           '...',
            //Google Font name
            //Or Web safe font name:
            //'Arial','Helvetica','Courier New','Georgia',
            //'Times New Roman','Verdana','serif','sans-serif',
            //'monospace','cursive','fantasy'
            fontFamily:             'Ubuntu',
            //Font weight (applicable only for Google Fonts)
            fontWeight:             'Bold',
            //Each letter is under the previous
            fontOverlapUnder:       true,
            //Display the progress bar
            progressBar:            true,
            //Display overlay between items and body background
            overlay:                true,
            //Responsive font size in pixels for Extra-Large devices
            fontSizeXL:             84,
            //Responsive font size in pixels for Large devices
            fontSizeLG:             64,
            //Responsive font size in pixels for Medium devices
            fontSizeMD:             50,
            //Responsive font size in pixels for Small devices
            fontSizeSM:             40,
            //Responsive font size in pixels for Extra-Small devices
            fontSizeXS:             32,
            //Responsive break point in pixels between large and extra-large
            breakPointLG_XL:        1200,
            //Responsive break point in pixels between medium and large
            breakPointMD_LG:        992,
            //Responsive break point in pixels between small and medium
            breakPointSM_MD:        768,
            //Responsive break point in pixels between extra-small and small
            breakPointXS_SM:        575,
            //Cross fade duration between items in ms.
            //itemFadeDuration = 0 optimizes global performances
            itemFadeDuration:       500,
            //Enable/disable style overrides. Quickly remove all styles overrides
            //For testing and debug purpose.
            styleOverrides:         true,
            //Define basic responsive layout to item children for extra large devices
            //'horizontal': Horizontal stacking
            //'horizontal-reverse': Reverse order horizontal stacking
            //'vertical':  Vertical stacking
            //'vertical-reverse': Reverse order vertical stacking
            itemContentLayoutXL:  'horizontal',
            //Define basic responsive layout to item children for large devices
            //'horizontal': Horizontal stacking
            //'horizontal-reverse': Reverse order horizontal stacking
            //'vertical':  Vertical stacking
            //'vertical-reverse': Reverse order vertical stacking
            itemContentLayoutLG:  'horizontal',
            //Define basic responsive layout to item children for medium devices
            //'horizontal': Horizontal stacking
            //'horizontal-reverse': Reverse order horizontal stacking
            //'vertical':  Vertical stacking
            //'vertical-reverse': Reverse order vertical stacking
            itemContentLayoutMD:  'vertical',
            //Define basic responsive layout to item children for small devices
            //'horizontal': Horizontal stacking
            //'horizontal-reverse': Reverse order horizontal stacking
            //'vertical':  Vertical stacking
            //'vertical-reverse': Reverse order vertical stacking
            itemContentLayoutSM:  'vertical',
            //Define basic responsive layout to item children for extra small devices
            //'horizontal': Horizontal stacking
            //'horizontal-reverse': Reverse order horizontal stacking
            //'vertical':  Vertical stacking
            //'vertical-reverse': Reverse order vertical stacking
            itemContentLayoutXS:  'vertical',
            //@keyframes animations declarations that have to be used into the custom CSS
            animationsCSS:          {
                'cursor': {
                    '0%': 'opacity: 0',
                    '100%': 'opacity: 1'
                }
            },
            //CSS overrides of scrolled text BEFORE Scrollio initialization
            sentenceBeforeInitCSS:  {
            },
            //CSS overrides of scrolled text AFTER Scrollio initialization
            sentenceAfterInitCSS:   {
            },
            //CSS overrides of page body
            bodyCSS:                {
                'background-color': '#1b4b7d',
                'color': '#fff'
            },
            //CSS overrides of Scrollio container
            scrollioContainerCSS:   {

            },
            //CSS overrides of an inactive item
            itemDefaultCSS:         {
                'padding': '0em 10vw'
            },
            //CSS overrides of an active item
            itemActiveCSS:          {
            },
            //CSS overrides of the whole scrolled text sentence
            sentenceCSS:            {
                'line-height': '1.3em'
            },
            //CSS overrides of a word
            wordCSS:                {
            },
            //CSS overrides of a letter not scrolled yet
            letterDefaultCSS:       {
                'margin-left': '-0.1em',
                'opacity': '0.35',
                'transition': 'all 300ms',
                'text-shadow': '0.07em 0.01em 0.1em rgba(0,0,0,.5)',
                'transform': 'translateX(-0.1em)'
            },
            //CSS overrides of a scrolled or currently scrolled letter
            letterActiveCSS:        {
                'color': 'white',
                'opacity': '1',
                'transform': 'translateX(0em)'
            },
            //CSS overrides of the currently scrolled letter
            letterCurrentCSS:       {
            },
            //CSS overrides of the cursor included only into currently scrolled letter
            cursorCSS:              {
                'top': '0px',
                'right': '0px',
                'width': '2px',
                'height': '100%',
                'background-color': 'white',
                'animation-name': 'cursor', //Declared into g_parameters.animationsCSS
                'animation-duration': '600ms',
                'animation-iteration-count': 'infinite',
                'animation-direction': 'alternate'
            },
            //CSS overrides of the entire ellipsis word
            ellipsisWordCSS:     {

            },
            //CSS overrides of an ellipsis character not scrolled yet
            ellipsisDefaultCSS:     {

            },
            //CSS overrides of an ellipsis scrolled or currently scrolled
            ellipsisActiveCSS:      {

            },
            //CSS overrides of the ellipsis currently scrolled character
            ellipsisCurrentCSS:     {

            },
            //CSS overrides of the progress bar
            progressBarCSS:         {
                'background-color': 'white'
            },
            //CSS overrides of the overlay layer
            overlayCSS:             {
                'opacity': '1',
                'background': 'radial-gradient(ellipse at top, transparent, #07131f)'
            },
            //Callback on Scrollio initialization
            onInit:                 function(e){},
            //Callback on item change
            onItemChange:           function(e){},
            //Callback on letter change
            onLetterChange:         function(e){},
            //Callback on scroll
            onScroll:               function(e){},
            //Callback on item end
            onItemEnd:              function(e){},
            //Callback on first item
            onFirstItem:            function(e){},
            //Callback on last item
            onLastItem:             function(e){},
            //Callback on scroll end
            onScrollEnd:            function(e){}
        };

        //Main Scrollio jQuery element
        var jQ_scrollio = jQuery('#'+g_parameters.id);
        //Main jQuery objects
        var jQ_body = jQuery('body');
        var jQ_windowWidth = window.innerWidth;
        var jQ_windowHeight = window.innerHeight;
        //Run only if Scrollio not already initialized
        if(!jQ_body.hasClass('scrollio-initialized')){
            //Check user parameters
            if(typeof options == 'object'){
                //Manage parameters
                var userProperties = Object.getOwnPropertyNames(options);
                //Replace each parameter by its new value
                userProperties.forEach(function(property){
                    //If it is a valid Scrollio parameter
                    if(g_parameters.hasOwnProperty(property)){
                        g_parameters[property] = options[property];
                    //Otherwise
                    }else{
                        //It may be a plugin id
                        if(window.scrollioAPI[property] !== undefined){
                            //Now property is plugin id
                            var pluginID = property;
                            //Array of user defined parameters
                            var userOptionsForPlugin = Object.getOwnPropertyNames(options[pluginID]);
                            userOptionsForPlugin.forEach(function(param){
                                if(window.scrollioAPI[pluginID].hasOwnProperty(param)){
                                    window.scrollioAPI[pluginID][param] = options[pluginID][param];
                                }else{
                                    console.log('invalid parameter '+param+' for plugin id: '+pluginID);
                                }
                            });
                        }else{
                            console.log('invalid Scrollio plugin or not loaded yet');
                        }
                    }
                });
            }
            window.scrollioAPI.defaults = g_parameters;
            //If overlay, include it into DOM
            if(g_parameters.overlay){
                jQ_scrollio.append('<div class="overlay"></div>');
            }
            //Current item index
            var g_index = 0;
            //Update API
            window.scrollioAPI.index = g_index;
            //Amount of scroll
            var g_scrollTopRaw = 0;
            //Update API
            window.scrollioAPI.scrollTop = g_scrollTopRaw;
            //Amount of item relative scroll
            var g_relativeScroll = 0;
            //Update API
            window.scrollioAPI.relativeScroll = g_relativeScroll;
            //Amount of items
            var g_amountOfItems = jQ_scrollio.children('.item').length;
            //Update API
            window.scrollioAPI.amountOfItems = g_amountOfItems;
            //Scroll amount for an item
            var g_itemScrollRange = g_parameters.scrollRange;
            //Item progression coefficient
            var g_progressBarCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
            //Update API
            window.scrollioAPI.progressBarCoef = g_progressBarCoef;
            //Item progress bar width value in pixel
            var g_progressBarValue = g_progressBarCoef * jQ_windowWidth;
            //Between 0 and 1, the progress coef of the current item
            var g_itemProgressCoef = 0;
            //Update API
            window.scrollioAPI.itemProgressCoef = g_itemProgressCoef;
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
            //Scrollio style overrides management
            var g_style = {
                //List of web safe fonts (source: MDN)
                webSafeFonts: {
                    'Arial':            'Arial, Helvetica, sans-serif',
                    'Helvetica':        'Helvetica, Arial, sans-serif',
                    'Courier New':      '"Courier New", monospace',
                    'Georgia':          'Georgia, serif',
                    'Times New Roman':  '"Times New Roman", serif',
                    'Trebuchet MS':     '"Trebuchet MS", sans-serif',
                    'Verdana':          'Verdana, sans-serif',
                    'serif':            'serif',
                    'sans-serif':       'sans-serif',
                    'monospace':        'monospace',
                    'cursive':          'cursive',
                    'fantasy':          'fantasy'
                },
                //This is the final font family name
                fontFamily: g_parameters.fontFamily,
                //Method that builds the URL to the Google Font
                buildGoogleFontURL: function(){
                    //Parameter fontFamily considered as Google font
                    //Convert string to valid gfonts URL syntax
                    var googleFontFamily = g_parameters.fontFamily.replace(/ /g,'+');
                    //Check if font weight is not empty
                    if(g_parameters.fontWeight != ''){
                        //Add the valid font weight syntax for the URL
                        googleFontFamily = googleFontFamily + ':' + g_parameters.fontWeight;
                    }
                    //Quote the Google font family to be valid when called
                    g_style.fontFamily = '"'+g_parameters.fontFamily+'"';
                    //Return the URL
                    return 'https://fonts.googleapis.com/css?family='+googleFontFamily;
                },
                //Method that build the import URL for the CSS
                buildGoogleFontsImportString: function(){
                    return '@import url("'+this.buildGoogleFontURL()+'");';
                },
                //Method that returns the complete CSS string of the specified theme parameter
                //@themeParam - {object} A theme parameter key (e.g. g_parameters.overlayCSS)
                insertCSSof: function(themeParam){
                    //init Scrollio CSS properties string
                    var CSSProperties = '';
                    //Check it is an object
                    if(typeof themeParam == 'object'){
                        //If it is the animationsCSS parameter
                        if(themeParam == g_parameters.animationsCSS){
                            //Array of animation names
                            var animationNames = Object.getOwnPropertyNames(themeParam);
                            //For each animation name
                            animationNames.forEach(function(animationName){
                                //Add keyframes string to declare animation
                                CSSProperties += '@keyframes '+animationName+' {';
                                    //themeParam of animation timings
                                    var percentages = Object.getOwnPropertyNames(themeParam[animationName]);
                                    //For each percentage timing
                                    percentages.forEach(function(percentage){
                                        //Add the current timing
                                        CSSProperties += percentage+' {';
                                        //Add properties + values
                                        CSSProperties += themeParam[animationName][percentage]+';';
                                        //Close animation timing
                                        CSSProperties += '} ';
                                    });
                                //close animation name
                                CSSProperties += '} ';
                            });
                        //Otherwise it is a standard CSS [property]: [value]
                        }else{
                            //Array of properties
                            var properties = Object.getOwnPropertyNames(themeParam);
                            //For each property
                            properties.forEach(function(property){
                                //Check it is a string
                                if(typeof themeParam[property] == 'string'){
                                    //Add the CSS property and its value
                                    CSSProperties += property+': '+themeParam[property]+';';
                                }
                            });
                        }
                    }
                    return CSSProperties;
                },
                //Check Safari browser
                isSafari: function(){
                    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
                        return true;
                    }else{
                        return false;
                    }
                },
                //Flex helper returns the proper flew-warp value
                //@helperValue - string - The Scrollio itemContentChildren value
                //@return - string - The proper flex-wrap value
                flexWrap: function(helperValue){
                    if(typeof helperValue == 'string'){
                        var matches = {
                            horizontal: 'flex-wrap: inherit;',
                            'horizontal-reverse': 'flex-direction: row-reverse; flex-wrap: inherit;',
                            vertical: 'flex-wrap: wrap;',
                            'vertical-reverse': 'flex-wrap: wrap-reverse;'
                        };
                        return matches[helperValue];
                    }
                },
                //Method that build the whole custom CSS for Scrollio
                buildCSS: function(wGoogleFonts){
                    //Init an empty import string in case of external font resource
                    var importString = '';
                    //If Google font, then build the import string
                    if(wGoogleFonts){
                        importString = this.buildGoogleFontsImportString();
                    }
                    //If itemFadeDuration = 0, optimize performances
                    if(g_parameters.itemFadeDuration == 0 || this.isSafari()){
                        jQ_scrollio.addClass('performance-mode');
                    }
                    //Build the custom Scrollio style
                    var style = '<style id="scrollio-style">'+
                                    importString+
                                    //Animations
                                    this.insertCSSof(g_parameters.animationsCSS)+
                                    //Body
                                    'body {'+
                                        this.insertCSSof(g_parameters.bodyCSS)+
                                    '} '+
                                    //Scrollio container
                                    'body #scrollio {'+
                                        'font-family: '+g_style.fontFamily+';'+
                                        //Font size for Extra-Large devices
                                        'font-size: '+g_parameters.fontSizeXL+'px;'+
                                        this.insertCSSof(g_parameters.scrollioContainerCSS)+
                                    '} '+
                                    //Word scrolled
                                    'body #scrollio .word {'+
                                        this.insertCSSof(g_parameters.wordCSS)+
                                    '} '+
                                    //Letter not scrolled yet (default)
                                    'body #scrollio .word .letter {'+
                                        this.insertCSSof(g_parameters.letterDefaultCSS)+
                                    '} '+
                                    //Letter scrolled or currently scrolled
                                    'body #scrollio .word .letter.active {'+
                                        this.insertCSSof(g_parameters.letterActiveCSS)+
                                    '} '+
                                    //Letter currently scrolled
                                    'body #scrollio .word .letter.current {'+
                                        this.insertCSSof(g_parameters.letterCurrentCSS)+
                                    '} '+
                                    //Cursor available only on the current letter
                                    'body #scrollio .word .letter.current:after {'+
                                        this.insertCSSof(g_parameters.cursorCSS)+
                                    '} '+
                                    //The whole ellipsis word
                                    'body #scrollio .word.ellipsis {'+
                                        this.insertCSSof(g_parameters.ellipsisWordCSS)+
                                    '} '+
                                    //Ellipsis letter/character not scrolled yet (default)
                                    'body #scrollio .word.ellipsis .letter {'+
                                        this.insertCSSof(g_parameters.ellipsisDefaultCSS)+
                                    '} '+
                                    //Ellipsis letter/character scrolled or currently scrolled
                                    'body #scrollio .word.ellipsis .letter.active {'+
                                        this.insertCSSof(g_parameters.ellipsisActiveCSS)+
                                    '} '+
                                    //Ellipsis letter/character currently scrolled
                                    'body #scrollio .word.ellipsis .letter.current {'+
                                        this.insertCSSof(g_parameters.ellipsisCurrentCSS)+
                                    '} '+
                                    //Overlay
                                    'body #scrollio>.overlay {'+
                                        this.insertCSSof(g_parameters.overlayCSS)+
                                    '} '+
                                    //Progress bar
                                    'body #scrollio>.progress-bar {'+
                                        this.insertCSSof(g_parameters.progressBarCSS)+
                                    '} '+
                                    //Item hidden/default state
                                    'body #scrollio>.item {'+
                                        this.insertCSSof(g_parameters.itemDefaultCSS)+
                                        this.flexWrap(g_parameters.itemContentLayoutXL)+
                                        'transition: opacity '+g_parameters.itemFadeDuration+'ms;'+
                                    '} '+
                                    //Item visible state
                                    'body #scrollio>.item.active {'+
                                        this.insertCSSof(g_parameters.itemActiveCSS)+
                                    '} '+
                                    //Item content state BEFORE Scrollio initialization
                                    'body #scrollio>.item>* {'+
                                        this.insertCSSof(g_parameters.sentenceBeforeInitCSS)+
                                    '} '+
                                    //Item content state AFTER Scrollio initialization
                                    'body.scrollio-initialized.scrollio-style-loaded #scrollio>.item>* {'+
                                        this.insertCSSof(g_parameters.sentenceAfterInitCSS)+
                                    '} '+
                                    //Complete scrolled sentence containing words and letters
                                    'body #scrollio>.item>.scrolltrack {'+
                                        this.insertCSSof(g_parameters.sentenceCSS)+
                                    '} '+
                                    //Responsive media query for Large devices
                                    '@media (max-width: '+g_parameters.breakPointLG_XL+'px) {'+
                                        'body #scrollio {'+
                                            'font-size: '+g_parameters.fontSizeLG+'px;'+
                                        '} '+
                                        'body #scrollio>.item {'+
                                            this.flexWrap(g_parameters.itemContentLayoutLG)+
                                        '} '+
                                    '} '+
                                    //Responsive media query for Medium devices
                                    '@media (max-width: '+g_parameters.breakPointMD_LG+'px) {'+
                                        'body #scrollio {'+
                                            'font-size: '+g_parameters.fontSizeMD+'px;'+
                                        '} '+
                                        'body #scrollio>.item {'+
                                            this.flexWrap(g_parameters.itemContentLayoutMD)+
                                        '} '+
                                    '} '+
                                    //Responsive media query for Small devices
                                    '@media (max-width: '+g_parameters.breakPointSM_MD+'px) {'+
                                        'body #scrollio {'+
                                            'font-size: '+g_parameters.fontSizeSM+'px;'+
                                        '} '+
                                        'body #scrollio>.item {'+
                                            this.flexWrap(g_parameters.itemContentLayoutSM)+
                                        '} '+
                                    '} '+
                                    //Responsive media query for Extra-Small devices
                                    '@media (max-width: '+g_parameters.breakPointXS_SM+'px) {'+
                                        'body #scrollio {'+
                                            'font-size: '+g_parameters.fontSizeXS+'px;'+
                                        '} '+
                                        'body #scrollio>.item {'+
                                            this.flexWrap(g_parameters.itemContentLayoutXS)+
                                        '} '+
                                    '} '+
                                '</style>';
                    //Include the custom style into the document head
                    jQuery('head').append(style);
                }
            };
            //Work only if styleOverrides == true
            if(g_parameters.styleOverrides){
                //Check if fontFamily parameter is a web safe font
                if(typeof g_style.webSafeFonts[g_parameters.fontFamily] != "undefined"){
                    //Final font family is this web safe font as defined by user
                    g_style.fontFamily = g_style.webSafeFonts[g_parameters.fontFamily];
                    //Build the custom CSS WITHOUT import string
                    g_style.buildCSS();
                    //Add a font ready state CSS class
                    jQ_body.addClass('scrollio-style-loaded');
                }else{
                    //Build the custom CSS WITH import Google font string
                    g_style.buildCSS(true);
                    //Wait for gfont URL loaded
                    jQuery.get(g_style.buildGoogleFontURL(),function(e){
                        //Once fonts loaded, add a font ready state CSS class
                        //THAT AVOIDS TO DISPLAY A FALLBACK FONT BEFORE THE GOOGLE FONT
                        jQ_body.addClass('scrollio-style-loaded');
                    }).fail(function(){
                        //In case of invalid web safe font name or invalid gfont name
                        console.log('invalid web safe font or google font');
                    });
                }
            //If styleOverrides == false, no custom style is loaded
            //Just use the scrollio.css file for style
            }else{
                jQ_body.addClass('scrollio-style-loaded');
            }


            //Wrap letters
            var wrapLetters = function(selector){
                if(typeof(selector) == 'string'){
                    //Wrap every letter of each item title
                    jQ_scrollio.find(selector).each(function(){
                        //First child of the .item is the scroller
                        var jQ_text = jQuery(this).find('.scrolltrack').eq(0);
                        // Font overlap option
                        if(g_parameters.fontOverlapUnder){
                            jQ_text.addClass('overlap');
                        };
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
                            //Manage z-index according to fontOverlapMode
                            if(g_parameters.fontOverlapUnder){
                                zIndex--;
                            }else{
                                zIndex++;
                            }
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
                        for(var i2 = 0; i2 < ellipsis.length; i2++){
                            ellipsisLetters +=  '<span class="letter" style="z-index:'+zIndex+';">'+
                                                    ellipsis[i2]+
                                                '</span>';
                            //Manage z-index according to fontOverlapMode
                            if(g_parameters.fontOverlapUnder){
                                zIndex--;
                            }else{
                                zIndex++;
                            }
                        }
                        //Insert the whole ellipsis into a .word span
                        var finalEllipsis = '<span class="word ellipsis">'+ellipsisLetters+'</span>';
                        var finalResult = result+finalEllipsis;
                        //Replace html
                        jQ_text.html(finalResult);
                    });
                }
            };

            wrapLetters('.item');

            //Update management
            var update = function(){
                //Update value of the scroll top amount
                g_scrollTopRaw = jQuery(window).scrollTop();
                //Update API
                window.scrollioAPI.scrollTop = g_scrollTopRaw;
                //If end of scroll, decrease g_scrollTopRaw to avoid jump
                if(g_scrollTopRaw >= (g_amountOfItems * g_itemScrollRange)){
                    g_scrollTopRaw = g_amountOfItems * g_itemScrollRange - 1;
                    //Trigger event end of scroll
                    jQuery.Event('scrollEnd');
                    jQ_scrollio.trigger({
                        type: 'scrollEnd'
                    });
                }
                //Calculates the displayed item in relation with scroll amount
                g_index = parseInt(g_scrollTopRaw / g_itemScrollRange);
                //Update API
                window.scrollioAPI.index = g_index;
                //Amount of scroll for the current item
                g_relativeScroll = g_scrollTopRaw - g_itemScrollRange * g_index;
                //Update API
                window.scrollioAPI.relativeScroll = g_relativeScroll;
                //jQuery object of the active item
                var jQ_activeItem = jQ_scrollio.children('.item:eq('+g_index+')');
                //jQuery object of the inactive items
                var jQ_inactiveItems = jQ_scrollio.children('.item:not(:eq('+g_index+'))');
                //Between 0 and 1, the progress coef of the current item
                g_itemProgressCoef = g_relativeScroll / g_itemScrollRange;
                //Update API
                window.scrollioAPI.itemProgressCoef = g_itemProgressCoef;

                //LETTERS
                //How many letters into this item title
                var cur_amountOfLetters = jQ_scrollio.find('.item:eq('+g_index+') .letter').length;
                //Amount of scroll per step
                var cur_scrollSteps = parseInt(g_itemScrollRange / cur_amountOfLetters);
                //Index of the letter
                var cur_letterIndex = parseInt(g_relativeScroll / cur_scrollSteps);

                //Work only if needed: Compare previous letter index, if different, then work
                if(cur_letterIndex != g_previousLetterIndex){
                    g_previousLetterIndex = cur_letterIndex;
                    //Create event active item changed for the target item
                    if(!jQ_activeItem.hasClass('active')){
                        jQuery.Event('itemChange');
                        jQuery.Event('lastItem');
                        jQuery.Event('firstItem');
                        jQ_scrollio.trigger({
                            type: 'itemChange',
                            targetIndex: g_index
                        });
                        if(g_index == 0){
                            jQ_scrollio.trigger({
                                type: 'firstItem'
                            });
                        }
                        if(g_index == (g_amountOfItems - 1)){
                            jQ_scrollio.trigger({
                                type: 'lastItem'
                            });
                        }
                    }

                    //Transformations on the active item
                    jQ_activeItem.addClass('active');

                    //Create the event for letter state change
                    jQuery.Event('letterChange');
                    jQ_scrollio.trigger({
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
                        for (var z2 = cur_letterIndex + 1; z2 < cur_amountOfLetters; z2++) {
                            jQ_activeItem
                                .find('.letter:eq('+z2+')')
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

                    //If progress bar is enabled
                    if(g_parameters.progressBar){
                        g_progressBarCoef = g_scrollTopRaw / (g_amountOfItems * g_itemScrollRange);
                        g_progressBarValue = g_progressBarCoef * jQ_windowWidth;
                        jQ_scrollio.children('.progress-bar').css('width',g_progressBarValue);
                        //Update API
                        window.scrollioAPI.progressBarCoef = g_progressBarCoef;
                    }
                    //After all work done, update previous letter index value
                    g_previousLetterIndex = cur_letterIndex;
                }
                //Create item end event
                if(cur_letterIndex == (cur_amountOfLetters - 1)){
                    jQuery.Event('itemEnd');
                    jQ_scrollio.trigger({
                        type: 'itemEnd',
                        index: g_index
                    });
                }
            };

            //If keepActive, add a class to Scrollio container
            if(g_parameters.keepActive){
                jQ_scrollio.addClass('keep-active');
            }

            //If progress bar, include into DOM
            if(g_parameters.progressBar){
                jQ_scrollio.append('<div class="progress-bar"></div>');
            }

            //Callback Scrollio initialization
            jQ_scrollio.on('init',function(e){
                //Now Scrollio is initialized, this avoids recalls
                jQ_body.addClass('scrollio-initialized');
                //Enable user defined callback
                g_parameters.onInit(e);
                //Make the first item visible
                jQ_scrollio.children('.item:first-child').addClass('active');
                //Scrollio plugin init event
                jQuery.Event('initForScrollio');
                jQuery(document).trigger({
                    type: 'initForScrollio'
                });
            });
            //Trigger event initialized
            jQuery.Event('init');
            jQ_scrollio.trigger({
                type: 'init'
            });

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
                    //Between 0 and 1, the overall progress of the Scrollio
                    progressBarCoef: g_progressBarCoef,
                    //Between 0 and 1, the progress coef of the current item
                    itemProgressCoef: g_itemProgressCoef
                });
                //Scrollio plugin scroll event
                jQuery.Event('scrollForScrollio');
                jQuery(document).trigger({
                    type: 'scrollForScrollio',
                    //Returns current item index
                    index: g_index,
                    //Returns current amount of scroll for this item only
                    relativeScroll: g_relativeScroll,
                    //Returns true if scroll event is down
                    isScrollDown: scrollDirectionDown,
                    //Between 0 and 1, the overall progress of the Scrollio
                    progressBarCoef: g_progressBarCoef,
                    //Between 0 and 1, the progress coef of the current item
                    itemProgressCoef: g_itemProgressCoef
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
            jQ_scrollio.on('itemChange',function(e){
                //Enable user defined callback
                var targetIndex = e.targetIndex;
                g_parameters.onItemChange(targetIndex);
                g_okToTrigItemEnd = true;
                //Scrollio plugin itemChange event
                jQuery.Event('itemChangeForScrollio');
                jQuery(document).trigger({
                    type: 'itemChangeForScrollio',
                    //Return the target index
                    index: targetIndex
                });
            });
            //Callback current item is the first
            jQ_scrollio.on('firstItem',function(e){
                //Enable user defined callback
                g_parameters.onFirstItem(e);
                //Scrollio plugin firstItem event
                jQuery.Event('firstItemForScrollio');
                jQuery(document).trigger({
                    type: 'firstItemForScrollio'
                });
            });
            //Callback current item is the last
            jQ_scrollio.on('lastItem',function(e){
                //Enable user defined callback
                g_parameters.onLastItem(e);
                //Scrollio plugin lastItem event
                jQuery.Event('lastItemForScrollio');
                jQuery(document).trigger({
                    type: 'lastItemForScrollio'
                });
            });
            //Callback on letter change
            jQ_scrollio.on('letterChange',function(e){
                //Enable user defined callback
                g_parameters.onLetterChange(e);
                //Scrollio plugin letterChange event
                jQuery.Event('letterChangeForScrollio');
                jQuery(document).trigger({
                    type: 'letterChangeForScrollio'
                });
            });
            //Callback item end
            jQ_scrollio.on('itemEnd',function(e){
                //If itemEnd not already launched few milliseconds ago
                if(g_okToTrigItemEnd){
                    //Enable user defined callback
                    var currentItemIndex = e.index;
                    //Return the current index of the ended item
                    g_parameters.onItemEnd(currentItemIndex);
                    //Make current item a jQuery object
                    // var jQ_currentItem = jQ_scrollio.children('.item').eq(currentItemIndex);
                    //Now block itemEnd works until next item load
                    //This avoids firing itemEnd several time as a result
                    g_okToTrigItemEnd = false;
                    //Scrollio plugin itemEnd event
                    jQuery.Event('itemEndForScrollio');
                    jQuery(document).trigger({
                        type: 'itemEndForScrollio',
                        index: currentItemIndex
                    });
                }
            });
            //Callback scroll end
            jQ_scrollio.on('scrollEnd',function(e){
                //Enable user defined callback
                g_parameters.onScrollEnd(e);
                //Scrollio plugin scrollEnd event
                jQuery.Event('scrollEndForScrollio');
                jQuery(document).trigger({
                    type: 'scrollEndForScrollio'
                });
            });
        }else{
            console.log('Scrollio already initialized');
        }
    };
}(jQuery));
