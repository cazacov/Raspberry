/**
 * Created by Victor on 23.02.14.
 */
angular.module('zberry', ['ngResource', 'ngRoute']);

angular.module('zberry').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: '/partials/main',
      controller: 'mainCtrl'
    });
});

angular.module('zberry').controller('mainCtrl', function($scope) {
  $scope.myVar = "Hello ZBerry";
})

