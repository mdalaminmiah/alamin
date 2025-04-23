!(function($) {
  "use strict";
  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });


  function age(dateString){
    let birth = new Date(dateString);
    let now = new Date();
    let beforeBirth = ((() => {birth.setDate(now.getDate());birth.setMonth(now.getMonth()); return birth.getTime()})() < birth.getTime()) ? 0 : 1;
    return now.getFullYear() - birth.getFullYear() - beforeBirth;
}

function getAge(BeginDate, EndDate) {
  let daysInMonth = 30.436875; // Days in a month on average.
  let dob = new Date(BeginDate);
  let aad =  EndDate ==="" ? new Date() : new Date(EndDate);
  let yearAad = aad.getFullYear();
  let yearDob = dob.getFullYear();
  let years = yearAad - yearDob; // Get age in years.
  dob.setFullYear(yearAad); // Set birthday for this year.
  let aadMillis = aad.getTime();
  let dobMillis = dob.getTime();
  if (aadMillis < dobMillis) {
      --years;
      dob.setFullYear(yearAad - 1); // Set to previous year's birthday
      dobMillis = dob.getTime();
  }
  let days = (aadMillis - dobMillis) / 86400000;  
  let monthsDec = days / daysInMonth; // Months with remainder.
  let months = Math.floor(monthsDec); // Remove fraction from month.
  days = Math.floor(daysInMonth * (monthsDec - months));
  return {years: years, months: months, days: days};
}


let DateOfBirth= getAge('07/05/1995',"") ;
document.getElementById("MyBirthYear").innerHTML = " "+ DateOfBirth.years +" Year " +DateOfBirth.months +" Month " +DateOfBirth.days +" Days." ;

let sVenturaJobYearOfExperience= getAge('06/24/2024',new Date()) ;
document.getElementById("VenturaJobYearOfExperience").innerHTML = " ("+ sVenturaJobYearOfExperience.years +" Year " +sVenturaJobYearOfExperience.months +" Month " +sVenturaJobYearOfExperience.days +" Days.)" ;

let sEpyllionJobYearOfExperience= getAge('04/21/2022','06/24/2024') ;
document.getElementById("EpyllionJobYearOfExperience").innerHTML = " ("+ sEpyllionJobYearOfExperience.years +" Year " +sEpyllionJobYearOfExperience.months +" Month " +sEpyllionJobYearOfExperience.days +" Days.)" ;


let sUrmeeJobYearOfExperience= getAge('09/15/2019','04/20/2022') ;
document.getElementById("UrmeeJobYearOfExperience").innerHTML = " ("+ sUrmeeJobYearOfExperience.years +" Year " +sUrmeeJobYearOfExperience.months +" Month " +sUrmeeJobYearOfExperience.days +" Days.)" ;

let sInfocratJobYearOfExperience= getAge('03/01/2019','05/01/2019') ;
document.getElementById("InfocratJobYearOfExperience").innerHTML = " ("+ (sInfocratJobYearOfExperience.years > 0 ? sInfocratJobYearOfExperience.years +" Year ": "") 
+ (sInfocratJobYearOfExperience.months >0 ? sInfocratJobYearOfExperience.months +" Month ": "") 
+(sInfocratJobYearOfExperience.days>0? sInfocratJobYearOfExperience.days +" Days.":"") +")" ;

let sTeachingJobYearOfExperience= getAge('03/01/2019','05/01/2019') ;
document.getElementById("TeachingJobYearOfExperience").innerHTML = " ("+ (sTeachingJobYearOfExperience.years > 0 ? sTeachingJobYearOfExperience.years +" Year ": "") 
+ (sTeachingJobYearOfExperience.months >0 ? sTeachingJobYearOfExperience.months +" Month ": "") 
+(sTeachingJobYearOfExperience.days>0? sTeachingJobYearOfExperience.days +" Days.":"") +")" ;

})(jQuery);