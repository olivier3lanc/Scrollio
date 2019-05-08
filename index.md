---
layout: page
title: test
---
<button id="add-item">+</button>
<button id="build">build</button>
<div id="generator">
    <div class="form-group">
        <label for="item">item</label>
        <textarea id="item"></textarea>
    </div>
</div>
<div id="preview"></div>
<script>
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
            '<div class="form-group">'+
                '<label for="item-'+amountOfItems+'">item '+amountOfItems+'</label>'+
                '<textarea id="item-'+amountOfItems+'"></textarea>'+
                '<button class="remove-item">-</button>'+
            '</div>'
        );
        jQuery('.remove-item').off().on('click', function() {
            jQuery(this).parent().remove();
        });
    });
    jQuery('#build').on('click', function() {
        var sentObject = {
            content: [],
            options: {}
        }
        jQuery('#generator textarea').each(function() {
            var itemContent = jQuery(this).val();
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
