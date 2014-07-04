function SeeMe() {
  this.idx = 0;
  this.images = [];
  this.defaultSize = {width: 500, height: 420};
}

SeeMe.prototype = {
  init: function() {

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

    var $cell = $('<div id="seeme-cell"></div>');
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
      'width' : this.defaultSize.width,
      'height' : this.defaultSize.height,
      'position' : 'relative',
      'overflow' : 'hidden'
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

    this.images = $('img')
    var $image = this.images.first().clone();

    this.repositionImage($image);

    $div.append($image);
    $div.append($(tImage));
    $cell.append($div);

    $('body').append($overlay);
    $('body').append($table);

    this.appendArrows();
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
  },

  appendArrows: function() {
    var $centered = $('<div></div>');
    $centered.css({ 'width' : '100%', 'text-align' : 'center' });
    var $prev = $('<a href="javascript://">&larr;</a>');
    var $next = $('<a href="javascript://">&rarr;</a>');

    var styles = {
      'display' : 'inline-block',
      'padding' : '10px 20px',
      'color' : '#fff',
      'font-size' : '30px',
      'margin' : '0px 30px',
      'text-decoration' : 'none'
    }

    $prev.css(styles);
    $next.css(styles);

    var self = this;
    $prev.bind('click', function() {
      self.prev();
    });
    $next.bind('click', function() {
      self.next();
    });

    $centered.append($prev).append($next);
    $('#seeme-cell').append($centered);
  },

  prev: function() {
    this.idx--;
    if (this.idx < 0) {
      this.idx = this.images.length - 1;
    }
    this.to(this.idx);
  },

  next: function() {
    this.idx++;
    if (this.idx > this.images.length - 1) {
      this.idx = 0;
    }
    this.to(this.idx);
  },

  to: function(idx) {
    var $img = $('#seeme-cell').find('img').first();
    $img.attr('src', $(this.images[this.idx]).attr('src'));
    this.repositionImage($img);
  },

  repositionImage: function($image) {
    var image = $image[0];
    var ratio = width / height;

    var diff;
    if (image.height > image.width) {
      diff = this.defaultSize.width / width;
      width = image.widthwidth * diff;
      height = image.height * diff;
    } else {
      diff = this.defaultSize.height / height;
      height = image.height * diff;
      width = image.width * diff;
    }

    $image.css({
      'position' : 'absolute',
      'left' : (this.defaultSize.width / 2) - (width / 2),
      'top' : (this.defaultSize.height / 2) - (height / 2),
      'max-width' : '10000px',
      'width' : width,
      'height' : height
    });
  }
};

(function() {
  var s = new SeeMe();
  var cb = function() {s.init(); };
  s.loadjQuery(cb);
})();

