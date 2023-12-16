console.log("applicatie start")

/*===================================
//Document Ready Fucntion
======================================*/
jQuery(document).ready(function(){
    //Dropdown Menu Open On hover
    new WOW().init();
    

});


/*===================================
//loader
======================================*/
jQuery(window).on("load", function () {
    "use strict";
    $("#loader").fadeOut(70);
    $('.navbar-light .dmenu').hover(function () {
        $(this).find('.sm-menu').first().stop(true, true).delay(200).fadeIn(500);
    }, function () {
        $(this).find('.sm-menu').first().stop(true, true).delay(200).fadeOut(500);
    });
    document.getElementById('openMenu').addEventListener('click', function() {
        var menu = document.getElementById('menuItems');
        if (menu.classList.contains('menu-hidden')) {
            menu.classList.remove('menu-hidden');
            menu.classList.add('menu-visible');
            document.getElementById('openMenu').style.visibility = 'hidden'
        } else {
            menu.classList.remove('menu-visible');
            menu.classList.add('menu-hidden');
            document.getElementById('openMenu').style.visibility = 'visible'
        }
    });

    document.getElementById('menuItems').addEventListener('click', function() {
        var menu = document.getElementById('menuItems');
        if (menu.classList.contains('menu-hidden')) {
            menu.classList.remove('menu-hidden');
            menu.classList.add('menu-visible');
            document.getElementById('openMenu').style.visibility = 'hidden'
        } else {
            menu.classList.remove('menu-visible');
            menu.classList.add('menu-hidden');
            document.getElementById('openMenu').style.visibility = 'visible'
        }
    });

    document.getElementById('winkelkar').addEventListener('click', function() {
        var menu = document.getElementById('winkelkar-content');
        if (menu.style.visibility == "block") {
            menu.style.display = 'none'
        } else {
            menu.style.display = 'block'
        }
    });
    document.getElementById('winkelkar-content').addEventListener('click', function() {
        var menu = document.getElementById('winkelkar-content');
        if (menu.style.visibility == "block") {
            menu.style.display = 'none'
        } else {
            menu.style.display = 'block'
        }
    });
   
    
});





 /* ===================================
          Titel animatie
======================================*/

/*document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        document.getElementById('title').classList.add('hidden');
        document.getElementById('ball').classList.remove('hidden');
    }, 5000); // 5000 milliseconden = 5 seconden
});*/

document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth >= 768)
    {
        setTimeout(function() {
            document.getElementById('title').classList.add('hidden');
            document.getElementById('ball').classList.remove('hidden');
            document.getElementById('goal').classList.remove('hidden');
            // Na de animatietijd van de bal, toon vuurwerk en breng titel terug
            setTimeout(function() {
                document.getElementById('ball').classList.add('hidden');
                document.getElementById('goal').classList.add('hidden');
                document.getElementById('title').classList.remove('hidden');
            }, 5000); // De tijd voor de bal om het doel te bereiken
        }, 5000); // 5 seconden om de titel te verbergen
    }
});



/*===================================
//Side Menu Close
======================================*/
$("#close-side-menu-nav").on("click",function () {

    $(".open-side-menu").addClass('opacity-control');
    setTimeout(function () {
        $(".side-bar").addClass("remove_side_bar");
        $(".side-menu-nav").removeClass("open-side-menu");
        // remove class of visability hidden of main menu
        $(".nav-appear").removeClass("main-nav-hide");

    },100);

    //animation remove sub menu
    $(".sub-menu-nav-appear").removeClass("submenu-disappear");

    //remove class of visiabilty of sub menu
    $(".submenu-overlay").removeClass("Demo-submenu-visible");


});

/*===================================
//Sub Menu Open
======================================*/
$(".side-bar .nav-item .nav-link").on("click",function (event) {

    var x=event.target.id;

   if(x== ""){

   }
   else{
       $(".side-menu-nav nav").removeClass("nav-styling");
       $(".nav-appear").addClass("nav-disappear");
       setTimeout(function () {
           $(".nav-appear").addClass("main-nav-hide");
           $("#"+x+" "+"~div.submenu-overlay").addClass("Demo-submenu-visible");
       },200);
       setTimeout(function () {
           $(".nav-appear").removeClass("nav-disappear");
       },1000);

   }

});

