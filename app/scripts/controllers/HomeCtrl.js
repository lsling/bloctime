(function() {
    function HomeCtrl($interval, $scope) {
      $scope.session = 'Start';
      $scope.totalTime = '1500';

      $scope.sessionTime = function(session) {
        if (session == "Start") {
          $scope.startSession();
        } else if (session == "Reset") {
          $scope.resetSession();
        }
      };

      $scope.startSession = function() {
        $scope.session = "Reset";
        stop = $interval(function() {
          if ($scope.totalTime > 0) {
            $scope.totalTime = $scope.totalTime - 1;
          } else {
          }
        }, 1000, 1500);
      };

      $scope.resetSession = function() {
        $scope.totalTime = 1500;
        $interval.cancel(stop);
        $scope.session = 'Start';
      };
    }

    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$interval', '$scope', HomeCtrl]);
})();
