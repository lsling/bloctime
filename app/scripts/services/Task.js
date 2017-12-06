(function() {
  function Task($firebaseArray) {
    var ref = firebase.database().ref().child("tasks");
    var tasks = $firebaseArray(ref);

    var createTask = function(task){
      task.createdAt = firebase.database.ServerValue.TIMESTAMP;
      return tasks.$add(task);
    }

    var removeTask = function(task) {
      tasks.$remove(tasks.$indexFor(task.$id));
    }

    return{
      all : tasks,
      add : createTask,
      remove : removeTask,
    };
  }

  angular
    .module('bloctime')
    .factory('Task', ['$firebaseArray', Task]);
})();
