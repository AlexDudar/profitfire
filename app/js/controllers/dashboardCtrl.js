'use strict';

angular.module('ProfitApp.DashboardCtrl', [])
  .controller('DashboardCtrl', ['$scope', 'syncData', function($scope, syncData) {
    syncData('syncedValue').$bind($scope, 'syncedValue');
  }]);