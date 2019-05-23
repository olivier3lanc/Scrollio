---
title: Generator
layout: page
scripts: ['matryoshka/tabs.js']
---
<button id="add-item">+</button>
<button id="build">build</button>
<div id="global-options">
</div>
<div id="generator"></div>
<script>
// letterDefaultCSS:       {
//     'margin-left': '-0.1em',
//     'opacity': '0',
//     'transition': 'all 300ms',
//     'text-shadow': '0.07em 0.01em 0.1em rgba(0,0,0,.5)',
//     'transform': 'scale(0.2) translateX(2em) translateY(2em)'
// },
// //CSS overrides of a scrolled or currently scrolled letter
// letterActiveCSS:        {
//     'color': 'white',
//     'opacity': '1',
//     'transform': 'translateX(0em)'
// },
    jQuery('#mainflex > main').css('max-width', '500px');
    var allOptions = {
        scrollRange:            [2000, 'Amount of pixels scrolled per item', {
            inputAttributes: 'min="400" max="40000" step="200"'
        }],
        keepActive:             [true, 'Once scrolled, letters keep active CSS class'],
        itemPosition:           [{values:['top', 'middle', 'bottom'], default: 'middle'}, 'Position of the item (top, middle, bottom)'],
        itemAlignment:          [{values:['left', 'center', 'right'], default: 'center'}, 'Alignment of the item (left, center, right)'],
        textAlignment:          [{values:['left', 'center', 'right'], default: 'center'}, 'Alignment of the text into its item'],
        textEllipsis:           ['...', 'String displayed at the end of each text to scroll'],
        itemFadeDuration:       [500, 'Cross fade duration between items in ms', {
            inputAttributes: 'min="0" max="2000" step="50"'
        }],
        fontFamily:             ['Ubuntu', 'Google Font name or web safe font name: Arial, Helvetica, Courier New, Georgia, Times New Roman, Verdana, serif, sans-serif, monospace, cursive, fantasy'],
        fontWeight:             ['Bold', 'Font weight - applicable only for Google Fonts in relation with the font'],
        progressBar:            [true, 'Display the progress bar'],
        overlay:                [true, 'Display overlay between items and body background'],
        textOverlap:            [-0.1, 'Amount of overlap between characters (-1 - 1)', {
            inputAttributes: 'min="-1" max="1" step="0.05"'
        }],
        // fontOverlapUnder:       [true, 'Each letter is under the previous - Visible when textOverlap is negative'],
        textOpacityOff:         [0.3, 'Opacity of characters not scrolled yet (0 - 1)', {
            inputAttributes: 'min="0" max="1" step="0.02"'
        }],
        textOpacityOn:          [1, 'Opacity of characters scrolled (0 - 1)', {
            inputAttributes: 'min="0" max="1" step="0.02"'
        }]
    };
    for (var option in allOptions) {
        if (allOptions.hasOwnProperty(option)) {
            var inputType = 'text',
                inputChecked = '',
                inputAttributes = '',
                markup = '';
            // Options
            if (typeof allOptions[option][2] == 'object') {
                if (typeof allOptions[option][2]['inputAttributes'] == 'string') {
                    inputAttributes = allOptions[option][2]['inputAttributes'];
                }
            }
            if (typeof allOptions[option][0] == 'boolean') {
                inputType = 'checkbox';
                if (allOptions[option][0]) {
                    inputChecked = 'checked="checked"';
                }
            } else if (typeof allOptions[option][0] == 'number') {
                inputType = 'number';
            }
            markup += '<div class="form-group" data-option-name="'+option+'">';
            if (typeof allOptions[option][0] == 'object') {
                // var defaultValue = Object.getOwnPropertyNames(allOptions[option][0])[0];
                // var possiblesValues = allOptions[option][0][defaultValue];
                // console.log(defaultValue,possiblesValues);
                markup += '<p>'+allOptions[option][1]+'</p>';
                allOptions[option][0]['values'].forEach(function(value) {
                    var radioChecked = '';
                    if (allOptions[option][0]['default'] == value) {
                        radioChecked = 'checked';
                    }
                    markup += ''+
                    '<label for="global-option-'+option+'-'+value+'">'+value+'</label>'+
                    '<input type="radio" name="global-option-'+option+'" id="global-option-'+option+'-'+value+'" value="'+value+'" '+radioChecked+'>';
                });
            } else {
                markup +=
                '<label for="global-option-'+option+'">'+allOptions[option][1]+'</label>'+
                '<input type="'+inputType+'" id="global-option-'+option+'" value="'+allOptions[option][0]+'" '+inputAttributes+' '+inputChecked+'>';
            }
            jQuery('#global-options').append(markup);
        }
    }
    var itemPattern = function(id) {
        if (id === undefined) {
            id = 0;
        }
        return '<div class="item">'+
            '<button my-tab="content-item-'+id+'">content</button>'+
            '<button my-tab="options-item-'+id+'">options</button>'+
            '<button class="remove-item">-</button>'+
            '<div class="tabs">'+
                '<div class="content active" my-tab-name="content-item-'+id+'">'+
                    '<div class="form-group">'+
                        '<textarea id="item-'+id+'"></textarea>'+
                    '</div>'+
                '</div>'+
                '<div class="options" my-tab-name="options-item-'+id+'">'+
                    '<div class="form-group" data-name="dynamicBackground">'+
                        '<label for="option-dynamicBackground-item-'+id+'">Background image url</label>'+
                        '<input type="url" id="option-dynamicBackground-item-'+id+'">'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';
    };
    jQuery('#generator').html(itemPattern());
    jQuery('#toc-container').remove();
    jQuery('#mainflex').append('<aside id="preview" class="mod-grow"></aside>');
    var encode = function(str) {
        var buf = [];
        for (var i=str.length-1;i>=0;i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    };
    jQuery('#add-item').on('click', function() {
        var amountOfItems = jQuery('#generator .form-group').length;
        amountOfItems++;
        jQuery('#generator').append(
            itemPattern(amountOfItems)
        );
        jQuery('.remove-item').off().on('click', function() {
            jQuery(this).parent().remove();
        });
        myTab.update();
    });
    jQuery('#build').on('click', function() {
        var sentObject = {
            content: [],
            options: {}
        };
        jQuery('#global-options .form-group').each(function() {
            var optionName = jQuery(this).attr('data-option-name');
            var jQ_input = jQuery(this).find('input').eq(0);
            var optionValue = jQ_input.val();
            // Checkbox case
            if (jQ_input.attr('type') == 'checkbox') {
                if (optionValue == 'true') {
                    if (jQ_input.prop('checked')) {

                    } else {
                        sentObject.options[optionName] = false;
                    }
                }
                else if (optionValue == 'false') {
                    if (jQ_input.prop('checked')) {
                        sentObject.options[optionName] = true;
                    } else {

                    }
                }
            }
            // Radio case
            else if (jQ_input.attr('type') == 'radio') {
                // For radio we have several inputs to check
                var radioValue = jQuery(this).find('input:checked').val();
                // If different from default value
                if (allOptions[optionName][0]['default'] != radioValue) {
                    // console.log(optionName+' différent',radioValue);
                    sentObject.options[optionName] = radioValue;
                }

            }
            // Other types
            else if(jQ_input.attr('type') == 'number' || jQ_input.attr('type') == 'text') {
                // If different from default value
                if (optionValue != allOptions[optionName][0].toString()) {
                    if (jQ_input.attr('type') == 'number') {
                        sentObject.options[optionName] = JSON.parse(optionValue);
                    } else {
                        sentObject.options[optionName] = optionValue;
                    }
                }
            }
        });

        jQuery('#generator .item').each(function() {
            var optionsToAdd = [];
            var text = jQuery(this).find('.content textarea').val();
            var options = {};
            jQuery(this).find('.options .form-group').each(function() {
                var optionName = jQuery(this).attr('data-name');
                var optionValue = jQuery(this).find('input, textarea, select').eq(0).val();
                if (optionValue != '' && optionValue !== undefined) {
                    optionsToAdd.push({ name: optionName, value: optionValue});
                }
            });

            var itemContent = {
                text: text,
                options: optionsToAdd
            };
            sentObject.content.push(itemContent);
        });
        console.log('envoyé',sentObject);
        var stringifiedSentObject = JSON.stringify(sentObject);
        var sentObject64 = btoa(stringifiedSentObject);
        var iframeStr = '<iframe src="{{ site.url }}{{ site.baseurl }}/iframe.html?'+sentObject64+'"></iframe>';
        jQuery('#preview').html(iframeStr);
        // console.log('sentObject64', sentObject64);
        // console.log('décodé', JSON.parse(atob(sentObject64)));
    });

</script>