/*===================================
// GO back on Sub Menu
======================================*/
$('.go-back-btn').on('click',function () {


    setTimeout(function () {
        $(".nav-appear").removeClass("main-nav-hide"); // main nav show
        $(".side-menu-nav nav").addClass("nav-styling");
    },300);

    $(".Demo-submenu-visible .sub-menu-nav-appear").addClass("submenu-disappear"); // animation sub menu zoom out .6 sec

        $(".submenu-overlay").removeClass("Demo-submenu-visible");  // sub menu hidden

    setTimeout(function () {
        $(".sub-menu-nav-appear").removeClass("submenu-disappear");
    },700);

});


/*===================================
All Featured Item Carousel
======================================*/

$('.featured-items').owlCarousel({
    loop:true,
    autoplay: false,
    center: true,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:3
        },
        600:{
            items:3
        },
        1000:{
            items:3
        }
    }
});


/*===================================
   clients item carausel
======================================*/
$('.clients').owlCarousel({
    loop:true,
    autoplay: false,
    center: true,
    nav:false,
    dots:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
});



/*===================================
   Display Cart On Click
======================================*/
$('.cart-item .lni-cart').on('click',function () {
    $('.mini-cart').prop('display','block');
});


/*===================================
   Model Window In Inner Pages Function
======================================*/
function open_model_window1(x){

    $.ajax({
        type: "GET",
        url: x,
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            //alert(result);
            $("#modal-data").html(result);
        }
    });
    openmodal(x);
    load_items();
    load_number_counter();
}

/*===================================
   Model Window In Main Page Function
======================================*/
function open_model_window(x){
    console.log(x)
    $http.get(x).then(function(response) {
        console.log(response.data);
    });
    
    
    openmodal(x);
    load_items();
    load_number_counter();
}

/* =====================================
         Input Number Quantity
====================================== */
function load_number_counter() {

    $('#instocknumber').prop('disabled', true);
    $(document).on('click','#plus',function(){
       $('#instocknumber').val(parseInt($('#instocknumber').val()) + 1 );

    });
    $(document).on('click','#minus',function(){
        $('#instocknumber').val(parseInt($('#instocknumber').val()) - 1 );
        if ($('#instocknumber').val() == 0) {
            $('#instocknumber').val(1);

        }
    });
}

/* =====================================
             Fancy Box Image viewer
====================================== */
$('[data-fancybox]').fancybox({
    'transitionIn': 'elastic',
    'transitionOut': 'elastic',
    'speedIn': 600,
    'speedOut': 200,
    buttons: [
        'slideShow',
        'fullScreen',
        'thumbs',
        'share',
        // 'download',
        'zoom',
        'close'
    ],
});



function load_items(){
    setTimeout(function(){
        $('.single-item').owlCarousel({
            loop:true,
            autoplay: false,
            center: true,
            lazyLoad: true,
            nav:false,
            dots:true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                }
            }
        });
    },80);
}


function openmodal(x){

    setTimeout(function(){$('#'+x).addClass('open-popup').fadeIn(800);},50);
    setTimeout(function(){$('.body-overlay').addClass('body-overlay-for-next-slide').fadeIn(800);},50);

}

/*=================================================
   Close Model Window
==================================================*/
$('#modal-data').on('click','.close-window',function () {
    $('.model-window').removeClass('open-popup');
    $('.body-overlay').removeClass('body-overlay-for-next-slide');
});


/*=================================================
   Click On Screen and Model Window Will Close
==================================================*/
$('#modal-data').on('click','.model-window',function (event) {
    var x=event.target.className;
    var v=x.split(" ");
    // alert(v[0]);
    var c=v[0];
    if(c=="model-window"){
        $('.model-window').removeClass('open-popup');
        $('.body-overlay').removeClass('body-overlay-for-next-slide');
    }
    else{
    }
});



