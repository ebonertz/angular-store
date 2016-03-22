/*globals angular */
(function () {
    'use strict';

    var eventLibrary = [
      {
        "id": 1,
        "name": "Boss Nacho @ Maywood",
        "location": "Raleigh",
        "price": "8.99",
        "date": "March 18th",
        "description": "Boss Nacho live at the Maywood. Openers include Chief Guacamole and Honcho Horchata.",
        "image": "http://i.imgur.com/sePIwKq.png"
      },
      {
        "id": 1,
        "name": "Boss Nacho @ Maywood",
        "location": "Raleigh",
        "price": "8.99",
        "date": "March 18th",
        "description": "Boss Nacho live at the Maywood. Openers include Chief Guacamole and Honcho Horchata.",
        "image": "http://i.imgur.com/sePIwKq.png"
      },
      {
        "id": 1,
        "name": "Boss Nacho @ Maywood",
        "location": "Raleigh",
        "price": "8.99",
        "date": "March 18th",
        "description": "Boss Nacho live at the Maywood. Openers include Chief Guacamole and Honcho Horchata.",
        "image": "http://i.imgur.com/sePIwKq.png"
      }];

    angular.module('IronTix')
        .value('localEventLibrary', eventLibrary);

}());
