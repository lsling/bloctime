(function() {
    function HomeCtrl($interval, $scope, CLOCK) {
      $scope.session = 'Start';
      $scope.totalTime = CLOCK.WORK;
      $scope.resetTotalTime = CLOCK.WORK;
      $scope.onBreak = false;
      $scope.sessionCount = 0;

      $scope.sessionTime = function(session){
        if (session == "Start") {
          $scope.startSession();
        } else if (session == "Reset") {
          $scope.resetSession();
        }
      };

      var chime = new buzz.sound("../assets/music/Electronic_Chime-KevanGC-495939803.mp3", {
        preload: true
      });

      $scope.startSession = function() {
        $scope.session = "Reset";
        stop = $interval(function() {
          if ($scope.totalTime > 0) {
            $scope.totalTime = $scope.totalTime - 1;
          } else {
            $scope.onBreak = !$scope.onBreak;
            $scope.session = "Start";
              if ($scope.onBreak == true) {
                $scope.sessionCount += 1;
                if ($scope.sessionCount % 4 > 0) {
                  $scope.totalTime = CLOCK.SHORT_BREAK;
                  $scope.resetTotalTime = CLOCK.SHORT_BREAK;
                } else {
                  $scope.totalTime = CLOCK.LONG_BREAK;
                  $scope.resetTotalTime = CLOCK.LONG_BREAK;
                }
              } else {
                $scope.totalTime = CLOCK.WORK;
                $scope.resetSession = CLOCK.WORK;
              };
              $interval.cancel(stop);
            }
        }, 1000);

        $scope.$watch('totalTime', function() {
          if ($scope.totalTime === 0) {
            chime.play();
          };
        });

        $scope.resetSession = function() {
          $scope.totalTime = CLOCK.WORK;
          $interval.cancel(stop);
          $scope.session = 'Start';
        };

        $scope.skipBreak = function() {
          $scope.onBreak = false;
          $scope.totalTime = CLOCK.WORK;
          $interval.cancel(stop);
          $scope.session = 'Start';
        };
      };
    }

    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$interval', '$scope', 'CLOCK', HomeCtrl]);
})();
