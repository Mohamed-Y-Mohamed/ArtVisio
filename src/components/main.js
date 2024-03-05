// Ensure jQuery is loaded before executing the script
$(document).ready(function () {
    "use strict";

    // MENU
    $('.navbar-collapse a').on('click', function () {
        $(".navbar-collapse").collapse('hide');
    });

    // CUSTOM LINK
    $('.smoothscroll').click(function () {
        var el = $(this).attr('href');
        var elWrapped = $(el);
        var header_height = $('.navbar').height();

        scrollToDiv(elWrapped, header_height);
        return false;
    });
});

// Define scrollToDiv function outside of the click event handler
function scrollToDiv(element, navheight) {
    var offset = element.offset();
    var offsetTop = offset.top;
    var totalScroll = offsetTop - navheight;

    $('body,html').animate({
        scrollTop: totalScroll
    }, 300);
}
s
