"use strict";

angular.module('ProfitApp.routes', ['ngRoute'])

   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/dashboard', {
         templateUrl: 'partials/dashboard.html',
         controller: 'DashboardCtrl'
      });

      $routeProvider.when('/', {
         authRequired: true,
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.when('/:id', {
        templateUrl: 'partials/account.html',
        controller: 'AccountCtrl',
        resolve: {
          load: function($route, syncData){
            return syncData.load($route.current.params.id);
          }
        }
      });

      $routeProvider.otherwise({redirectTo: '/'});
   }]);