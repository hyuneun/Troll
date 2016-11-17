//search첫번째 페이지에 들어갈 인덱스모음

myApp.directive('summonerData', function(SearchResource,summoner,$routeParams,BoardData,BoardResource,$location){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
			/*$scope.$emit('searchPageStart',{});*/
			$scope.$emit("loadingOn",{});
			$scope.$emit('searchPageStart', {loading : true , error : false});
			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
				if (Boolean(Number(data.success))){
					summoner.set(data);
					BoardResource.get({id:data.leagueData.id,board_category:"category"}).$promise.then(function(data){
						if(data.success){
							$scope.boardCategory=data;
							console.log(data)
						}
						$scope.$emit('searchPageSuccess', {loading : false , error : false});
						$scope.$emit("loadingOff",{});
					},function(error){
						$scope.$emit('searchPageSuccess', {loading : false , error : false});
						$scope.$emit("loadingOff",{});
					});
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
				$scope.mostchamp = totaldata['most'];
				if (angular.isObject(totaldata['leagueData'])){
					if (totaldata['leagueData'].entrylist[0].division === 'I') {
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase();
					}else{
						$scope.tierurl = totaldata['leagueData'].tier.toLowerCase() +'_'+totaldata['leagueData'].entrylist[0].division.toLowerCase();
					}
				}else{
					$scope.tierurl = "unlanked";
				}
			});
			$scope.researchsummoner = function (summonerName) {
				console.log(summonerName);
				$location.url('/'+summonerName);
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
