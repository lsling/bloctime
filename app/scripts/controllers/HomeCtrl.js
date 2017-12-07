(function() {
    function HomeCtrl($interval, $scope, CLOCK, Task) {
      $scope.session = 'Start';
      $scope.totalTime = CLOCK.WORK;
      $scope.resetTotalTime = CLOCK.WORK;
      $scope.onShortBreak = false;
      $scope.onLongBreak = false;
      $scope.sessionCount = 0;
      $scope.newTask = {};
      $scope.tasks = Task.all;

      $scope.createTask = function(){
        Task.add($scope.newTask);
        $scope.newTask = {};
      }

      $scope.removeTask = function(task){
        Task.remove(task);
      }

      $scope.sessionTime = function(session){
        if (session == "Start") {
          $scope.startSession();
        } else if (session == "Reset") {
          $scope.resetSession();
        }
        $scope.createTask = function(){
          Task.add($scope.newTask);
          $scope.newTask = {};
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
            $scope.onShortBreak = !$scope.onShortBreak;
            $scope.onLongBreak = !$scope.onLongBreak;
            $scope.session = "Start";
              if ($scope.onShortBreak || $scope.onLongBreak == true) {
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
          $scope.onShortBreak = false;
          $scope.onLongBreak = false;
          $scope.totalTime = CLOCK.WORK;
          $interval.cancel(stop);
          $scope.session = 'Start';
        };
      };
    }

    angular
        .module('bloctime')
        .controller('HomeCtrl', ['$interval', '$scope', 'CLOCK', 'Task', HomeCtrl]);
})();
