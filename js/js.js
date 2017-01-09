$(window).on("load",function () {



});

$(window).resize(function(){
		centerCircleLema();
});

$(document).on("ready",function(){

window.scrollTo(0,document.body.scrollHeight);

	slider();
	SameHeight();
	centerCircleLema();

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
	var doc= parseInt($(window).width());

	var pos = doc/2 - circle/2-30;

	$('.circle-lema').css('margin-left', pos+'px');

}
