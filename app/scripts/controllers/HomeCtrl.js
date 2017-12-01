(function() {
    function HomeCtrl($interval, CLOCK, $scope) {
      $scope.session = 'Start';
      $scope.totalTime = CLOCK.WORK;
      $scope.onBreak = false;
      $scope.timerRunning = false;

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
        }, 1000, 20);
      };

      $scope.resetSession = function() {
        $scope.totalTime = 20;
        $interval.cancel(stop);
        $scope.session = 'Start';
      };

      $scope.countdown = function() {
        if($scope.totalTime > 0) {
          $scope.totalTime --;
        } else if ($scope.totalTime <= 0 && $scope.onBreak == false) {
          $scope.onBreak = true;
          $scope.totalTime = CLOCK.BREAK;
          $scope.session = "Break";
          $scope.button = "default";
          $scope.timerRunning = false;
          $interval.cancel(stop);
        } else if ($scope.totalTime <= 0 && $scope.onBreak == true) {
          $scope.onBreak = false;
          $scope.totalTime = CLOCK.WORK;
          $scope.timerRunning = false;
          $scope.session = "Start";
          $scope.button = "default";
          $interval.cancel(stop);
        }
      }
    }

    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$interval', 'CLOCK', '$scope', HomeCtrl]);
})();
