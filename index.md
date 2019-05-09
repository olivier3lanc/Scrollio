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
    var allOptions = {
        scrollRange:            [2000, 'Amount of pixels scrolled per item'],
        keepActive:             [false, 'Once scrolled, letters keep active CSS class'],
        textEllipsis:           ['...', 'String displayed at the end of each text to scroll'],
        fontFamily:             ['Ubuntu', 'Google Font name or web safe font name: Arial, Helvetica, Courier New, Georgia, Times New Roman, Verdana, serif, sans-serif, monospace, cursive, fantasy'],
        fontWeight:             ['Bold', 'Font weight (applicable only for Google Fonts)'],
        fontOverlapUnder:       [true, 'Each letter is under the previous'],
        progressBar:            [true, 'Display the progress bar'],
        overlay:                [true, 'Display overlay between items and body background']
    };
    for (var option in allOptions) {
        if (allOptions.hasOwnProperty(option)) {
            var inputType = 'text';
            var inputChecked = '';
            if (typeof allOptions[option][0] == 'boolean') {
                inputType = 'checkbox';
                if (allOptions[option][0]) {
                    inputChecked = 'checked="checked"';
                }
            } else if (typeof allOptions[option][0] == 'number') {
                inputType = 'number';
            }
            jQuery('#global-options').append(
                '<div class="form-group" data-option-name="'+option+'">'+
                    '<label for="global-option-'+option+'">'+allOptions[option][1]+'</label>'+
                    '<input type="'+inputType+'" id="global-option-'+option+'" value="'+allOptions[option][0]+'" '+inputChecked+'>'+
                '</div>'
            );
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
            if (jQ_input.attr('type') == 'checkbox') {
                if (jQ_input.prop('checked') != allOptions[optionName][0]) {
                    // console.log(optionName);
                    sentObject.options[optionName] = JSON.parse(optionValue);
                }
            } else if(jQ_input.attr('type') == 'number' || jQ_input.attr('type') == 'text') {
                if (optionValue != allOptions[optionName][0].toString()) {
                    sentObject.options[optionName] = optionValue;
                }
            }
        });
        console.log(sentObject.options);
        var optionsToAdd = [];
        jQuery('#generator .item').each(function() {
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
        var stringifiedSentObject = JSON.stringify(sentObject);
        var sentObject64 = btoa(stringifiedSentObject);
        var iframeStr = '<iframe src="{{ site.url }}{{ site.baseurl }}/iframe.html?'+sentObject64+'"></iframe>';
        jQuery('#preview').html(iframeStr);
        // console.log('sentObject64', sentObject64);
        // console.log('décodé', JSON.parse(atob(sentObject64)));
    });

</script>
