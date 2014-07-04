var SeeMe = {
  init: function() {
    var imageSize = {width: 500, height: 420};

    var $overlay = $('<div></div>');
    $overlay.css({
      'width' : '100%',
      'height' : '100%',
      'background-color' : 'rgba(0, 0, 0, 0.8)',
      'position' : 'fixed',
      'top' : '0px',
      'left' : '0px',
      'zIndex' : '8999'
    });

    var $table = $('<div"></div>');
    $table.css({
      'width' : '100%',
      'height' : '100%',
      'position' : 'fixed',
      'top' : '0px',
      'left' : '0px',
      'zIndex' : '9000',
      'display' : 'table'
    });

    var $cell = $('<div></div>');
    $cell.css({
      'width' : '100%',
      'height' : '100%',
      'verticalAlign' : 'middle',
      'display' : 'table-cell'
    });

    $table.html($cell);

    var $div = $('<div></div>');
    $div.css({
      'margin' : '0px auto',
      'width' : imageSize.width,
      'height' : imageSize.height,
      'position' : 'relative'
    });

    var url = "https://static2.see.me/images/masks/tshirt-overlay-front.png.pagespeed.ce.MXzdR3OCN7.png";
    var tImage = new Image();
    tImage.src = url;

    $(tImage).css({
      'position' : 'absolute',
      'top' : '0px',
      'left' : '0px',
      'z-index' : '8000'
    });

    var $images = $('img')
    var $image = $images.first().clone();

    var image = $image[0];
    $image.css({
      'position' : 'absolute',
      'left' : (imageSize.width / 2) - (image.width / 2),
      'top' : (imageSize.height / 2) - image.height / 2)
    });

    $div.append($image);
    $div.append($(tImage));
    $cell.append($div);

    $('body').append($overlay);
    $('body').append($table);
  },

  loadjQuery: function(cb) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('charset', 'utf-8');
    s.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');
    s.onload = function() {
      if (cb) cb();
    }
    document.getElementsByTagName('body')[0].appendChild(s);
  }
};

(function() {
  SeeMe.loadjQuery(SeeMe.init);
})();

