'use strict';

angular.module('ProfitApp.AccountCtrl', [])
  .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', 'categories', '$firebase', function($scope, loginService, syncData, $location, categories, $firebase) {
    syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

    $scope.currentUser = syncData(['users', $scope.auth.user.uid + '/expenses/']);
    $scope.userRoot = syncData(['users', $scope.auth.user.uid + '/total/']);
    $scope.ttal = syncData(['users', $scope.auth.user.uid]);

    var d = new Date();
    var n = d.getMonth();
    //console.log(n + 1);


    $scope.expense = null;

    $scope.categoryItems = categories.list();
    $scope.category = $scope.categoryItems[0];

    $scope.expenses = $scope.currentUser;

    console.log($scope.currentUser);


    $scope.getDate = {
      current: new Date()
    };
    $scope.month = $scope.getDate.current.getMonth() + 1;

    $scope.gettingDate = function(){
      var fullDate = new Date();
      var month = fullDate.getMonth();
    };

    //$scope.totalsum = $scope.userRoot;
    //console.log($scope.userRoot);

    $scope.userRoot.$on("loaded", function(data) {
      $scope.totalsum  = data.totals;
    });

    $scope.addExpense = function(){
      if($scope.expense){
        $scope.currentUser.$add({
          expense: $scope.expense.id,
          purpose: $scope.expense.purpose,
          class: $scope.category.title,
          amount: $scope.expense.amount,
          date: $scope.getDate
        });

        $scope.expense = null;

      }
    };

    $scope.addSum = function(newAmount){
      $scope.newAmount = newAmount;
      $scope.totalsum = $scope.totalsum + parseInt($scope.newAmount);
      //console.log($scope.totalsum);

      //$scope.userRoot.$on("loaded", function(data) {
      //  console.log(data);
      //
      //  var keys = [];
      //
      //  for(var k in data) {
      //    keys.push(k);
      //  }
      //  console.log(keys[0]);
      //
      //
      //});


      //$scope.ttal.$add({totalSum: $scope.totalsum});

      $scope.userRoot.$set({totals: $scope.totalsum});
    };


    $scope.editorEnabled = false;

    $scope.save = function(id) {
     // var nameRef = syncData(['users', $scope.auth.user.uid + '/expenses/' + id]);
      $scope.currentUser.$save();
      $scope.editorEnabled = false;
    };



    $scope.removeExpense = function(id){
      $scope.expenses.$remove(id);
    };

    $scope.currentMonth = d.getMonth() + 1;

    $scope.nextMonth = function (){
      $scope.currentMonth += 1;
    };

    $scope.previousMonth = function (){
      $scope.currentMonth -= 1;
    };




  /*------------ PROFILE -------------*/
    $scope.logout = function() {
      loginService.logout();
    };

    $scope.oldpass = null;
    $scope.newpass = null;
    $scope.confirm = null;

    $scope.reset = function() {
      $scope.err = null;
      $scope.msg = null;
    };

    $scope.updatePassword = function() {
      $scope.reset();
      loginService.changePassword(buildPwdParms());
    };

    function buildPwdParms() {
      return {
        email: $scope.auth.user.email,
        oldpass: $scope.oldpass,
        newpass: $scope.newpass,
        confirm: $scope.confirm,
        callback: function(err) {
          if( err ) {
            $scope.err = err;
          }
          else {
            $scope.oldpass = null;
            $scope.newpass = null;
            $scope.confirm = null;
            $scope.msg = 'Password updated!';
          }
        }
      }
    }

  }]);
