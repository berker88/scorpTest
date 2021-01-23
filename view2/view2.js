'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$scope", "$translate", '$location', '$uibModal', '$log', 'localStorageService', '$rootScope',function($scope, $translate, $location, $uibModal, $log, localStorageService, $rootScope) {
  $scope.country = {
    id: null,
    name: null,
    typeAheadFlag: false,
    readonly: true
  };
  $scope.countries = [
    { id: "TR", name: "TURKEY" },
    { id: "US", name: "USA" },
    { id: "GB", name: "UK" },
    { id: "DE", name: "GERMANY" },
    { id: "SE", name: "SWEDEN" },
    { id: "KE", name: "KENYA" },
    { id: "BR", name: "BRAZIL" },
    { id: "ZW", name: "ZIMBABWE" }
    ];

  $scope.selectTypeAhead = function($item)	{
    //typeahead provides us the ID
    $scope.country.id = $item.id;
    //it has been modified by typeahead
    $scope.country.typeAheadFlag = true;
  };

  // listener for client.firstName to look if it has been modified
  // by typeahead or not (since only through typeahead the ID is informed)
  $scope.$watch('country.name', function(newVal, oldVal)	{
    if($scope.country.typeAheadFlag){
      $scope.country.typeAheadFlag = false;
    } else {
      //if not informed by typeahead we delete the id
      $scope.country.id = null;
    }

  });
  $scope.userInfo = {
    Email: ''
  };
  $scope.checkLocalStorageForUserInfo = function() {
    var userSaved = true;
    var userInfo = localStorageService.get('userInfo');
    if (!userInfo || userInfo === null) {
      userSaved = false;
    } else {
      $scope.userInfo = userInfo;
    }
    return userSaved;
  };
  $rootScope.userLogedIn = $scope.checkLocalStorageForUserInfo();
  $scope.$watch('$root.userLogedIn', function() {
    $scope.userLogedIn = $rootScope.userLogedIn;
    if($rootScope.userLogedIn) {
      var userInfo = localStorageService.get('userInfo');
      if (userInfo && userInfo !== null) {
        $scope.userInfo = userInfo;
      }
    }
  });
  $scope.contactSubmit = function() {
    var contactInfoToSend = {
      name: $scope.userInfo.Name,
      email: $scope.userInfo.Email,
      phone: $scope.userInfo.Phone,
      country: $scope.userInfo.Country,
      text: $scope.userInfo.Message
    };
    console.log(contactInfoToSend);
  };
}]);