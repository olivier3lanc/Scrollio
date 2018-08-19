# Scrollio

*A full page scroll experience tool for story telling*. Scrollio is a jQuery plugin that uses the scroll to reveal the text content.

* [Demo with only core CSS](https://codepen.io/olivier3lanc/pen/zLBGEL)
* [Demo with callbacks](https://codepen.io/olivier3lanc/full/bjBbVP/)
* [Demo with Venus theme](https://codepen.io/olivier3lanc/full/ajBzGZ)

## Usage

Here is the minimal code to make Scrollio work properly.

``` html
<html>
<head>
    <title>My Scrollio</title>
    <meta name="description" content="Description of my scrollio">
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

## Options

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
        //Web safe font name or Google Font name
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
            'transform': 'translateY(-75%)',
            'padding': '0em 10vw',
            'transition': 'all 300ms'
        },
        //CSS overrides of an active item
        itemActiveCSS:          {
            'transform': 'translateY(-50%)'
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
        }
    });
</script>

```
| Option           | Default | Type    | Description                                                         |
| ---------------- | ------- | ------- | ------------------------------------------------------------------- |
| scrollRange      | `2000`  | Number  | Amount of pixels scrolled per item                                  |
| keepActive       | `true`  | Boolean | Once scrolled, letters keep active CSS class                        |
| textEllipsis     | `...`   | String  | String displayed at the end of each text to scroll                  |
| progressBar      | `true`  | Boolean | Display the progress bar                                            |
| overlay          | `true`  | Boolean | Display overlay between items and body background                   |


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
| Callback       | Returns  | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
| onInit         |          | Fired on Scrollio initialization                                                       |
| onItemChange   | `number` | Fired on item change, returns the index number of the target item                      |
| onLetterChange |          | Fired on letter change                                                                 |
| onScroll       | `object` | Fired on user scroll, returns `object`: <br>`index`: `[number]` Returns the current item index <br>`relativeScroll`: `[number]` Returns the amount of scroll for the current item <br>`isScrollDown`: `[boolean]` Returns true if scroll event is down <br>`progressBarCoef`: `[number]` Between 0 and 1, the overall progress of the Scrollio <br>`itemProgressCoef`: `[number]` Between 0 and 1, the progress of the current item |
| onItemEnd      | `number` | Fired when user reaches the end of an item, returns the index number of the ended item |
| onFirstItem    |          | Fired when user reaches the first item                                                 |
| onLastItem     |          | Fired when user reaches the last item                                                  |
| onScrollEnd    |          | Fired when user reaches the very end of the scrollio                                 |

## API

### Values and informations with get:

Through the command `jQuery.fn.scrollio('get:[yourRequestString]')`, Scrollio API allows to get values and informations at any time:

| `[yourRequestString]` | Returns                 | Description                                              |
| --------------------- | ----------------------- | -------------------------------------------------------- |
| `defaults`            | `object`                | Returns all default Scrollio parameters                  |
| `current`             | `object`                | Returns all current Scrollio parameters applied          |
| `index`               | `integer`               | Returns the current active item index                    |
| `relativeScroll`      | `integer`               | Returns the amount of scroll for the current item        |
| `amountOfItems`       | `integer`               | Returns the amount items in the Scrollio                 |
| `progressBarCoef`     | `float` between 0 and 1 | Returns the current overall progress of the Scrollio     |
| `itemProgressCoef`    | `float` between 0 and 1 | Returns the progress of the current item                 |
| `scrollTop`           | `integer`               | Returns the current amount of scroll from the top        |
| `api`                 | `object`                | Returns the complete API data                            |

#### Examples

* `jQuery.fn.scrollio('get:defaults')` returns all default Scrollio parameters into an object
* `jQuery.fn.scrollio('get:textEllipsis')` returns the current text ellipsis value
* `jQuery.fn.scrollio('get:index')` returns the current item index
* `jQuery.fn.scrollio('get:itemProgressCoef')` returns the current item progression coefficient
* `jQuery.fn.scrollio('get:api')` returns the complete API data object

### Actions with do:

Through the command `jQuery.fn.scrollio('do:[yourRequestString]')`, Scrollio API allows to call actions.

| `[yourRequestString]` | Description                                       |
| --------------------- | ------------------------------------------------- |
| `goToNextItem`        | Scroll jump to the beginning of the next item     |
| `goToPreviousItem`    | Scroll jump to the beginning of the previous item |
| `goToFirstItem`       | Scroll jump to the beginning of the first item    |
| `goToLastItem`        | Scroll jump to the beginning of the last item     |
| `goToItemStart`       | Scroll jump to the beginning of the current item  |
| `goToItemEnd`         | Scroll jump to the end of the current item        |


#### Examples

* `jQuery.fn.scrollio('do:goToNextItem')` Scroll jump to the beginning of the next item
* `jQuery.fn.scrollio('do:goToPreviousItem')` Scroll jump to the beginning of the previous item

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

### Text wrapping

For each `.item`, **Scrollio wraps every word and every letter of the first markup found**.

Example:

```html
<div id="scrollio">
    <div class="item">
        <p>Lorem ipsum dolor</p>
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
        <p>
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

### Intro

If `intro: true`, an introduction element is included into the `<div id="scrollio"></div>` that shows up:
* **Into the first markup of the intro, letters are wrapped just like other items**.
* By default it displays page title and page description.
* `introTitle: ''` Replaces page title by your own title.
* `introDescription: ''` Replaces page description by your own description.
* `active` class is removed on first scroll and is not set again.

Here is the markup included:

```html
<div id="scrollio">
    <div class="intro active">
        <header>
            <h1>Page Title or `introTitle` option</h1>
            <p class="description">Page description or `introDescription` option</p>
        </header>
    </div>
</div>
```

Renders:

```html
<div id="scrollio">
    <div class="intro active"><!-- On first scroll, active class disappears -->
        <header>
            <h1>
                <span class="word">
                    <span class="letter" style="z-index:1000;">V</span>
                    <span class="letter" style="z-index:999;">e</span>
                    <span class="letter" style="z-index:998;">n</span>
                    <span class="letter" style="z-index:997;">u</span>
                    <span class="letter" style="z-index:996;">s</span>
                </span>
                <span class="separator"> </span>
                <span class="word">
                    <span class="letter" style="z-index:994;">t</span>
                    <span class="letter" style="z-index:993;">h</span>
                    <span class="letter" style="z-index:992;">e</span>
                    <span class="letter" style="z-index:991;">m</span>
                    <span class="letter" style="z-index:990;">e</span>
                </span>
                <span class="separator"> </span>
                <span class="word ellipsis">
                    <span class="letter" style="z-index:988;">.</span>
                    <span class="letter" style="z-index:987;">.</span>
                    <span class="letter" style="z-index:986;">.</span>
                </span>
            </h1>
            <p class="description">Demonstration of Venus theme for Scrollio</p>
        </header>
    </div>
</div>
```

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

### Font size

`fontSize` option `[number]`. You can adjust the font size of the scrolled text. Scrollio supports 7 font sizes that are managed by the theme.
* `fontSize: 1` XXSmall font size
* `fontSize: 2` XSmall font size
* `fontSize: 3` Small font size
* `fontSize: 4` Medium font size
* `fontSize: 5` Large font size
* `fontSize: 6` XLarge font size
* `fontSize: 7` XXLarge font size
