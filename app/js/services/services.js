(function() {
   'use strict';

   /* Services */

  angular.module('ProfitApp.services', ['ProfitApp.service.login', 'ProfitApp.service.firebase'])

    .factory('categories', function () {
       var categories = [
         {
           id: 0,
           title: 'Accommodation'
         },
         {
           id: 1,
           title: 'Travel'
         },
          {
           id: 2,
           title: 'Electronic Equipment'
         },
          {
           id: 3,
           title: 'Books'
         },
          {
           id: 4,
           title: 'Breakfast'
         },
          {
           id: 5,
           title: 'Clothing'
         },
          {
           id: 6,
           title: 'Gifts'
         },
          {
           id: 7,
           title: 'Hand Tools'
         },
          {
           id: 8,
           title: 'Internet'
         },
          {
           id: 9,
           title: 'Lunch'
         },         
          {
           id: 10,
           title: 'Manuscripts'
         },
          {
           id: 11,
           title: 'Medical Insurance'
         },
          {
           id: 12,
           title: 'Newspapers'
         },                           
          {
           id: 13,
           title: 'Sport'
         },
          {
           id: 14,
           title: 'Transportation'
         },
          {
           id: 15,
           title: 'Internet'
         },
         {
           id: 16,
           title: 'Rent'
         },
          {
           id: 17,
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

