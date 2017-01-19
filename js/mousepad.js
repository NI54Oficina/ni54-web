// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs
// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }
//
// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);


// remap jQuery to $
(function($){

	var viewportHeight = $(window).height();

	/* trigger when page is ready */
	$(document).ready(function (){
		$('header#main').removeClass('nav-up').addClass('nav-down').css({"opacity":"1"});


		// Hide Header on on scroll down
		var didScroll;
		var lastScrollTop = 0;
		var delta = 3;
		var navbarHeight = $('header#main').outerHeight() / 100;

		$(window).scroll(function(event){
		    didScroll = true;
		});

		setInterval(function() {
		    if (didScroll) {
		        hasScrolled();
		        didScroll = false;
		    }
		}, 250);

		function hasScrolled() {
		    var st = $(this).scrollTop();

		    // Make sure they scroll more than delta
		    if(Math.abs(lastScrollTop - st) <= delta)
		        return;

		    // If they scrolled down and are past the navbar, add class .nav-up.
		    // This is necessary so you never see what is "behind" the navbar.
		    if (st > lastScrollTop && st > navbarHeight){
		        // Scroll Down
		        $('header#main').removeClass('nav-down').addClass('nav-up');
		    } else {
		        // Scroll Up
		        if(st + $(window).height() < $(document).height()) {
		            $('header#main').removeClass('nav-up').addClass('nav-down');
		        }
		    }

		    lastScrollTop = st;
		}


		// Sequence animations
		$(function() {
		$('.sequence').each(function(i) {
		$(this).delay((i++) * 200).fadeTo(300, 1); })
		});

		/*$('.thumb-0').click(function(){
			$('.full-proj-link-0').slideDown();
		});*/

		// drop down view full post link

		$('.project-thumb').mousedown(function(){
					$(this).children('.full-proj-link').slideDown();
					$(this).children('.full-proj-link').fadeTo( "fast", 1 );
		})

		// back to top button

		jQuery('.backtotop').click(function(){ jQuery('html, body').animate({scrollTop:0}, 'slow'); });

		// transition classes

		/*$( ".current-menu-item" ).prevAll().addClass('prev-item');
		$( ".current-menu-item" ).prevAll().removeClass('next-item');

		$( ".current-menu-item" ).nextAll().addClass('next-item');
		$( ".current-menu-item" ).nextAll().removeClass('prev-item');

		$(".prev-item").click(function(){
			$("#ajax").addClass("left");
			$("#ajax").removeClass("right");
		});

		$(".next-item").click(function(){
			$("#ajax").addClass("right");
			$("#ajax").removeClass("left");
		});*/



		// Thumbnail animations
		$(".thumb-link").hover(
			function() {
			    $(this).siblings().addClass("thumb-hover");
			  }, function() {
			    $(this).siblings().removeClass("thumb-hover");

		});

		// initialise thumb carousel
		$(".thumb-item-desktop").thumbCarousel();

		// Remove browser chrome in Mobile Safari (iPhone)
		(function($) {
		  $(document).ready(function() {
		    setTimeout(function () {
		      window.scrollTo(0, 0);
		    }, 100);
		  });
		})(jQuery);

			//Initialise Masonry

			/*var container = document.querySelector('.blog-posts');
			var msnry = new Masonry( container, {
			  // options
			  //columnWidth: 200,
			  itemSelector: '.tile'
			});*/

			$('.blog-posts').delay(2000).masonry({
			  // options
			  itemSelector: '.tile',
			  //columnWidth: 200
			});

		// prev / next buttons

		$( window ).on( "mousemove", function( event ) {

			var mousePosX = event.clientX;
			var mousePosY = event.clientY;
			var right = $(window).width() - mousePosX;
			var bottom = $(window).height() - mousePosY;


		//	$(".prev-label").css( "pageX: " + event.pageX + ", pageY: " + event.pageY );
			$( ".prev-label" ).css( "bottom", + bottom + "px" );
			$( ".prev-label" ).css( "left", + event.clientX );
		});

		$( ".prev-post" ).mouseenter(function() {
		  $( ".prev-label" ).fadeIn( 200 );

		});
		$( ".prev-post" ).mouseleave(function() {
		  $( ".prev-label" ).fadeOut( 200 );

		});





		$( window ).on( "mousemove", function( event ) {

			var mousePosX = event.clientX;
			var mousePosY = event.clientY;
			var right = $(window).width() - mousePosX;
			var bottom = $(window).height() - mousePosY;

		//	$(".prev-label").css( "pageX: " + event.pageX + ", pageY: " + event.pageY );
			$( ".next-label" ).css( "bottom", + bottom + "px" );
			$( ".next-label" ).css( "right", + right + "px" );
		});

		$( ".next-post" ).mouseenter(function() {
		  $( ".next-label" ).fadeIn( 200 );


		});
		$( ".next-post" ).mouseleave(function() {
		  $( ".next-label" ).fadeOut( 200 );

		});

		/*$(".next-post, .prev-post").mouseenter(function(){
			$(".project-footer").fadeTo( "medium", 0 );
		})

		$(".next-post, .prev-post").mouseleave(function(){
			$(".project-footer").fadeTo( "medium", 1 );
		})*/

		var height = $( window ).height();

		$('.site').css( "min-height", height );


		// Thumbnail sliders

        $(".thumbSlider").royalSlider({
            // options go here
            // as an example, enable keyboard arrows nav
            keyboardNavEnabled: true,
			controlNavigation: 'bullets',
			sliderDrag: true,
			autoScaleSlider: true,
		    autoScaleSliderWidth: 800,
		    autoScaleSliderHeight: 500,
        });

        $(".logoSlider").royalSlider({
            // options go here
            // as an example, enable keyboard arrows nav
            keyboardNavEnabled: false,
			sliderDrag: false,
			autoScaleSlider: true,
		    autoScaleSliderWidth: 800,
		    autoScaleSliderHeight: 500,
			loop:true,
			transitionType:'fade',
			navigateByClick:false,
			autoPlay: {
			    		// autoplay options go gere
			    		enabled: true,
			    		pauseOnHover: false,
						delay:2000
			    	},
        });

		//Royal Slider Content Slider

		jQuery(document).ready(function($) {
		  $('#full-width-slider').royalSlider({
		    arrowsNav: true,
		    loop: true,
		    keyboardNavEnabled: true,
		    controlsInside: false,
		    imageScaleMode: 'fill',
		    arrowsNavAutoHide: false,
		    autoScaleSlider: true,
		    autoScaleSliderWidth: 1600,
		    autoScaleSliderHeight: 1120,
		    //controlNavigation: 'bullets',
		    thumbsFitInViewport: false,
		    navigateByClick: true,
		    startSlideId: 0,
		    autoPlay: {
			    		// autoplay options go gere
			    		enabled: true,
			    		pauseOnHover: false,
						delay:3500
			    	},
		    transitionType:'fade',
		    globalCaption: false,
		    deeplinking: {
		      enabled: true,
		      change: false
		    },
			allowCSS3:true,
			addActiveClass:true,
		    /* size of all images http://help.dimsemenov.com/kb/royalslider-jquery-plugin-faq/adding-width-and-height-properties-to-images */
		    imgWidth: 1600,
		    imgHeight: 1000
		  });
		});


		// Royal SLider project slider

		// Important note! If you're adding CSS3 transition to slides, fadeInLoadedSlide should be disabled to avoid fade-conflicts.
		jQuery(document).ready(function($) {
		  var si = $('#staff-gallery-1').royalSlider({
		    addActiveClass: true,
		    arrowsNav: false,
		    controlNavigation: 'none',
		    autoScaleSlider: true,
		    autoScaleSliderWidth: 1600,
		    autoScaleSliderHeight: 1100,
		    loop: false,
		    fadeinLoadedSlide: true,
		    globalCaption: true,
		    keyboardNavEnabled: true,
		    globalCaptionInside: false,

		    visibleNearby: {
		      enabled: true,
		      centerArea: 0.5,
		      center: true,
		      breakpoint: 880,
		      breakpointCenterArea: 0.82,
		      navigateByCenterClick: true
		    }
		  }).data('royalSlider');

		  // link to fifth slide from slider description.
		  $('.slide4link').click(function(e) {
		    si.goTo(4);
		    return false;
		  });
		});

		//overlay button

		$(".overlink").click(function(){
			$("#overlay").fadeIn(300)
		})

		$(".overlink-hide").click(function(){
			$("#overlay").fadeOut(300)
		})

			//hide control guide on keypress
			$("body").keydown(function(key){
			    if (key.which == 27){
			        $("#overlay").fadeOut(300)
			    }
			});

			$(".wpcf7-submit").click(function(){
				$('#overlay').animate({
		          scrollTop: 0
		        }, 1000);
			});

		//hide control guide on keypress
		$("body").keydown(function(key){
		    if (key.which == 39){
		        $(".hide-keypress").css({"opacity":"0"});
		    }
		});

		// read more button
		$('.more').click(function(){

		    if ($('.long-desc').css("display") == "none") {
		        $('.long-desc').slideDown();
				$( '.more' ).html( '<span class="icon large" style="float:left" >5</span><p style="padding-top:0.4em;">&nbsp;&nbsp;Read Less</p>');
		    } else {
		        $('.long-desc').slideUp();
				$( '.more' ).html( '<span class="icon large" style="float:left" >4</span><p style="padding-top:0.4em;">&nbsp;&nbsp;Read More</p>');
		    }
		})


		// hide / show mobile menu

		$( ".c-hamburger" ).click(function() {
		  $( ".mobile-menu" ).toggleClass( "hidden-menu" );
		  $( ".c-hamburger" ).toggleClass( "is-active" );
		});


		$( ".mobile-menu div div div ul li" ).click(function() {
			$( ".mobile-menu" ).toggleClass( "hidden-menu" );
			$( ".c-hamburger" ).toggleClass( "is-active" );
		});


		var doc = $('#ajax').height();
		var win = $(window).height();

		if ( win > doc ) {
		    $("footer").css({"padding-top": "0px", "margin-bottom": "0px", "opacity" : "1"});
		}





		/*$( document ).ready(function() {

			var width = $( window ).width();
			var padding = width * 0.016666666667;

		//	alert(padding);

		 $(".embed-container").parent().css( "padding-left", padding );
		$(".embed-container").parent().css( "padding-right", padding );
		});

		$(window).resize(function() {

			$(".embed-container").parent().css( "padding-left", padding );
			$(".embed-container").parent().css( "padding-right", padding );

		});*/



		$(document).ready(function() {
		    // This will fire when document is ready:
		    $(window).resize(function() {
		        // This will fire each time the window is resized:
		        if($(window).width() >= 1184) {
		            // if larger or equal
		            $(".gallery-embed").parent().css( "padding", "0 18px" );
		        }

				if($(window).width() >= 800) {
		            // if larger or equal
		            $(".gallery-embed").parent().css( "padding", "0 17px" );
		        }

				if($(window).width() >= 600) {
		            // if larger or equal
		            $(".gallery-embed").parent().css( "padding", "0 14px" );
		        }

				else {
		            // if smaller
		            $(".gallery-embed").parent().css( "padding", "0 11px" );
		        }
		    }).resize(); // This will simulate a resize to trigger the initial run.
		});




});





	/* optional triggers

	$(window).load(function() {

	});*/

	$(window).resize(function() {

		var height = $( window ).height();

		$('.site').css( "min-height", height );

	});




	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	       $("footer").css({"padding-top": "0px", "margin-bottom": "0px", "opacity" : "1"});
	   }

	   if($(window).scrollTop() == $(".project-text").height()) {
		   $(".prev-post").fadeIn();
	   }

	  	if(!$('.mobile-menu').hasClass('hidden-menu')){
		    $( ".mobile-menu" ).toggleClass( "hidden-menu" );
			$( ".c-hamburger" ).toggleClass( "is-active" );
	   }



	});


	$(window).scroll(function() {
		//scrolling();

		pos = window.scrollY * 0.35 + 100;

		$("#stamp").css({ bottom: '' + pos + 'px'});

	});







})(window.jQuery);


// Animate menu

/*(function() {

  "use strict";

  var toggles = document.querySelectorAll(".c-hamburger");

  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }

})();*/
