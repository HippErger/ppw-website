/*
  1. preloader
  2. show Timeout
    2.1. show fadeIn
    2.2. show elements
	2.3. init borders/elements
  3. navigation
    3.1. navigation open/close
    3.2. navigation active state
    3.3. navigation hover state
    3.4. navigation page scroll
  4. animate elements
  5. animate home title, animate scroll indicator
  6. hide elements
  7. facts counter
  8. skills bar
  9. forms
    9.1. newsletter form
    9.2. contact form
  10. contact modal
    10.1. contact modal additional CLOSER
  11. slick slider
    11.1. slick testimonials slideshow, slick fullscreen slideshow
  12. YouTube player
  13. resize borders
  14. owl carousel
    14.1. about images owl carousel
	14.2. services owl carousel
  15. borders
  16. news modal
    16.1. manipulate navigation icon
    16.2. manipulate navigation icon via CLOSER
*/


$(function() {
    "use strict";
	
	
    $(window).on("load", function() {
        // 1. preloader
        $("#preloader").fadeOut(600);
        $(".preloader-bg").delay(400).fadeOut(600);
		
        // 2. show Timeout
        // 2.1. show fadeIn
        setTimeout(function() {
            $(".fadeIn-element").delay(1600).css({
                display: "none"
            }).fadeIn(1200);
        }, 0);
        // 2.2. show elements
        setTimeout(function() {
            $(".bottom-credits, .scroll-indicator-wrapper").removeClass("bottom-position");
        }, 1200);
        // 2.3. init borders/elements
        $(initAnimation);
        $(initElements);
    });
	
    // 3. navigation
    // 3.1. navigation open/close
    $(".navigation-icon").on("click", function() {
        $(this).toggleClass("active");
    });
    $(".navigation-fire").on("click", function(e) {
        $(this).toggleClass("open");
        $("nav.navigation-menu").toggleClass("show");
    });
    $("nav.navigation-menu a").on("click", function(e) {
        var hash = $(this.hash);
        $("nav").removeClass("show");
        $(".navigation-fire").removeClass("open");
        $(".navigation-icon").removeClass("active");
    });
    // 3.2. navigation active state
    $("a.menu-state").on("click", function() {
        $("a.menu-state").removeClass("active");
        $(this).addClass("active");
    });
    // 3.3. navigation hover state
    hoverMenu();
    imgMenu();
    function hoverMenu() {
        $(".menu li a").on("mouseenter", function() {
            var ref = $(this).data("ref"),
                menuImg = $('.menu-img[data-ref="' + ref + '"]');
            $(".menu li a").removeClass("active");
            $(this).addClass("active");
            $(".menu-img").removeClass("active");
            menuImg.addClass("active");
        });
    }
    function imgMenu() {
        $("[data-bg]").each(function() {
            var bg = $(this).data("bg");
            $(this).css({
                "background-image": 'url(' + bg + ')',
                "background-position": "center center",
                "background-size": "cover"
            });
        });
    }
    // 3.4. navigation page scroll
    $(".page-scroll").on("click", function(e) {
        var $anchor = $(this);
        if ($(window).width() < 768) {
            $("html, body").stop().animate({
                scrollTop: $($anchor.attr("href")).offset().top - 0
            }, 1500, 'easeInOutExpo');
        } else {
            $("html, body").stop().animate({
                scrollTop: $($anchor.attr("href")).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
        e.preventDefault();
    });
	
    $(window).on("scroll", function() {
        // 4. animate elements
        if ($(this).scrollTop() > 400) {
            $(".bottom-credits").addClass("bottom-credits-home-call");
            $(".to-top-arrow").addClass("show");
        } else {
            $(".bottom-credits").removeClass("bottom-credits-home-call");
            $(".to-top-arrow").removeClass("show");
        }
		
        // 5. animate home title, animate scroll indicator
        if ($(this).scrollTop() > 10) {
            $("h1.home-page-title").addClass("home-page-title-hide").removeClass("home-page-title-show");
            $(".scroll-indicator-wrapper").addClass("scroll-indicator-wrapper-position-secondary");
        } else {
            $("h1.home-page-title").removeClass("home-page-title-hide").addClass("home-page-title-show");
            $(".scroll-indicator-wrapper").removeClass("scroll-indicator-wrapper-position-secondary");
        }
		
        // 6. hide elements
        var scrollTop = $(window).scrollTop();
        var height = $(window).height();
        $(".bottom-credits").css({
            "opacity": ((height - scrollTop) / height)
        });
    });
	
    // 7. facts counter
    $(".facts-counter-number").appear(function() {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });
	
    // 8. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
    // 9. forms
    // 9.1. newsletter form
    $("form#subscribe").on("submit", function() {
        $("form#subscribe .subscribe-error").remove();
        var s = !1;
        if ($(".subscribe-requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter your Email</span>'),
                    $(this).addClass("inputError"), s = !0;
                else if ($(this).hasClass("subscribe-email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="subscribe-error">Please enter a valid Email</span>'),
                        $(this).addClass("inputError"), s = !0);
                }
            }), !s) {
            $("form#subscribe input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#subscribe").slideUp("fast", function() {
                    $(this).before('<div class="subscribe-success">Thank you for subscribing.</div>');
                });
            });
        }
        return !1;
    });
    // 9.2. contact form
    $("form#form").on("submit", function() {
        $("form#form .error").remove();
        var s = !1;
        if ($(".requiredField").each(function() {
                if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
                    "inputError"), s = !0;
                else if ($(this).hasClass("email")) {
                    var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                    r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
                        "inputError"), s = !0);
                }
            }), !s) {
            $("form#form input.submit").fadeOut("normal", function() {
                $(this).parent().append("");
            });
            var r = $(this).serialize();
            $.post($(this).attr("action"), r, function() {
                $("form#form").slideUp("fast", function() {
                    $(this).before('<div class="success">Your email was sent successfully.</div>');
                });
            });
        }
        return !1;
    });
	
    // 10. contact modal
    $(".contact-modal-launcher, .contact-modal-closer").on("click", function() {
        if ($(".contact-modal").hasClass("open")) {
            $(".contact-modal").removeClass("open").addClass("close");
        } else {
            $(".contact-modal").removeClass("close").addClass("open");
        }
    });
    // 10.1. contact modal additional CLOSER
    $(".page-scroll").on("click", function() {
        $(".contact-modal").removeClass("open").addClass("close");
    });
	
    // 11. slick slider
    // 11.1. slick testimonials slideshow, slick fullscreen slideshow
    $(".testimonials-slideshow, .slick-fullscreen-slideshow").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease",
        speed: 1600,
        draggable: true,
        dots: false,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	
    // 12. YouTube player
    $("#bgndVideo").YTPlayer();
	
    $(window).on("resize", function() {
        // 13. resize borders
        $(resizeBorders);
		
        // 14. owl carousel
        // 14.1. about images owl carousel
        if ($(window).width() < 768) {
            $(".about-section-images-carousel").owlCarousel({
                loop: true,
                autoplay: true,
                autoplaySpeed: 1000,
                autoplayTimeout: 5000,
                items: 1,
                margin: 0,
                center: true,
                dots: false,
                nav: true,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: true,
                responsiveRefreshRate: 50,
                navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"]
            });
        } else {
            $(".about-section-images-carousel").trigger("destroy.owl.carousel");
        }
    }).trigger("resize");
    // 14.2. services owl carousel
    $(".services-slider").owlCarousel({
        loop: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        items: 1,
        margin: 0,
        center: true,
        dots: false,
        nav: true,
        touchDrag: true,
        mouseDrag: true,
        pullDrag: true,
        responsiveRefreshRate: 50,
        navText: ["<i class='owl-custom-2 ion-chevron-left'></i>", "<i class='owl-custom-2 ion-chevron-right'></i>"]
    });
	
    // 15. borders
    function initAnimation() {
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "50%");
        $(".border-left, .border-right").css("height", "100%");
        var heightLaterals = $(".border-right").height();
        $(".border-left, .border-right").css("height", "0px");
        $(".border-left, .border-right").css("top", (heightLaterals / 2) + "px");
        var widthFramework = $(".border-top-1").width();
        var widthTop = $(".center-space-top span").width();
        var widthBottom = $(".center-space-bottom span").width();
        var calculateTop = widthFramework - (widthTop / 2) - 8;
        var calculateBottom = widthFramework - (widthBottom / 2) - 8;
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "0%");
        $(".border-left, .border-right").animate({
            height: heightLaterals + "px",
            top: "0px"
        }, 600, function() {
            $(".border-left, .border-right").css({
                height: "100%"
            });
            $(".border-top-1, .border-top-2").animate({
                width: (calculateTop - 25) + "px"
            }, 600);
            $(".border-bottom-1, .border-bottom-2").animate({
                width: (calculateBottom - 25) + "px"
            }, 600);
            $(".center-space-top, .center-space-bottom").stop(true, true).delay(600).animate({
                opacity: 1
            }, 2000);
        });
    }
    function initElements() {
        $(".center-space-top, .center-space-bottom").css("opacity", "0");
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "0%");
        $(".border-left, .border-right").css("height", "0px");
    }
    function resizeBorders() {
        $(".border-top-1, .border-top-2, .border-bottom-1, .border-bottom-2").css("width", "50%");
        var widthFramework = $(".border-top-1").width();
        var widthTop = $(".center-space-top span").width();
        var widthBottom = $(".center-space-bottom span").width();
        var calculateTop = widthFramework - (widthTop / 2) - 8;
        var calculateBottom = widthFramework - (widthBottom / 2) - 8;
        $(".border-top-1, .border-top-2").width(calculateTop);
        $(".border-bottom-1, .border-bottom-2").width(calculateBottom);
    }
	
    // 16. news modal
    // 16.1. manipulate navigation icon
    $(".manipulate-navigation-icon").on("click", function() {
        if ($(".navigation-icon").hasClass("navigation-icon-visible")) {
            $(".navigation-icon").removeClass("navigation-icon-visible").addClass("navigation-icon-hidden");
        } else {
            $(".navigation-icon").removeClass("navigation-icon-hidden").addClass("navigation-icon-visible");
        }
    });
    // 16.2. manipulate navigation icon via CLOSER
    $(".c-btn-modal").on("click", function() {
        $(".navigation-icon").removeClass("navigation-icon-hidden").addClass("navigation-icon-visible");
    });


});