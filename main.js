(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

// cart 
const dishes = {
    breakfast: [
        { name: "Pancakes", price: 150, img: "img/menu-1.jpg" },
        { name: "Waffles", price: 200, img: "img/menu-2.jpg" },
        { name: "Omelette", price: 120, img: "img/menu-3.jpg" },
    ],
    lunch: [
        { name: "Grilled Chicken", price: 300, img: "img/menu-4.jpg" },
        { name: "Pasta Alfredo", price: 250, img: "img/menu-5.jpg" },
        { name: "Caesar Salad", price: 180, img: "img/menu-6.jpg" },
    ],
    dinner: [
        { name: "Steak", price: 500, img: "img/menu-7.jpg" },
        { name: "Lamb Chops", price: 450, img: "img/menu-8.jpg" },
        { name: "Seafood Platter", price: 550, img: "img/menu-9.jpg" },
    ],
};

const cart = [];

function renderMenu(category, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    dishes[category].forEach((dish, index) => {
        const dishCard = `
        <div class="col-lg-6">
            <div class="menu-card">
                <img src="${dish.img}" alt="${dish.name}">
                <div class="menu-card-details">
                    <h5>${dish.name} <span class="text-primary">₹${dish.price}</span></h5>
                    <div class="add-to-cart">
                        <button class="btn btn-primary" onclick="addToCart('${category}', ${index})">Add to Cart</button>
                        <input type="number" class="form-control" value="1" id="${category}-qty-${index}" style="width: 70px;">
                    </div>
                </div>
            </div>
        </div>`;
        container.innerHTML += dishCard;
    });
}

function addToCart(category, index) {
    const quantityInput = document.getElementById(`${category}-qty-${index}`);
    const quantity = parseInt(quantityInput.value, 10);
    const selectedDish = dishes[category][index];
    const existingItem = cart.find(item => item.name === selectedDish.name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...selectedDish, quantity });
    }
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartItemsContainer.innerHTML += `
        <div class="cart-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        </div>`;
    });

    document.getElementById("total-price").innerText = totalPrice;
}

// Render All Menus
renderMenu("breakfast", "menu-breakfast");
renderMenu("lunch", "menu-lunch");
renderMenu("dinner", "menu-dinner");


