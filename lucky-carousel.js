$.fn.luckyCarousel = function(options) {
    var car = this;
    var settings = $.extend( {
      'delay'         : 8000,
      'transition' : 400
    }, options);
    
    car.append($('<div>').addClass('nav'));
    var nav = $('.nav', car);
    var cnt = $("ul", car);
    var car_w = car.width();
    var carItems = $('li', car);
    $(cnt).width((carItems.length * car_w) + car_w);
    $(carItems).each(function(i) {
        var dot_active = (!i) ? ' active' : '';
        $(nav).prepend($('<div>').addClass('dot dot' + i + dot_active).bind('click', function(e) {
            slideSel(i);
        }));
    });
    $(carItems).css('visibility', 'visible');
    $(cnt).append($(carItems).first().clone());
    car.append(nav);
    var sel_i = 0;
    var spin = setInterval(function() {
        slideSel('auto')
    }, settings.delay);
    function slideSel(i) {
        if (i == 'auto') {
            sel_i++;
            i = sel_i;
        } else {
            clearInterval(spin)
        }
        var position = $(cnt).position();
        var t = car_w * -i;
        var last = false;
        var d = t - position.left;
        if (Math.abs(t) == cnt.width() - car_w) {
            sel_i = i = 0;
        }
        $(cnt).animate({
            left: '+=' + d
        }, settings.transition, function() {
            $('.dot', car).removeClass('active');
            $('.dot' + i, car).addClass('active');
            if (!sel_i) {
                $(cnt).css('left', '0');
            }
        });
        sel_i = i;
    }
}