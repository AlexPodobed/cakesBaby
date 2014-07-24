var response = [
    {
        "title": "Time to Share: 6 for $3.99*",
        "img": "cake-logo-1.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "/products/promo1.html"
    },
    {
        "title": "Rise 'n shine",
        "img": "cake-logo-2.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "/products/promo2.html"
    },
    {
        "title": "PM Snackers: Brownie Bites",
        "img": "cake-logo-3.png",
        "description": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "/products/promo3.html"
    },
    {
        "title": "PM Snackers: Brownie Bites new",
        "img": "cake-logo-4.png",
        "descrption": "Lorem ipsum dolor sit amet. consectetur adipisicing elit, sed do eiusmod tempor incididunt ut la bore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exefcitalion ullamoo laboris nisi ut aliquip ex ea commodo oonsequat.",
        "note": "* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga. * At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.\n* At vero eos et accusamus et iusto odo dtgntsslmos duclmus qui blandltlis praesentlum voluptatum delenrtl atque corruptl quos doQres et quas molestlas exceptun sint occaecatl cupidrtate non pro v dent, slmllique sunt In culpa qui otflcia deserunt mollrtia anlmi. id est la bo aim et dolorum tuga.",
        "productUrl": "/products/promo4.html"
    }
];


window.Cake = (function () {

    var current_index = 0;

    function getData(url) {
        return $.getJSON(url)
    }

    function fillTemplate(node, data) {
        node.find('.cake-image img').attr('src', 'imgs/' + data.img)
            .end().find('.cake-title h2').text(data.title)
            .end().find('.cake-description p').text(data.description)
            .end().find('.cake-notes p').text(data.note);
    }

    function preloadImgs(data) {
        for (var i = 0; i < data.length; i++) {
            new Image().src = 'imgs/' + data[i].img;
        }
    }

    function showNext(node, obj) {
        if (obj[current_index + 1]) {
            current_index++;
            fillTemplate(node, obj[current_index]);
        }
    }

    function showPrev(node, obj) {
        if (obj[current_index - 1]) {
            current_index--;
            fillTemplate(node, obj[current_index]);
        }
    }

    function showHide() {

    }

    function attachEvents(node, data) {
        node.find('.cake-navigation .prev').on('click', function () {
            showPrev(node, data)
        });
        node.find('.cake-navigation .next').on('click', function () {
            showNext(node, data)
        });
        node.find('.cake-navigation .show-hide a').on('click', showHide);
    }


    function init(config) {
        /*
         var promise = getData(config.url);

         $.when(promise)
         .done(function(data){
         preloadImgs(data);
         fillTemplate(data);
         attachEvents(data);
         });
         */

        var data = response;
        var $cake_wrapper = $('.cake-wrapper');

        preloadImgs(data);
        fillTemplate($cake_wrapper, data[current_index]);
        attachEvents($cake_wrapper, data);
    }

    return {
        init: init
    }

}());

$(document).ready(function () {
    window.Cake.init({url: '/api/data'})
});