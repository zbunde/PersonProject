app.factory('SessionService', ["$cookies",
  function ($cookies) {
  
  return {
    set: function(id){
      $cookies.put('session_id', id);
      this.currentUser = id;
    }
  };
}]);
