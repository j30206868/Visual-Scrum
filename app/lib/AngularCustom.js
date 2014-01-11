var VSRoot = angular.module('VSRoot', [
  'ngRoute',
  'VSControllers'
]);
 
VSRoot.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/project', {
        templateUrl: 'project.html',
        controller: 'ProCtrl'
      }).
      when('/tasks', {
        templateUrl: 'VSTasksTest.html',
        controller: 'TasksCtrl'
      }).
      otherwise({
        redirectTo: '/project'
      });
  }]);

var VSControllers = angular.module('VSControllers', []);
 
VSControllers.controller('ProCtrl', ['$scope', '$http',
function PhoneListCtrl($scope, $http) {
	
	epicAreaInit( 'content' );
	
	$('#innerTitleIcon').css('display', 'none');
	$('#innerTitleText').text('Visual Scrum');
	
	console.log('project');
	
	
}]);

VSControllers.controller('TasksCtrl', ['$scope', '$http',
function PhoneListCtrl($scope, $http) {
	
	console.log('tasks');
	$('#tasksArea').ready(function(e) {
		initTasks();
	});
	
	$('#innerTitleIcon').css('display', '');
	
}]);
