# Scrollshow

*A scroll experience tool for story telling*. Scrollshow is a jQuery plugin that uses the scroll to reveal the content.

## Usage

Here is the minimal code to make Scrollshow work properly.

``` html
<!DOCTYPE html>
<html>
<head>
    <!-- Scrollshow core CSS (required) -->
    <link href="scrollshow-core.min.css" rel="stylesheet">
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
    <link href="https://olivier3lanc.github.io/Scrollshow/build/scrollshow-core.min.css" rel="stylesheet">
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
