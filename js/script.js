$(window).on("load",function () {



});

$(window).resize(function(){
		centerCircleLema();
});

$(document).on("ready",function(){

window.scrollTo(30,document.body.scrollHeight);

	tipear();
	slider();
	SameHeight();
	centerCircleLema();
	scrollToSector();
	FitBg();

});



$(window).scroll(function(){
    checkAnimationOne();


});



function SameHeight(){
  //console.log("entra same height");

  var auxId=1;
  while($( "[hid="+auxId+"]" ).length||auxId<20){
    var hidHeight=0;
    //ResetHeight();
    $("[hid="+auxId+"]").each(function(){
      if($(this).innerHeight()>hidHeight){
        hidHeight= $(this).innerHeight();
      }

    });
    //console.log(hidHeight);
    $("[hid="+auxId+"]").css("height",hidHeight+"px");
    auxId++;
  }
}


//****************************************************************************************************************************************************************

function ResetHeight(){
  var id=1;
  while($( "[hid="+id+"]" ).length||id<20){

    $("[hid="+id+"]").css("height","auto");
    id++;
  }
}

function slider(){
	// console.log("entra slider");

var currentIndex = 0,
  items = $('.general-container');
  itemAmt = items.length;
	items.css("display","none");
	items.eq(currentIndex).css("display", "block");
	// multiplicateDotNav(itemAmt);


	$(".nav-dots").each(function(){
		$(this).find(".nav-dot").css("background-color", "#c6c6c6");
		$(this).find(".nav-dot").eq(currentIndex).css("background-color", "#ee7262");
	});

function cycleItems() {

  var item = $('.general-container').eq(currentIndex);
  items.hide();
  item.fadeIn("slow");
}


$('.next-ganado').click(function() {

	currentIndex += 1;
	$(".nav-dots").each(function(){
		$(this).find(".nav-dot").css("background-color", "#c6c6c6");
		$(this).find(".nav-dot").eq(currentIndex).css("background-color", "#ee7262");
	});

  if (currentIndex > itemAmt - 1) {

    currentIndex = 0;
		$(".nav-dots").each(function(){
			$(this).find(".nav-dot").css("background-color", "#c6c6c6");
			$(this).find(".nav-dot").eq(currentIndex).css("background-color", "#ee7262");
		});
  }
  cycleItems();
});

$('.preview-ganado').click(function() {

  currentIndex -= 1;
	$(".nav-dots").each(function(){
		$(this).find(".nav-dot").css("background-color", "#c6c6c6");
		$(this).find(".nav-dot").eq(currentIndex).css("background-color", "#ee7262");
	});

  if (currentIndex < 0) {

    currentIndex = itemAmt - 1;
  }
  cycleItems();
});

$('.nav-dot').click(function() {

	//console.log("entro dot Slider");
	var dotIndex = $(this).index();
	$(".general-container").hide();
	$('.general-container').eq(dotIndex).fadeIn("slow");

	currentIndex = dotIndex;
	$(".nav-dots").each(function(){
		$(this).find(".nav-dot").css("background-color", "#c6c6c6");
		$(this).find(".nav-dot").eq(currentIndex).css("background-color", "#ee7262");
	});
});


}


function centerCircleLema(){
	var circle=parseInt($('.circle-lema').width());
	var doc= parseInt($(document).width());

	var pos = doc/2 - circle/2-60;

	$('.circle-lema').css('margin-left', pos+'px');

}

function scrollToSector(){
	$(".desplazamiento").click(function() {

		var toGo=$(this).attr('name');

		var aTag = $(toGo);

		$('html,body').animate({scrollTop: aTag.offset().top},'slow');

	});
}

function tipear(){
 $(function(){
     $("#dinamic-content").typed({
       strings: ["NitroInteractivo"],
       typeSpeed: 100
     });
 });
}

function FitBg(){
	
 	var dd=$(document).height();	console.log($(document).height());
		console.log($(window).height());

		$('#canvasFugaz').css('height',dd+'px');
}


function isElementInViewport(elem) {
    var $elem = $(elem);

		console.log($elem);

    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}


function checkAnimationOne() {


    var $elem = $('#fraseFlotante');

    if ($elem.hasClass('animate-frase-flotante')) return;

    if (isElementInViewport($elem)) {

        $elem.addClass('animate-frase-flotante');
    }
}
