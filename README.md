# Scrollio

*A full page scroll experience tool for story telling*. Scrollio is a jQuery plugin that uses the scroll to reveal the text content.

* [Demo](https://codepen.io/olivier3lanc/pen/zLBGEL)
* [Demo with callbacks](https://codepen.io/olivier3lanc/full/bjBbVP/)

## Usage

Here is the minimal code to make Scrollio work properly.

1. Include `<link href="scrollio.min.css" rel="stylesheet">` into the `<head>` of your document.
1. Include the Scrollio markup into your `<body>`. Just put your content into `.item` and add class `.scrolltrack` to the HTML tag you wish to scroll. Here is an example of the minimal markup required:
``` html
<div id="scrollio">
    <div class="item">
        <!-- Your content with one HTML tag with "scrolltrack" class -->
    </div>
    <div class="item">
        <!-- Your content with one HTML tag with "scrolltrack" class -->
    </div>
    <div class="item">
        <!-- Your content with one HTML tag with "scrolltrack" class -->
    </div>
    <!-- ... -->
</div>
```
1. Include jQuery `<script type="text/javascript" src="jquery.min.js"></script>`
1. Include Scrollio after jQuery `<script type="text/javascript" src="scrollio.min.js"></script>`
1. Initialize Scrollio:
``` html
<script type="text/javascript">
    jQuery.fn.scrollio();
</script>
```

A full page example with Scrollio:

``` html
<html>
<head>
    <title>My Scrollio</title>
    <meta name="description" content="Description of my page with scrollio">
    <!-- Scrollio core CSS -->
    <link href="https://olivier3lanc.github.io/Scrollio/build/scrollio.min.css" rel="stylesheet">
</head>

<body>
    <div id="scrollio">
        <div class="item">
            <h2>My heading 1</h2>
            <p class="scrolltrack">Markup to be scrolled is set by the scrolltrack CSS class name.</p>
        </div>
        <div class="item">
            <p class="scrolltrack">Markup to be scrolled 2</p>
        </div>
        <div class="item">
            <h2 class="scrolltrack">Markup to be scrolled 3</h2>
            <p>Another independant markup</p>
        </div>
        <div class="item">
            <h2>My heading 4</h2>
            <p class="scrolltrack">Markup to be scrolled 4</p>
        </div>
    </div>

    <!-- jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <!-- Scrollio lib -->
    <script type="text/javascript" src="https://olivier3lanc.github.io/Scrollio/build/scrollio.min.js"></script>
    <!-- Initialize -->
    <script type="text/javascript">
        jQuery.fn.scrollio();
    </script>
</body>

</html>
```

## All options

Here are all the options with their default values available in Scrollio.

```html
<script type="text/javascript">
    jQuery.fn.scrollio({
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
        fontSizeLG:             56,
        //Responsive font size in pixels for Medium devices
        fontSizeMD:             36,
        //Responsive font size in pixels for Small devices
        fontSizeSM:             24,
        //Responsive font size in pixels for Extra-Small devices
        fontSizeXS:             18,
        //Responsive break point in pixels between large and extra-large
        breakPointLG_XL:        1200,
        //Responsive break point in pixels between medium and large
        breakPointMD_LG:        992,
        //Responsive break point in pixels between small and medium
        breakPointSM_MD:        768,
        //Responsive break point in pixels between extra-small and small
        breakPointXS_SM:        575,
        //Enable/disable style overrides. Quickly remove all styles overrides
        //For testing and debug purpose.
        styleOverrides:         true,
        //@keyframes animations declarations that have to be used into the custom CSS
        animationsCSS:          {
            'cursor': {
                '0%': 'opacity: 0',
                '100%': 'opacity: 1'
            }
        },
        //CSS overrides of scrolled text BEFORE Scrollio initialization
        sentenceBeforeInitCSS:      {
            'transition': 'transform 1s',
            'transform': 'scale(0)'
        },
        //CSS overrides of scrolled text AFTER Scrollio initialization
        sentenceAfterInitCSS:       {
            'transform': 'scale(1)'
        },
        //CSS overrides of page body
        bodyCSS:                {
            'background-color': '#1b4b7d',
            'color': '#fff',
            '-webkit-font-smoothing': 'antialiased'
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
            'opacity': '0.5',
            'transition': 'all 200ms',
            'text-shadow': '0px 0px 0px rgba(0,0,0,.5)',
            'transform': 'scale(0.5)'
        },
        //CSS overrides of a scrolled or currently scrolled letter
        letterActiveCSS:        {
            'color': 'white',
            'opacity': '1',
            'text-shadow': '5px 1px 8px rgba(0,0,0,.5)',
            'transform': 'scale(1)'
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
    });
</script>
```

## Basic options

| Option           | Default  | Type    | Description                                                    |
| ---------------- | -------- | ------- | -------------------------------------------------------------- |
| scrollRange      | `2000`   | Integer | Amount of pixels scrolled per item                             |
| keepActive       | `true`   | Boolean | Once scrolled, letters keep active CSS class                   |
| textEllipsis     | `...`    | String  | String displayed at the end of each text to scroll             |
| fontFamily       | `Ubuntu` | String  | Web safe font name or [Google Font](https://fonts.google.com) name. List of web safe font names available: `Arial`,`Helvetica`,`Courier New`,`Georgia`,`Times New Roman`,`Verdana`,`serif`,`sans-serif`,`monospace`,`cursive`,`fantasy`|
| fontWeight       | `Bold`   | String  | Font weight (applicable only for Google Fonts)                 |
| fontOverlapUnder | `true`   | Boolean | Each letter is under the previous                              |
| progressBar      | `true`   | Boolean | Display the progress bar                                       |
| overlay          | `true`   | Boolean | Display overlay between items and body background              |
| fontSizeXL       | `84`     | Integer | Responsive font size in pixels for Extra-Large devices         |
| fontSizeLG       | `56`     | Integer | Responsive font size in pixels for Large devices               |
| fontSizeMD       | `36`     | Integer | Responsive font size in pixels for Medium devices              |
| fontSizeSM       | `24`     | Integer | Responsive font size in pixels for Small devices               |
| fontSizeXS       | `18`     | Integer | Responsive font size in pixels for Extra-Small devices         |
| breakPointLG_XL  | `1200`   | Integer | Responsive break point in pixels between large and extra-large |
| breakPointMD_LG  | `992`    | Integer | Responsive break point in pixels between medium and large      |
| breakPointSM_MD  | `768`    | Integer | Responsive break point in pixels between small and medium      |
| breakPointXS_SM  | `575`    | Integer | Responsive break point in pixels between extra-small and small |
| styleOverrides   | `true`   | Boolean | If false, quickly remove all styles overrides.                 |
| [pluginID]       |          | Object  | Plugin parameters                                              |

## Style overrides options

Here are advanced options of Scrollio that allows to obtain a high level of customizations. These options are all objects that are important shorthands to the default Scrollio style. **All objects keys and values refer to CSS properties and values.**

You can freely override default CSS of `scrollio.min.css` or add new CSS properties.

* Keyframes animations declarations that have to be used into the custom CSS
``` js
//Example
animationsCSS: {
    'cursor': {
        '0%': 'opacity: 0',
        '100%': 'opacity: 1'
    }
}
```
* CSS overrides of scrolled text BEFORE Scrollio initialization
``` js
//Example
sentenceBeforeInitCSS: {
    'transition': 'transform 1s',
    'transform': 'scale(0)'
}
```
* CSS overrides of scrolled text AFTER Scrollio initialization
``` js
//Example
sentenceAfterInitCSS:       {
    'transform': 'scale(1)'
}
```
* CSS overrides of page body
``` js
//Example
bodyCSS: {
    'background-color': '#1b4b7d',
    'color': '#fff',
    '-webkit-font-smoothing': 'antialiased'
}
```
* CSS overrides of Scrollio container
``` js
//Example
scrollioContainerCSS: {
    //your css properties
}
```
* CSS overrides of an inactive item
``` js
//Example
itemDefaultCSS: {
    'transform': 'translateY(-75%)',
    'padding': '0em 10vw',
    'transition': 'all 300ms'
}
```
CSS overrides of an active item
``` js
//Example
itemActiveCSS: {
    'transform': 'translateY(-50%)'
}
```
* CSS overrides of the whole scrolled text sentence
``` js
//Example
sentenceCSS: {
    'line-height': '1.3em'
}
```
* CSS overrides of a word
``` js
//Example
wordCSS: {
    //your css properties
}
```
* CSS overrides of a letter not scrolled yet
``` js
//Example
letterDefaultCSS: {
    'margin-left': '-0.1em',
    'opacity': '0.5',
    'transition': 'all 200ms',
    'text-shadow': '0px 0px 0px rgba(0,0,0,.5)',
    'transform': 'scale(0.5)'
}
```
* CSS overrides of a scrolled or currently scrolled letter
``` js
//Example
letterActiveCSS: {
    'color': 'white',
    'opacity': '1',
    'text-shadow': '5px 1px 8px rgba(0,0,0,.5)',
    'transform': 'scale(1)'
}
```
* CSS overrides of the currently scrolled letter
``` js
//Example
letterCurrentCSS: {
    //your css properties
}
```
* CSS overrides of the cursor included only into currently scrolled letter
``` js
//Example
cursorCSS: {
    'top': '0px',
    'right': '0px',
    'width': '2px',
    'height': '100%',
    'background-color': 'white',
    'animation-name': 'cursor', //Declared into animationsCSS
    'animation-duration': '600ms',
    'animation-iteration-count': 'infinite',
    'animation-direction': 'alternate'
}
```
* CSS overrides of the entire ellipsis word
``` js
//Example
ellipsisWordCSS: {
    //your css properties
}
```
* CSS overrides of an ellipsis character not scrolled yet
``` js
//Example
ellipsisDefaultCSS: {
    //your css properties
}
```
* CSS overrides of an ellipsis scrolled or currently scrolled
``` js
//Example
ellipsisActiveCSS: {
    //your css properties
}
```
* CSS overrides of the ellipsis currently scrolled character
``` js
ellipsisCurrentCSS: {
    //your css properties
}
```
* CSS overrides of the progress bar
``` js
//Example
progressBarCSS: {
    'background-color': 'white'
}
```
* CSS overrides of the overlay layer
``` js
//Example
overlayCSS: {
    'opacity': '1',
    'background': 'radial-gradient(ellipse at top, transparent, #07131f)'
}
```

## Plugins parameters

When a Scrollio plugin is included, it may have its own parameters. To set custom parameters, simply add the plugin ID option key to the options object as follows:

Considering we have a plugin ID named `myPluginID`, just add an option key with the plugin ID containing the plugin parameters you wish to override.

```html
<!-- jQuery -->
<script type="text/javascript" src="jquery.min.js"></script>
<!-- Scrollio -->
<script type="text/javascript" src="scrollio.min.js"></script>
<!-- Scrollio plugin -->
<script type="text/javascript" src="scrollio.plugin.name.min.js"></script>
<script type="text/javascript">
    jQuery.fn.scrollio({
        //Add plugin id just like other options and callbacks for Scrollio
        myPluginID: {
            //Available parameters you want to override
            exampleParamName1: false,
            exampleMethodName1: function(){
                //your code
            }
        }
    });
</script>
```

## Callbacks

Here are all the callbacks with their own returned data available in Scrollio.

```html
<script type="text/javascript">
    jQuery.fn.scrollio({
        onInit:             function(){
            //Your stuff here
        },
        onItemChange:       function(data){
            //Your stuff here
        },
        onLetterChange:     function(){
            //Your stuff here
        },
        onScroll:           function(data){
            //Your stuff here
        },
        onItemEnd:          function(data){
            //Your stuff here
        },
        onFirstItem:        function(){
            //Your stuff here
        },
        onLastItem:         function(){
            //Your stuff here
        },
        onScrollEnd:        function(){
            //Your stuff here
        }
    });
</script>

```

Callbacks are dispatched to the main Scrollio jQuery object `jQuery('#scrollio')`

| Callback       | Returns  | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
| onInit         |          | Fired on Scrollio initialization                                                       |
| onItemChange   | `number` | Fired on item change, returns the index number of the target item                      |
| onLetterChange |          | Fired on letter change                                                                 |
| onScroll       | `object` | Fired on user scroll, returns `object`: <br>`index`: `[number]` Returns the current item index <br>`relativeScroll`: `[number]` Returns the amount of scroll for the current item <br>`isScrollDown`: `[boolean]` Returns true if scroll event is down <br>`progressBarCoef`: `[number]` Between 0 and 1, the overall progress of the Scrollio <br>`itemProgressCoef`: `[number]` Between 0 and 1, the progress of the current item |
| onItemEnd      | `number` | Fired when user reaches the end of an item, returns the index number of the ended item |
| onFirstItem    |          | Fired when user reaches the first item                                                 |
| onLastItem     |          | Fired when user reaches the last item                                                  |
| onScrollEnd    |          | Fired when user reaches the very end of the scrollio                                   |

## API

### Get current parameters applied

Through the command `scrollioAPI.defaults.[parameterName]')`, Scrollio API returns the parameters currently in use.

Examples:

* `scrollioAPI.defaults.scrollRange` returns the current scroll range parameter value
* `scrollioAPI.defaults.textEllipsis` returns the current text ellipsis parameter value

### Get relevant values

Through the command `scrollioAPI.[yourRequest]')`, Scrollio API returns values being used in real time:

| `[yourRequest]`       | Returns                 | Description                                              |
| --------------------- | ----------------------- | -------------------------------------------------------- |
| `index`               | `integer`               | Returns the current active item index                    |
| `relativeScroll`      | `integer`               | Returns the amount of scroll for the current item        |
| `amountOfItems`       | `integer`               | Returns the amount items in the Scrollio                 |
| `progressBarCoef`     | `float` between 0 and 1 | Returns the current overall progress of the Scrollio     |
| `itemProgressCoef`    | `float` between 0 and 1 | Returns the progress of the current item                 |
| `scrollTop`           | `integer`               | Returns the current amount of scroll from the top        |

Examples:

* `scrollioAPI.index` returns the current item index
* `scrollioAPI.itemProgressCoef` returns the current item progression coefficient

### Methods

Through the command `scrollio.[methodName]')`, Scrollio API allows to call actions.

| `[methodName]`          | Description                                       |
| ----------------------- | ------------------------------------------------- |
| `goToNextItem()`        | Scroll jump to the beginning of the next item     |
| `goToPreviousItem()`    | Scroll jump to the beginning of the previous item |
| `goToFirstItem()`       | Scroll jump to the beginning of the first item    |
| `goToLastItem()`        | Scroll jump to the beginning of the last item     |
| `goToItemStart()`       | Scroll jump to the beginning of the current item  |
| `goToItemEnd()`         | Scroll jump to the end of the current item        |


Examples:

* `scrollioAPI.goToNextItem()` Scroll jump to the beginning of the next item
* `scrollioAPI.goToPreviousItem()` Scroll jump to the beginning of the previous item

## Plugins

Plugins allow to add features to Scrollio. You can create your own Scrollio plugin.

```js
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
```

Plugins use Scrollio API Events that are dispatched to the `document`

| Events dispatched to `document` | Returns  | Description                                                                            |
| ------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| initForScrollio                 |          | Fired on Scrollio initialization                                                       |
| itemChangeForScrollio           | `number` | Fired on item change, returns the index number of the target item                      |
| letterChangeForScrollio         |          | Fired on letter change                                                                 |
| scrollForScrollio               | `object` | Fired on user scroll, returns `object`: <br>`index`: `[number]` Returns the current item index <br>`relativeScroll`: `[number]` Returns the amount of scroll for the current item <br>`isScrollDown`: `[boolean]` Returns true if scroll event is down <br>`progressBarCoef`: `[number]` Between 0 and 1, the overall progress of the Scrollio <br>`itemProgressCoef`: `[number]` Between 0 and 1, the progress of the current item |
| ItemEndForScrollio              | `number` | Fired when user reaches the end of an item, returns the index number of the ended item |
| FirstItemForScrollio            |          | Fired when user reaches the first item                                                 |
| lastItemForScrollio             |          | Fired when user reaches the last item                                                  |
| scrollEndForScrollio            |          | Fired when user reaches the very end of the scrollio                                   |


## How it works

### Items

An `active` class it added on the current item.

```html
<div id="scrollio">
    <div class="item">
        <!-- not current item -->
    </div>
    <div class="item active">
        <!-- Current item -->
    </div>
    <div class="item">
        <!-- not current item -->
    </div>
</div>
```

### Responsive font sizes

Scrollio allows to assign responsive font sizes according to device width:
* `fontSizeXL` is assigned to devices larger than `breakPointLG_XL`
* `fontSizeLG` is assigned to devices between `breakPointMD_LG` and `breakPointLG_XL`
* `fontSizeMD` is assigned to devices between `breakPointSM_MD` and `breakPointMD_LG`
* `fontSizeSM` is assigned to devices between `breakPointXS_SM` and `breakPointSM_MD`
* `fontSizeXS` is assigned to devices smaller than `breakPointXS_SM`

```
-------------------------------------- Device width ------------------------------------

        breakPointXS_SM     breakPointSM_MD     breakPointMD_LG     breakPointLG_XL
               |                   |                   |                  |
fontSizeXS     |    fontSizeSM     |    fontSizeMD     |    fontSizeLG    |   fontSizeXL
               |                   |                   |                  |      

```

### Text wrapping

For each `.item`, **Scrollio wraps every word and every letter of the first markup found**.

Example:

```html
<div id="scrollio">
    <div class="item">
        <p class="scrolltrack">Lorem ipsum dolor</p>
        <p>Another paragraph</p>
    </div>
</div>
```

Becomes

```html
<div id="scrollio">
    <div class="item">...</div>
    <div class="item">
        <!-- Letters wrapping is made on the first html element into the item -->
        <p class="scrolltrack">
            <span class="word">
                <span class="letter active" style="z-index:1000;">L</span>
                <span class="letter active" style="z-index:999;">o</span>
                <span class="letter active" style="z-index:998;">r</span>
                <span class="letter active" style="z-index:997;">e</span>
                <span class="letter active" style="z-index:996;">m</span>
            </span>
            <span class="separator"> </span>
            <span class="word">
                <span class="letter active" style="z-index:995;">i</span>
                <span class="letter active current" style="z-index:994;">p</span>
                <span class="letter" style="z-index:993;">s</span>
                <span class="letter" style="z-index:992;">u</span>
                <span class="letter" style="z-index:991;">m</span>
            </span>
            <span class="separator"> </span>
            <span class="word">
                <span class="letter" style="z-index:990;">d</span>
                <span class="letter" style="z-index:989;">o</span>
                <span class="letter" style="z-index:988;">l</span>
                <span class="letter" style="z-index:987;">o</span>
                <span class="letter" style="z-index:986;">r</span>
            </span>
            <span class="word ellipsis">
                <span class="letter" style="z-index:985;">.</span>
                <span class="letter" style="z-index:984;">.</span>
                <span class="letter" style="z-index:983;">.</span>
            </span>
        </p>
        <p>Another paragraph</p>
    </div>
    <div class="item">...</div>
</div>
```

| Wrapper CSS class                      | Description                                 |
| -------------------------------------- | ------------------------------------------- |
| `<span class="word>`                   | Wrap every word                             |
| `<span class="word ellipsis>`          | The very last word is always text ellipsis  |
| `<span class="letter>`                 | Wrap every letter                           |
| `<span class="letter active">`         | If `keepActive: true` the letter keeps the `active` class once scrolled. If `keepActive: false` the letter has `active` class only when it is the latest scrolled. |
| `<span class="letter active current">` | The letter is the latest scrolled           |

### Progress bar

If `progressBar: true` `[boolean]`, a progress bar is included into the `<div id="scrollio"></div>` as follows:

```html
<div id="scrollio">
    <div class="progress-bar" style="width:..."></div>
</div>
```

### Overlay

If `overlay: true` `[boolean]`, an overlay is included into the `<div id="scrollio"></div>` as follows:

```html
<div id="scrollio">
    <div class="overlay"></div>
</div>
```

### Text ellipsis

`textEllipsis` option `[string]`. Additional text string is added at the end of each item. By default it is `...`. **This text ellipsis string is wrapped** like other letters.

```html
<span class="word ellipsis">
    <span class="letter" style="z-index:985;">.</span>
    <span class="letter" style="z-index:984;">.</span>
    <span class="letter" style="z-index:983;">.</span>
</span>

```
