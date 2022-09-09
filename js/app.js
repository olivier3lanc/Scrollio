jQuery.fn.scrollio({
    fontFamily: 'Stick No Bills',
    fontWeight: '',
    // sentenceCSS:            {
    //     'line-height': '1.3em'
    // },
    overlayCSS: {
        opacity: '1',
        background: 'radial-gradient(ellipse at top, transparent, #07131f)'
    },
    //@keyframes animations declarations that have to be used into the custom CSS
    animationsCSS:          {
        cursor: {
            '0%': 'opacity: 1',
            '100%': 'opacity: 0'
        }
    },
    letterDefaultCSS:       {
        'color': 'black'
    },
    letterActiveCSS:       {
        'color': 'white'
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
});