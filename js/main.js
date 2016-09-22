/*
form-inputs helpers
*/
( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}
// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
                if (!String.prototype.trim) {
                    (function() {
                        // Make sure we trim BOM and NBSP
                        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                        String.prototype.trim = function() {
                            return this.replace(rtrim, '');
                        };
                    })();
                }

                [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
                    // in case the input is already filled..
                    if( inputEl.value.trim() !== '' ) {
                        classie.add( inputEl.parentNode, 'input--filled' );
                    }

                    // events:
                    inputEl.addEventListener( 'focus', onInputFocus );
                    inputEl.addEventListener( 'blur', onInputBlur );
                } );

                function onInputFocus( ev ) {
                    classie.add( ev.target.parentNode, 'input--filled' );
                }

                function onInputBlur( ev ) {
                    if( ev.target.value.trim() === '' ) {
                        classie.remove( ev.target.parentNode, 'input--filled' );
                    }
                }
})( window );
//myPlugins
  ;(function($){
    $.fn.qTabs = function(){
        var global = this;
        global.find('.tabs-content__item').hide();
        global.find('.tabs-content__item.active').show();
        $(this).find('.tabs-nav li').click(function(){
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            var data = $(this).find('a').attr('href');
            $(global).find('.tabs-content__item').hide().removeClass('active');
            $(global).find('.tabs-content__item' + data + '').fadeIn(300).addClass('active');
            return false;
        })
    }

    $.fn.qToggle = function(){
        var global = this;
        $(this).click(function(e){
            e.preventDefault();
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
        })
    }
  }(jQuery));

  $(document).ready(function(){
    if (!Modernizr.svg) {
      $(".main-header__logo img").attr("src", "img/logo.png");
      console.log('obj');
    }

    $('.responsive-menu').click(function(){
        $('#mainMenu').slideToggle();
    })

    $('#jsMainSlider').owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 10000,
        dotsContainer: '#carousel-custom-dots',
    });


    //tooltip
    $('.tooltip').each(function(){
        $(this).css({
            'margin-top': '-'+($(this).outerHeight() / 2)+'px'
        })
    })

    $('.tooltip-wrap').hover(function(){
        $(this).find('.tooltip').stop(true,true).fadeIn(300);
    }, function(){
        $(this).find('.tooltip').stop(true,true).fadeOut(300);
    })

    $("#sliderWidget").owlCarousel({
      loop: true,
      autoplay: true,
      items: 1,
      dots: true,
      autoplayHoverPause: true,
      // transitionStyle: "fade"
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      dotsContainer: '#carousel-custom-dots',
      autoHeight: true
    });


      ymaps.ready(function () {
        var myMap = new ymaps.Map('map', {
                center: [55.71141706904151,37.688296499999964],
                zoom: 16
            }, {
            }),
            myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/yamaps-placemark.png',
                // Размеры метки.
                iconImageSize: [35, 54],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-17, -54]
            });

        myMap.geoObjects.add(myPlacemark);
    });

    $('#partnersSlider .partners-slider__point').on('click', function(){
        var indicator = $('#partnersSlider .partners-slider__indicator');
        $(this).siblings().removeClass('active');
        var num = $(this).index();
        switch(num){
            case 3: $('#partnersSlider .partners-slider__point').eq(3).addClass('active'); $(indicator).width('100%'); console.log('4');
            case 2: $('#partnersSlider .partners-slider__point').eq(2).addClass('active'); $(indicator).width('75%'); console.log('3');
            case 1: $('#partnersSlider .partners-slider__point').eq(1).addClass('active'); $(indicator).width('50%'); console.log('2');
            case 0: $('#partnersSlider .partners-slider__point').eq(0).addClass('active'); $(indicator).width('25%'); console.log('1');
        }
        switch(num){
            case 3: $(indicator).width('100%'); $('#discountValue').text('40%'); break;
            case 2: $(indicator).width('75%'); $('#discountValue').text('30%'); break;
            case 1: $(indicator).width('50%'); $('#discountValue').text('20%'); break;
            case 0: $(indicator).width('25%'); $('#discountValue').text('10%'); break;
        }
        
    })

    //sliders tarrifs
    $('.slider-trafic .slider').slider({
        range: "min",
        min: 10, 
        max: 1000,
        slide: function( event, ui ) {
        $($(this).find('.slider-value')).text(ui.value);
        $($(this).closest('.tarifs-calc__slider')).find('input').val(ui.value);
      }
    });

    $('.slider-seans .slider').slider({
        range: "min",
        min: 10, 
        max: 1000,
        slide: function( event, ui ) {
        $($(this).find('.slider-value')).text(ui.value + 'мин');
        $($(this).closest('.tarifs-calc__slider')).find('input').val(ui.value + ' мин');
      }
    });

    $('.slider-numbers .slider').slider({
        range: "min",
        min: 10, 
        max: 1000,
        slide: function( event, ui ) {
        $($(this).find('.slider-value')).text(ui.value);
        $($(this).closest('.tarifs-calc__slider')).find('input').val(ui.value);
      }
    });
    $('.slider-static .slider').slider({
        range: "min",
        min: 10, 
        max: 1000,
        slide: function( event, ui ) {
        $($(this).find('.slider-value')).text(ui.value);
        $($(this).closest('.tarifs-calc__slider')).find('input').val(ui.value);
      }
    });

    $('.ui-slider-handle').append('<div class="slider-value">0</div>')
	
	
	//fancybox init
	$('.fancybox').fancybox({
		padding: 0,
		openEffect: 'slideInDown'
	});

    //inputmask
    $('.phone-mask').inputmask('+7(999) 999-99-99');
    $('.time-mask').inputmask('99:99');

  })//ready

  $(window).load(function(){
    $('#carousel-custom-dots.slider-widget__dots').css({
        'margin-top': '-'+($('#carousel-custom-dots.slider-widget__dots').height() / 2)+'px'
    })
  })

