angular.module( 'redditDIY', [
    'templates-app',
    'templates-common',
    'redditDIY.home',
    'redditDIY.home.services',
    'ngAnimate',
    'ngCookies',
    'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $httpProvider.interceptors.push('sessionInjector');
    $locationProvider.html5Mode(true);
}]).run(['$rootScope', '$injector', function($rootScope, $injector) {
}])
.factory('sessionInjector', ['$rootScope', function($rootScope) {
    var sessionInjector = {
        request: function(config) {
            return config;
        }
    };
    return sessionInjector;
}])
.controller('AppCtrl', function AppCtrl($scope, $rootScope, $location) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (angular.isDefined(toState.data.pageTitle)) {
            $scope.pageTitle = toState.data.pageTitle + ' | redditDIY';
        }
    });
});