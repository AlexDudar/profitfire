(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

    .factory('categories', function () {
       var categories = [
         {
           id: 1,
           title: 'Food'
         },
         {
           id: 2,
           title: 'Sport'
         }
       ];

       return {
         list: function () {
           return categories;
         }
       };
    });


})();

