import '../css/style.css';
import { IRoute } from "../../models/interfaces/route";
import { Router } from "../../models/classes/router";

let routes: IRoute[];

routes = [
    {
        "path": "/",
        "component": "list.html",
        "controller": function () {
            $.getJSON('./data/books.json').done(
                response => {
                    let items = response.items;
                    var ract = new Ractive(
                        {
                            el: "#books",
                            template: "#templateCards",
                            data: {
                                items: items
                            }
                        }
                    );
                }
            );
        }
    },
    {
        "path": "/detail/:id",
        "component": "detail.html",
        "controller": function (id) {
            $.getJSON('./data/books.json').done(
                response => {
                    let items = response.items;
                    let item = items.find(
                        elem => {
                            return elem.id === id;
                        }
                    );

                    if (item) {
                        var ract = new Ractive(
                            {
                                el: "#book",
                                template: "#templateBook",
                                data: item.volumeInfo
                            }
                        );
                    }
                }
            );

        }
    }
];

$(document).ready(function () {
    $('.toggle-sidebar').click(function (event) {
        event.preventDefault();
        if (!$('.left-aside').hasClass('aside-close')) {
            $('.left-aside').toggleClass('aside-close');
            $('.left-aside').animate({
                flex: '0 0 50px'
            }, function () {
                $('.main-section').toggleClass('col-11');
            });
        } else {
            $('.main-section').toggleClass('col-11');
            $('.left-aside').animate({
                flex: '0 0 25%'
            }, function () {
                $(this).toggleClass('aside-close');
            });
        }
    });
});

$(window).on('load', function (e) {
    let event = e.originalEvent;
    let router = new Router(routes);
    router.routing(event.target['location']);    
});

$(window).on('hashchange', function (e) {
    let event = e.originalEvent;
    let router = new Router(routes);
    router.routing(event.target['location']);
});