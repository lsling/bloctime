(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
          enabled: true,
          requireBase: false
      });

    $stateProvider
      .state('home', {
          url: '/',
          controller: 'HomeCtrl as home',
          templateUrl: '/templates/home.html'
      });
  }

  angular
    .module('bloctime', ['ui.router', 'firebase'])
    .constant('SESSIONS', {
      'WORK_SESSION': 1500, 
      'BREAK_SESSION': 300
    })
    .config(config);
})();
