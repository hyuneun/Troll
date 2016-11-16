//search첫번째 페이지에 들어갈 인덱스모음

myApp.directive('summonerData', function(SearchResource,summoner,$routeParams,BoardData){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
			/*$scope.$emit('searchPageStart',{});*/
			$scope.$emit("loadingOn",{});
			$scope.$emit('searchPageStart', {loading : true , error : false});
			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
				if (Boolean(Number(data.success))){
					summoner.set(data);
					console.log(data)
					$scope.$emit('searchPageSuccess', {loading : false , error : false});
					$scope.$emit("loadingOff",{});
				}else{
					$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
					$scope.$emit("loadingOff",{});
				}
			},function (error) {
				console.log('에러',error);
			});
			$scope.$on('pageonview',function (data) {
				var totaldata = summoner.get();
				$scope.summonerdata = totaldata['summonerData'];
				$scope.leaguedata = totaldata['leagueData'];
				$scope.recentgame = totaldata['recentgamelist'];
				if (angular.isObject(totaldata['leagueData'])){
					$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
					$scope.divisionurl = totaldata['leagueData'].entrylist[0].division.toLowerCase();
				}else{
					$scope.unlanked = totaldata['leagueData'];
				}
			});
			$scope.avgcs =  function (stats) {
				console.log(stats.minionsKilled,stats.timePlayed);
				return (stats.minionsKilled / (stats.timePlayed / 60)).toFixed(2);
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
