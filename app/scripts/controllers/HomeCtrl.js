(function() {
    function HomeCtrl($interval, $scope, CLOCK) {
      $scope.session = 'Start';
      $scope.totalTime = CLOCK.WORK;
      $scope.onBreak = false;

      $scope.sessionTime = function(session){
        if (session == "Start" && $scope.onBreak == false) {
          $scope.totalTime = CLOCK.WORK;
          $scope.startSession();
        } else if (session == "Reset" && $scope.onBreak == false) {
          $scope.resetSession(CLOCK.WORK);
        } else if (session == "Start" && $scope.onBreak == true) {
          $scope.totalTime = CLOCK.BREAK;
          $scope.startSession();
        } else if (session == "Reset" && $scope.onBreak == true) {
          $scope.resetSession(CLOCK.BREAK);
        }
      };

      $scope.startSession = function() {
        $scope.session = "Reset";
        stop = $interval(function() {
          if ($scope.totalTime > 0) {
            $scope.totalTime = $scope.totalTime - 1;
          } else {
            $scope.onBreak = !$scope.onBreak;
            $scope.session = "Start";
              if ($scope.onBreak == true) {
                $scope.totalTime = CLOCK.BREAK;
              } else {
                $scope.totalTime = CLOCK.WORK;
              };
              $interval.cancel(stop);
            }
        }, 1000);

        $scope.resetSession = function() {
          $scope.totalTime = 1500;
          $interval.cancel(stop);
          $scope.session = 'Start';
        };
      };


    }

    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$interval', '$scope', 'CLOCK', HomeCtrl]);
})();
