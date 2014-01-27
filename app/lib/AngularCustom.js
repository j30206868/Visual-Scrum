var VSRoot = angular.module('VSRoot', [
  'ngRoute',
  'VSControllers'
],
/******************************************************************************************************

	解決Angularjs 使用$http(ajax) 傳遞非同步訊息給 php 時 , 接收不到post資料 卻沒有任何錯誤訊息的問題
	
參考: http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
原因:
	The difference is in how jQuery and AngularJS serialize and transmit the data. Fundamentally, the problem lies with your server language of choice being unable to understand AngularJS’s transmission natively—that’s a darn shame because         AngularJS is certainly not doing anything wrong. By default, jQuery transmits data using Content-Type:         x-www-form-urlencoded and the familiar foo=bar&baz=moe serialization. AngularJS, however, transmits data using        Content-Type: application/json and { "foo": "bar", "baz": "moe" } JSON serialization, which unfortunately some Web server        languages—notably PHP—do not unserialize natively.
		
*******************************************************************************************************/
function($httpProvider){
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data)
  {
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj)
    {
      var query = '';
      var name, value, fullSubName, subName, subValue, innerObj, i;
      
      for(name in obj)
      {
        value = obj[name];
        
        if(value instanceof Array)
        {
          for(i=0; i<value.length; ++i)
          {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object)
        {
          for(subName in value)
          {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
        {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
      
      return query.length ? query.substr(0, query.length - 1) : query;
    };
    
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}
/******************************************************************************************************/
/******************************************************************************************************/
);
 
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
	
	//Authenticate user identification
	/**/
	var userId = 'u9923024';
	var userPass = '1234';
	
	getUserProjectInfo(userId, userPass, $http);
	//Load user data from datebase
	
	//Initiate Stage(Canvas) and all pre-build elements in project page
	epicAreaInit( 'content' );
	
	//hide arrow in the front of page title
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

function getUserProjectInfo(userId, upass, $http){
	$http({
		method: 'POST',
		url: 'php/DBController.php',
		data:{
			uid:'u9923024',
			upass:'1234'
		}
	}).success(function(data, status, headers, config) {
		// this callback will be called asynchronously
		// when the response is available
			console.log(data);
		}).error(function(data, status, headers, config) {
		// called asynchronously if an error occurs
		// or server returns response with an error status.
			alert('ajax error');
		}
	);
}