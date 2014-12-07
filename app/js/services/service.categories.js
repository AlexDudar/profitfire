(function() {
   'use strict';

   /* Services */

  angular.module('ProfitApp.service.categories', ['ProfitApp.service.login', 'ProfitApp.service.firebase'])

    .factory('categories', function () {
       var categories = [
         {
           id: 0,
           title: 'Food & Water'
         },
         {
           id: 1,
           title: 'Eat Out'
         },
          {
           id: 2,
           title: 'Eat Go'
         },
          {
           id: 3,
           title: 'Clothes & Shoes'
         },
          {
           id: 4,
           title: 'Rent & Utilities'
         },
          {
           id: 5,
           title: 'Gifts'
         },
          {
           id: 6,
           title: 'Learning'
         },
          {
           id: 7,
           title: 'Transportation'
         },
          {
           id: 8,
           title: 'Sport'
         },
          {
           id: 9,
           title: 'Beauty'
         },         
          {
           id: 10,
           title: 'Internet & Mobile'
         },
          {
           id: 11,
           title: 'Medical'
         },
          {
           id: 12,
           title: 'Taxes'
         }  
       ];

       return {
         list: function () {
           return categories;
         }
       };
    });


})();

