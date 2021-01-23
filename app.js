'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'pascalprecht.translate',
  'ui.bootstrap',
  'ngSanitize',
  'LocalStorageModule',
  'ngAnimate'
]).
config(['$locationProvider', '$routeProvider', '$translateProvider', function($locationProvider, $routeProvider, $translateProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
  var translations = {tr: {}, en: {}};
  translations.en = {
    HOMEPAGE: 'HOMEPAGE',
    CONTACT: 'CONTACT',
    HOME_TITLE: 'WELCOME TO SCORP TEST',
    HOME_WRITING: 'This is the homepage writing. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed enim ipsum. Pellentesque et erat lorem. In a eros a leo condimentum consequat. Aliquam erat justo, dapibus sodales elementum a, porttitor at est. Praesent lacinia id dui at placerat. Nunc congue laoreet pellentesque. Vestibulum elementum mauris rutrum augue blandit, sit amet pulvinar risus aliquam. Vivamus ut purus lectus. Donec mattis erat ex, sed laoreet arcu.',
    TURKISH: 'TR',
    ENGLISH: 'EN',
    LOGIN: 'LOG IN',
    LANGUAGE: 'Language',
    FOOTER_WRITING: 'Scorp Test © ALL RIGHTS RESERVED',
    LOGIN_TITLE: 'LOG IN TO EXPERIENCE SCORP',
    NAME: 'Name',
    PHONE: 'Phone',
    COUNTRY: 'Country',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    EMAIL_INFO: 'We\'ll never share your email with anyone else.',
    LOGOUT: 'Log Out',
    CONTACT_TITLE: 'CONTACT US',
    TURKEY: 'Turkey',
    USA: 'United States of America',
    UK: 'United Kingdom',
    GERMANY: 'Germany',
    SWEDEN: 'Sweden',
    KENYA: 'Kenya',
    BRAZIL: 'Brazil',
    ZIMBABWE: 'Zimbabwe',
    NO_RESULTS: 'No Results Found',
    SEND: 'SEND',
    SHARE_WITH_US: 'Share With Us'
  };
  translations.tr = {
    HOMEPAGE: 'ANA SAYFA',
    CONTACT: 'İLETİŞİM',
    HOME_TITLE: 'SCORP TESTE HOŞGELDİNİZ',
    HOME_WRITING: 'Bu ana sayfa yazısı. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed enim ipsum. Pellentesque et erat lorem. In a eros a leo condimentum consequat. Aliquam erat justo, dapibus sodales elementum a, porttitor at est. Praesent lacinia id dui at placerat. Nunc congue laoreet pellentesque. Vestibulum elementum mauris rutrum augue blandit, sit amet pulvinar risus aliquam. Vivamus ut purus lectus. Donec mattis erat ex, sed laoreet arcu.',
    TURKISH: 'TR',
    ENGLISH: 'EN',
    LOGIN: 'GİRİŞ',
    LANGUAGE: 'Dil',
    FOOTER_WRITING: 'Scorp Test © TÜM HAKLARI SAKLIDIR',
    LOGIN_TITLE: 'SCORPU KEŞFETMEK İÇİN GİRİŞ YAPIN',
    NAME: 'İsim',
    PHONE: 'Telefon',
    COUNTRY: 'Ülke',
    EMAIL: 'E-Posta',
    PASSWORD: 'Şifre',
    EMAIL_INFO: 'E-postanızı, asla, kimse ile paylaşmayacağız.',
    LOGOUT: 'Çıkış Yap',
    CONTACT_TITLE: 'BİZİMLE İLTİŞİME GEÇİN',
    TURKEY: 'Türkiye',
    USA: 'Amerika Birleşik Devletleri',
    UK: 'Birleşik Krallıklar',
    GERMANY: 'Almanya',
    SWEDEN: 'İsveç',
    KENYA: 'Kenya',
    BRAZIL: 'Brezilya',
    ZIMBABWE: 'Zimbabwe',
    NO_RESULTS: 'Sonuç Bulunamadı',
    SEND: 'GÖNDER',
    SHARE_WITH_US: 'Bizimle Paylaşın'
  };
  $translateProvider
      .translations('en', translations.en).translations('tr', translations.tr)
      .preferredLanguage('en')
      .useSanitizeValueStrategy('escapeParameters');
}])
.controller("headerController" ,["$scope", "$translate", '$location', '$uibModal', '$log', 'localStorageService', '$rootScope', function($scope, $translate, $location, $uibModal, $log, localStorageService, $rootScope){
  $scope.currentLanguage = $translate.use();
  $scope.changeLanguage = function(lang){
    $translate.use(lang);
    $scope.currentLanguage = lang;
  };
  $scope.checkURL = function(path){
    var currentURL = $location.path().split("/");
    var thisPath = false;
    if (currentURL.length > 1) {
      if (currentURL[1] === path) {
        thisPath = true;
      }
    }
    return thisPath;
  };
  $scope.animationsEnabled = false;

  $scope.openLogInModal = function (size, parentSelector) {
    var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem
    });
    modalInstance.result.then(function () {

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
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
  $scope.status = {
    isOpen: false,
    isOpenUser: false
  };
  $scope.logOut = function() {
    localStorageService.set('userInfo', null);
    $rootScope.userLogedIn = false;
  };
}])
.controller('ModalInstanceCtrl', ['$scope', '$uibModal', '$log', '$uibModalInstance', 'localStorageService', '$rootScope', function($scope, $uibModal, $log, $uibModalInstance, localStorageService, $rootScope) {

  var $ctrl = this;
  $ctrl.userInfo = {
    Password: '',
    Email: ''
  };
  var user = localStorageService.get('userInfo');
  if (user && user !== null) {
    $ctrl.userInfo = user;
  };

  $ctrl.login = function () {
    $rootScope.userLogedIn = true;
    localStorageService.set('userInfo', $ctrl.userInfo);
    $uibModalInstance.close();
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);