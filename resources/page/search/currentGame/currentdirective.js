myApp.directive('currentGame', function(currentGameData){
	// Runs during compile
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data = currentGameData.get();	
			
		},
	    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		//template: 'asdasd',
		templateUrl: '/resources/page/search/currentGame/currentGame.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});