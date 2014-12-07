// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.directives', 'starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.familia', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/familia.html",
          controller: "FamiliaCtrl"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/farmacias.html",
          controller:'FarmaciaCtrl'
        }
      }
    })
    .state('app.reminderlists', {
      url: "/reminderlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/reminderlists.html",
          controller: 'ReminderlistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/reminderlists/:reminderId",
      views: {
        'menuContent' :{
          templateUrl: "templates/reminder.html",
          controller: 'ReminderCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/reminderlists');
});

