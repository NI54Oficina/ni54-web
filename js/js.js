$(window).on("load",function () {
	console.log('LISTO');
	//$('#container-arriba').css

});


$(document).on("ready",function(){
	slider();
});




function slider(){
	console.log("entra slider");

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



console.log("sale slider");
}
