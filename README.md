# Scrollio

*A full page scroll experience tool for story telling*. Scrollio is a jQuery plugin that uses the scroll to reveal the text content.

* [Demo with only core CSS](https://codepen.io/olivier3lanc/pen/zLBGEL)
* [Demo with callbacks](https://codepen.io/olivier3lanc/full/bjBbVP/)
* [Demo with Venus theme](https://codepen.io/olivier3lanc/full/ajBzGZ)

## Usage

Here is the minimal code to make Scrollio work properly.

``` html
<!DOCTYPE html>
<html>
<head>
    <!-- Scrollio core CSS (required) -->
    <link href="scrollio.min.css" rel="stylesheet">
</head>

<body>
    <div id="scrollio">
        <div class="item">
            [your content]
        </div>
        <div class="item">
            [your content]
        </div>
        <div class="item">
            [your content]
        </div>
        <div class="item">
            [your content]
        </div>
    </div>

    <!-- jQuery (required) -->
    <script type="text/javascript" src="jquery.min.js"></script>
    <!-- Scrollio (required) -->
    <script type="text/javascript" src="scrollio.min.js"></script>
    <!-- Initialize -->
    <script type="text/javascript">
        jQuery.fn.scrollio();
    </script>
</body>

</html>
```

Typical markup with CDN:

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
            <p>Any html content 1</p>
        </div>
        <div class="item">
            <p>Any html content 2</p>
        </div>
        <div class="item">
            <p>Any html content 3</p>
        </div>
        <div class="item">
            <p>Any html content 4</p>
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

Here are all the options and callbacks available in Scrollio.

```html
<script type="text/javascript">
    jQuery.fn.scrollio({
        scrollRange:        2000,
        keepActive:         true,
        textEllipsis:       '...',
        fontSize:           7,
        intro:              false,
        introTitle:         '',
        introDescription:   '',
        progressBar:        true,
        overlay:            true,
        onItemChange:       function(e){

        },
        onLetterChange:     function(e){

        },
        onScroll:           function(e){

        },
        onItemEnd:          function(e){

        },
        onFirstItem:        function(e){

        },
        onLastItem:         function(e){

        },
        onScrollEnd:        function(e){

        }
    });
</script>
```
| Option           | Default | Type    | Description                                                         |
| ---------------- | ------- | ------- | ------------------------------------------------------------------- |
| scrollRange      | `2000`  | Number  | Amount of pixels scrolled per item                                  |
| keepActive       | `true`  | Boolean | Once scrolled, letters keep active CSS class                        |
| textEllipsis     | `...`   | String  | String displayed at the end of each text to scroll                  |
| fontSize:        | `6`     | Number  | From 1 to 7: Font size of the scrolled text (managed by theme CSS)  |
| intro            | `false` | Boolean | Display intro (document title + description) before first scroll    |
| introTitle       |         | String  | Display a custom title for the intro. HTML allowed <br>Applicable only if intro: `true`       |
| introDescription |         | String  | Display a custom description for the intro. HTML allowed <br>Applicable only if intro: `true` |
| progressBar      | `true`  | Boolean | Display the progress bar                                            |
| overlay          | `true`  | Boolean | Display overlay between items and body background                   |

## Callbacks

| Callback       | Returns  | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
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