function slide_window1(x) {
    $.ajax({
        type: "GET",
        url: "app/"+x+".html",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            //alert(result);
            $("#modal-data").html(result);
        }
    });
    $("#model-loader").addClass("model-loader");
    setTimeout(function () {
        $("#model-loader").fadeOut(700);
    },800);
    $('.body-overlay').addClass('body-overlay-for-next-slide');
    $('.model-window').removeClass('open-popup');
    setTimeout(function () {
        $('#'+x).addClass('open-popup').fadeIn(700);
    },800);
    setTimeout(function () {
        $("#model-loader").removeClass("model-loader");
    },800);

    load_items();
}

/*===================================
      Next And Previous Model Window
======================================*/
function slide_window(x) {
    $.ajax({
        type: "GET",
        url: "product/model-windows/"+x+".html",
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            $("#modal-data").html(result);
        }
    });
    $("#model-loader").addClass("model-loader");
    setTimeout(function () {
        $("#model-loader").fadeOut(700);
    },800);
    $('.body-overlay').addClass('body-overlay-for-next-slide');
    $('.model-window').removeClass('open-popup');
    setTimeout(function () {
        $('#'+x).addClass('open-popup').fadeIn(700);
    },800);
    setTimeout(function () {
        $("#model-loader").removeClass("model-loader");
    },800);

    load_items();
}


/* ===================================
          Swiper Product Slider
======================================*/
var swiper = new Swiper('#product-slider', {
    direction: 'vertical',
    mousewheelControl: true,
    slidesPerView: 1,
    speed: 600,
    mousewheel: true,
    pagination: {
        el: '.swiper-dots',
        clickable: true,
    },

});




/* ===================================
          Stop Parallax Banner
======================================*/
if($(window).width() < 780) {
    $('.parallax-slide').addClass('paralax-data');
} else {
    $('.parallax-slide').removeClass('paralax-data');
    $('.parallax-slide').parallaxie({
        speed: 0.5,
        offset: -180,
    });
}

/* ===================================
           Audio Player
======================================*/
var v= $('video, audio');
if(v.length){
    v.mediaelementplayer({
        // Do not forget to put a final slash (/)
        pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
        // this will allow the CDN to use Flash without restrictions
        // (by default, this is set as `sameDomain`)
        shimScriptAccess: 'always'
        // more configuration
    });
}


/*===================================
           Sticky Nav Filter
======================================*/

var sidebar = $('#product-filter-nav');
if(sidebar.length) {
    Stickyfill.add(sidebar);
}

/*===================================
          Price Range
======================================*/

if ($("#slider-range").length) {
    var marginSlider = document.getElementById('slider-range');

    noUiSlider.create(marginSlider, {
        start: [0, 800],
        margin: 30,
        step: 1,
        connect: true,
        range: {
            'min': 0,
            'max': 1000
        },

    });

    var marginMin = document.getElementById('min-p'),
        marginMax = document.getElementById('max-p');

    marginSlider.noUiSlider.on('update', function (values, handle) {
        if (handle) {
            var str = values[handle]
            var res = str.split(".");
            marginMax.innerHTML = "$" + res[0];
        } else {
            var str = values[handle]
            var res = str.split(".");
            marginMin.innerHTML = "$" + res[0] + " - ";
        }
    });
}

/*===================================
          Input Number Counter
======================================*/


$('#instocknumber').prop('disabled', true);
    $(document).on('click','#plus',function(){
       $('#instocknumber').val(parseInt($('#instocknumber').val()) + 1 );

    });
    $(document).on('click','#minus',function(){
        $('#instocknumber').val(parseInt($('#instocknumber').val()) - 1 );
        if ($('#instocknumber').val() == 0) {
            $('#instocknumber').val(1);

        }
    });

/*===================================
          Swiper Sync Slider
======================================*/
if ($("#gallery").length) {
    var galleryTop = new Swiper('#gallery', {
        effect: 'fade',
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        initialSlide: 0,
        centeredSlides: true,
        loopAdditionalSlides: 5,
        touchRatio: 0.2,

    });

    var galleryThumbs = new Swiper('#thumbs', {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 3,
        slidesPerGroup: 1,
        loop: true,
        initialSlide: 0,
        centeredSlides: true,
        loopAdditionalSlides: 3,
        touchRatio: 0.2,
        slideToClickedSlide: true
    });

    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}



