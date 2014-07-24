/**
 * Created by apod on 24-Jul-14.
 */

$(document).ready(function() {
    window.Cake();
});

window.Cake = (function(config) {
    var cake_wrapper = $('.cake-wrapper'),
        start_index = 0,
        url = config.url,
        promise = undefined;

    function getJson() {
        return $.getJSON(url);
    }

    function fillTemplate(data) {
        cake_wrapper.find('.image-wrapper img').attr('src', 'images/' + data.img);
        cake_wrapper.find('.cake-info-wrapper .header h3').text(data.title);
        cake_wrapper.find('.cake-info-wrapper .body .description').text(data.description);
        cake_wrapper.find('.cake-info-wrapper .body .notes').text(data.note);
    }

    function preloadImgs(data) {
        for (var i = 0; i < data.length; i++) {
            new Image().src = 'images/' + data[i].img;
        }
    }

    function animateMoves(callback) {
        cake_wrapper.find('.image-wrapper, .cake-info-wrapper .body, .cake-info-wrapper .header').animate({
            opacity: 0
        }, 0, function() {
            callback();
            $(this).animate({
                opacity: 1
            }, 200);
        });
    }

    function showAndHideInfo(e) {
        var link = this;
        if ($(this).hasClass('show')) {
            cake_wrapper.find('.image-wrapper').slideUp(200, function() {
                $(link).removeClass('show')
                    .addClass('hide')
                    .text('hide details');
            });
            cake_wrapper.find('.cake-info-wrapper .header').animate({
                'padding-top': '20px'
            }, 200);
            cake_wrapper.find('.cake-info-wrapper .body').animate({
                height: '212px'
            }, 300);
        } else {
            cake_wrapper.find('.cake-info-wrapper .body').css({
                height: '22px'
            });
            cake_wrapper.find('.cake-info-wrapper .header').animate({
                'padding-top': 0
            }, 200);
            cake_wrapper.find('.image-wrapper').slideDown('200', function() {
                $(link).removeClass('hide')
                    .addClass('show')
                    .text('show details');
            });
        }
        return false;
    }

    function showNextAdd(data) {
        if (data[start_index + 1]) {
            start_index++;
            animateMoves(function() {
                fillTemplate(data[start_index]);
            });
        }
    }

    function showPrevAdd(data) {
        if (data[start_index - 1]) {
            start_index--;
            animateMoves(function() {
                fillTemplate(data[start_index]);
            });
        }
    }

    function atachEvents(data) {
        cake_wrapper.find('.navigation-menu .next').on('click', function() {
            showNextAdd(data);
        });
        cake_wrapper.find('.navigation-menu .prev').on('click', function() {
            showPrevAdd(data);
        });
        cake_wrapper.find('.show-details a').on('click', showAndHideInfo)
    }

    function init() {
        promise = getJson();
        $.when(promise)
            .done(function(data) {
                preloadImgs(data);
                fillTemplate(data[start_index]);
                atachEvents(data);
            });
    }
    return init;
})({
    url: 'json/info_box.json',
    option2: 'something',
    option3: 'something'
})