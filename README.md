# Scrollshow

*A full page scroll experience tool for story telling*.
Scrollshow is a jQuery plugin that uses the scroll to reveal the text content.

## Demo

* [Demo with only core CSS](https://codepen.io/olivier3lanc/pen/zLBGEL)
* [Demo with callbacks](https://codepen.io/olivier3lanc/full/bjBbVP/)
* [Demo with Venus theme](https://codepen.io/olivier3lanc/full/ajBzGZ)

## Usage

Here is the minimal code to make Scrollshow work properly.

``` html
<!DOCTYPE html>
<html>
<head>
    <!-- Scrollshow core CSS (required) -->
    <link href="scrollshow.min.css" rel="stylesheet">
</head>

<body>
    <div id="scrollshow">
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
    <!-- Scrollshow (required) -->
    <script type="text/javascript" src="scrollshow.min.js"></script>
    <!-- Initialize -->
    <script type="text/javascript">
        jQuery.fn.scrollshow();
    </script>
</body>

</html>
```

Typical markup with CDN:

``` html
<html>
<head>
    <title>My Scrollshow</title>
    <meta name="description" content="Description of my scrollshow">
    <!-- Scrollshow core CSS -->
    <link href="https://olivier3lanc.github.io/Scrollshow/build/scrollshow.min.css" rel="stylesheet">
</head>

<body>
    <div id="scrollshow">
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
    <!-- Scrollshow lib -->
    <script type="text/javascript" src="https://olivier3lanc.github.io/Scrollshow/build/scrollshow.min.js"></script>
    <!-- Initialize -->
    <script type="text/javascript">
        jQuery.fn.scrollshow();
    </script>
</body>

</html>
```

## Options and callbacks

Here are all the options and callbacks available in Scrollshow.

```html
<script type="text/javascript">
    jQuery.fn.scrollshow({
        scrollRange:        2000,
        keepActive:         true,
        textEllipsis:       '...',
        intro:              false,
        navigation:         false,
        progressBar:        true,
        overlay:            true,
        clickToGoNext:      false,
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

| Option        | Default | Type    | Description                                                      |
| ------------- | ------- | ------- | ---------------------------------------------------------------- |
| scrollRange   | `2000`  | Number  | Amount of pixels scrolled per item                               |
| keepActive    | `true`  | Boolean | Once scrolled, letters keep active CSS class                     |
| textEllipsis  | `...`   | String  | String displayed at the end of each text to scroll               |
| intro         | `false` | Boolean | Display intro (document title + description) before first scroll |
| navigation    | `false` | Boolean | Display link bullets to items and progress                       |
| progressBar   | `true`  | Boolean | Display the progress bar                                         |
| overlay       | `true`  | Boolean | Display overlay between items and body background                |
| clickToGoNext | `false` | Boolean | User needs to click to display next item                         |


| Callback       | Returns  | Description                                                                            |
| -------------- | -------- | -------------------------------------------------------------------------------------- |
| onItemChange   | `number` | Fired on item change, returns the index number of the target item                      |
| onLetterChange |          | Fired on letter change                                                                 |
| onScroll       |          | Fired on user scroll                                                                   |
| onItemEnd      | `number` | Fired when user reaches the end of an item, returns the index number of the ended item |
| onFirstItem    |          | Fired when user reaches the first item                                                 |
| onLastItem     |          | Fired when user reaches the last item                                                  |
| onScrollEnd    |          | Fired when user reaches the very end of the scrollshow                                 |


## How it works

### Items

If `clickToGoNext: true`:
* When an item is scrolled entirely, a `done` class it added.
* Current item has `active` class.

```html
<div id="scrollshow">
    <div class="item done">
        <!-- Fully scrolled item -->
    </div>
    <div class="item active">
        <!-- Current item -->
    </div>
    <div class="item">
        <!-- Item not scrolled yet -->
    </div>
</div>
```

If `clickToGoNext: false`, only an `active` class it added on the current item.

```html
<div id="scrollshow">
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

For each `.item`, **Scrollshow wraps every word and every letter of the first markup found**.

Example:

```html
<div id="scrollshow">
    <div class="item">
        <p>Lorem ipsum dolor</p>
        <p>Another paragraph</p>
    </div>
</div>
```

Becomes

```html
<div id="scrollshow">
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
        </p>
        <p>Another paragraph</p>
    </div>
    <div class="item">...</div>
</div>
```

| Wrapper CSS class                     | Description                       |
| ------------------------------------- | --------------------------------- |
| `<span class="word>`                  | Wrap every word                   |
| `<span class="letter>`                | Wrap every letter                 |
| `<span class="letter active">`         | If `keepActive: true` the letter keeps the `active` class once scrolled. If `keepActive: false` the letter has `active` class only when it is the latest scrolled. |
| `<span class="letter active current">` | The letter is the latest scrolled |

### Intro

If `intro: true`, an introduction element is included into the `<div id="scrollshow"></div>` that shows up:
* **Into the first markup of the intro, letters are wrapped just like other items**.
* Displays page title and page description.
* `active` class is removed on first scroll and is not set again.

Here is the markup included:

```html
<div id="scrollshow">
    <div class="intro active">
        <header>
            <h1>[document title]</h1>
            <p class="description">[head meta description]</p>
        </header>
    </div>
</div>
```

Renders:

```html
<div id="scrollshow">
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
                <span class="word">
                    <span class="letter" style="z-index:988;">.</span>
                    <span class="letter" style="z-index:987;">.</span>
                    <span class="letter" style="z-index:986;">.</span>
                </span>
            </h1>
            <p class="description">Demonstration of Venus theme for Scrollshow</p>
        </header>
    </div>
</div>
```

### Progress bar

If `progressBar: true`, a progress bar is included into the `<div id="scrollshow"></div>` as follows:

```html
<div id="scrollshow">
    <div class="progress-bar" style="width:..."></div>
</div>
```

### Overlay

If `overlay: true`, an overlay is included into the `<div id="scrollshow"></div>` as follows:

```html
<div id="scrollshow">
    <div class="overlay"></div>
</div>
```

### Navigation

If `navigation: true`, a navigation element with its own progress bar and link bullets is included into the `<div id="scrollshow"></div>`. A `<nav>` element containing links to associated items. Each item scrolled is set to `active`.

```html
<div id="scrollshow">
    <nav class="navigation">
        <a href="#0" class="active"></a>
        <span class="progress" style="height: ...px;"></span>
        <a href="#1" class="">
        </a><a href="#2" class=""></a>
        <a href="#3" class=""></a>
    </nav>
</div>
```

### Text ellipsis

Additional text string can be added to each item. By default it is `...`. **This text ellipsis string is wrapped** like other letters.

### clickToGoNext

You can prompt the user to click to go to the next item each time an item is ended. Here is the markup that is included if the option `clickToGoNext` is set to `true`:

Click to go next is visible:

```html
<div id="scrollshow">
    <div class="click-to-go-next active">
        <p>
            <a href="#next">
                <span>next</span>
            </a>
        </p>
    </div>
</div>
```

Click to go next is awaiting to be displayed:

```html
<div id="scrollshow">
    <div class="click-to-go-next">
        <p>
            <a href="#next">
                <span>next</span>
            </a>
        </p>
    </div>
</div>
```
