function SeeMe() {
  this.idx = 0;
  this.images = [];
  this.defaultSize = {width: 500, height: 420};
}

SeeMe.prototype = {
  init: function() {

    this.loadImages();

    var $body = $('body');
    var $overlay = this.overlay()
    var $table = this.table();
    var $cell = this.cell();
    var $outer = this.outer();
    var $inner = this.inner();
    var $close = this.closeButton();

    this.$overlay = $overlay;
    this.$table = $table;

    var url = "https://static2.see.me/images/masks/tshirt-overlay-front.png.pagespeed.ce.MXzdR3OCN7.png";
    var tImage = new Image();
    tImage.src = url;

    $(tImage).css({
      'position' : 'absolute',
      'top' : '0px',
      'left' : '0px',
      'z-index' : '8000'
    });

    $inner.append('<img>').append($(tImage));
    $outer.html($inner);
    $outer.append(this.leftArrow());
    $outer.append(this.rightArrow());
    $cell.append($outer);
    $table.html($cell).append($close);
    $body.append($table).append($overlay);

    this.appendButton();
    this.to(0);
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

  leftArrow: function() {
    var $prev = $('<a href="javascript://">&larr;</a>');
    var styles = {
      'padding' : '10px 20px',
      'color' : '#fff',
      'font-size' : '30px',
      'text-decoration' : 'none',
      'position' : 'absolute',
      'top' : '50%',
      'margin-top' : '-19px',
      'left' : '-120px'
    }
    $prev.css(styles);

    var self = this;
    $prev.bind('click', function() {
      self.prev();
    });
    return $prev;
  },

  rightArrow: function() {
    var $next = $('<a href="javascript://">&rarr;</a>');
    var styles = {
      'padding' : '10px 20px',
      'color' : '#fff',
      'font-size' : '30px',
      'text-decoration' : 'none',
      'position' : 'absolute',
      'top' : '50%',
      'margin-top' : '-19px',
      'right' : '-120px'
    }
    $next.css(styles);
    var self = this;
    $next.bind('click', function() {
      self.next();
    });
    return $next;
  },

  appendButton: function() {
    var $centered = $('<div></div>');
    $centered.css({ 'width' : '100%', 'text-align' : 'center' });
    var $btn = $('<br><a href="javascript://"><img src="http://mikekavouras.com/pink.png"></a>');
    $btn.css('display', 'inline-block');

    $centered.append($btn);
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
    var $newImg = this.images[idx];
    $img.replaceWith($newImg);
    this.repositionImage($newImg);
  },

  repositionImage: function(image) {
    var ratio = image.width / image.height;
    var diff;
    var width;
    var height;
    if (image.height > image.width) {
      diff = this.defaultSize.width / image.width;
      width = this.defaultSize.width;
      height = image.height * diff;
    } else {
      diff = this.defaultSize.height / image.height;
      height = this.defaultSize.height;
      width = image.width * diff;
    }

    $(image).css({
      'position' : 'absolute',
      'left' : (this.defaultSize.width / 2) - (width / 2),
      'top' : (this.defaultSize.height / 2) - (height / 2),
      'max-width' : '10000px',
      'width' : width,
      'height' : height
    });
  },

  overlay: function() {
    var $div = $('<div></div>');
    $div.css({
      'width' : '100%',
      'height' : '100%',
      'background-color' : 'rgba(0, 0, 0, 0.8)',
      'position' : 'fixed',
      'top' : '0px',
      'left' : '0px',
      'zIndex' : '8999'
    });
    return $div;
  },

  table: function() {
    var $div = $('<div"></div>');
    $div.css({
      'width' : '100%',
      'height' : '100%',
      'position' : 'fixed',
      'top' : '0px',
      'left' : '0px',
      'zIndex' : '9000',
      'display' : 'table'
    });
    return $div;
  },

  cell: function() {
    var $div = $('<div id="seeme-cell"></div>');
    $div.css({
      'width' : '100%',
      'height' : '100%',
      'verticalAlign' : 'middle',
      'display' : 'table-cell'
    });
    return $div;
  },

  inner: function() {
    var $div = $('<div></div>');
    $div.css({
      'width' : '100%',
      'height' : '100%',
      'position' : 'relative',
      'overflow' : 'hidden'
    });
    return $div;
  },

  outer: function() {
    var $div = $('<div></div>');
    $div.css({
      'margin' : '0px auto',
      'width' : this.defaultSize.width,
      'height' : this.defaultSize.height,
      'position' : 'relative'
    });
    return $div;
  },

  closeButton: function() {
    var $div = $('<div></div>');
    $div.css({
      'width' : '70px',
      'height' : '70px',
      'position' : 'absolute',
      'top' : '0px',
      'right' : '0px',
      'background-image' : "url('https://www.see.me/images/v4/icn-big-x.png.pagespeed.ce.44KZJi43Kw.png')",
      'background-repeat' : 'no-repeat',
      'background-size' : '100%',
      'background-position' : 'center center',
      'cursor' : 'pointer'
    });
    var self = this;
    $div.bind('click', function() {
      self.close();
    });
    return $div;
  },

  close: function() {
    this.$overlay.remove();
    this.$table.remove();
  },

  loadImages: function() {
    var srcs = $('img').get().map(function(image) {
      return image.getAttribute('src');
    });

    for (var i = 0; i < srcs.length; i++) {
      var img = new Image();
      img.src = srcs[i];
      this.images.push(img);
    }
  }
};

(function() {
  if ($('#seeme-cell').length) {
    return;
  }
  var s = new SeeMe();
  var cb = function() {s.init(); };
  s.loadjQuery(cb);
})();

