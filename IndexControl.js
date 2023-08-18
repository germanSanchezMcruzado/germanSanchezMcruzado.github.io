// Options for the Intersection Observer
const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0, 1], // Execute the resetAnimation function both when element enters and leaves the view
  };

// Function to reset the animation when element is in view
function resetAnimation(entries, observer) {
    entries.forEach((entry) => {
        const element = entry.target;
        id = element.getAttribute('id');
        if(id == null)
        {
            element.setAttribute('id', `notVisible`);
            id = 'notVisible';
        }

        if (entry.isIntersecting) {
          element.setAttribute('id', `visible`); // Modify 'id' attribute to include '-visible' when element is in view
        } else {
            element.setAttribute('id', `notVisible`); // Remove '-visible' from 'id' attribute when element is out of view     
        }
      });
  }
  
document.addEventListener('DOMContentLoaded', function() {
    // Your JavaScript code here
    const observer = new IntersectionObserver(resetAnimation, options);

    elementsToObserve = [];
    getAllElements(document.body, elementsToObserve);

    function getAllElements(element, array) {
    if (element && element.nodeType === Node.ELEMENT_NODE) {
        if (element.tagName !== 'SECTION') {
          array.push(element);
        }
        const childNodes = element.childNodes;
        childNodes.forEach((child) => {
        getAllElements(child, array);
        });
    }
    }

    // Function to refresh the observer every 0.1 seconds
    function refreshObserver() {
    elementsToObserve.forEach((element) => {
    observer.observe(element);
    });
    }

    // Listen for 'resize' and 'scroll' events on the window object
    window.addEventListener('resize', refreshObserver);
    window.addEventListener('scroll', refreshObserver);
    
    console.log(elementsToObserve);
    refreshObserver();

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("activeEducation");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
  }

});

 $(document).ready(function () {
  var mySwiper = new Swiper(".swiper", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
      }
    }
  });
  $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
    mySwiper.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
  });
});