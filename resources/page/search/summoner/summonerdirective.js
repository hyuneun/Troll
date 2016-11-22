//search첫번째 페이지에 들어갈 인덱스모음

myApp.directive('summonerData', function(SearchResource,summoner,$routeParams,BoardData,$location,$http,itemResource,SpellResource,
	recentchampResource){
	return {
		 scope: {}, // {} = isolate, true = child, false/undefined = no change
		 controller: function($scope, $element, $attrs, $transclude) {
		 	/*$scope.$emit('searchPageStart',{});*/
		 	$scope.$emit("loadingOn",{});
		 	$scope.$emit('searchPageStart', {loading : true , error : false});
		 	itemResource.get({}).$promise.then(function (data) {
		 		summoner.setitem(data);
		 		$scope.itemdata = summoner.getitem();
		 	},function (err) {
		 		console.log('item 불러오기 err :  ',err)
		 	})
		 	SpellResource.get({}).$promise.then(function (data) {
		 		summoner.setspell(data);
		 		$scope.spelldata = summoner.getspell();
		 		console.log($scope.spelldata);
		 	},function (err) {
		 		console.log('spell 불러오기 err :  ',err)
		 	});
		 	if (Object.keys(summoner.get()).length === 0) {
		 		SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 			if (Boolean(Number(data.success))){
		 				summoner.set(data);
		 				summoner.addsummonerdata($scope, summoner);
		 				$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 				$scope.$emit("loadingOff",{});
		 			}else{
		 				$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
		 				$scope.$emit("loadingOff",{});
		 			}
		 		},function (error) {
		 			console.log('에러',error);
		 		});
		 	}else{
		 		if ($routeParams.summonerName !== summoner.get().summonerData.name) {
		 			SearchResource.get({summonerName : $routeParams.summonerName}).$promise.then(function (data) {
		 				if (Boolean(Number(data.success))){
		 					summoner.set(data);
		 					summoner.addsummonerdata($scope, summoner);
		 					$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 					$scope.$emit("loadingOff",{});
		 				}else{
		 					$scope.$emit('searchPageError', {errorCode : data.errorcode , errorMessage : data.errormsg});
		 					$scope.$emit("loadingOff",{});
		 				}
		 			},function (error) {
		 				console.log('에러',error);
		 			});
		 		}else{
		 			summoner.addsummonerdata($scope, summoner);
		 			$scope.$emit('searchPageSuccess', {loading : false , error : false});
		 			$scope.$emit("loadingOff",{});
		 		}
		 	}
		 	$scope.mostindex = "";
		 	$scope.mostindexreset = function () {
		 		$scope.mostindex = "";
		 	}
		 	$scope.researchsummoner = function (summonerName) {
		 		$location.path('/'+summonerName);
		 	}

		 },
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/summoner/summonerdata.html',
		link: function($scope, iElm, iAttrs, controller) {
			$('#recentchampmodal').modal({
				opacity:0,
				ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
					var overlay = $('.modal-overlay');
				// remove it
				overlay.detach();
			},
		});

			$scope.getrecentchamp = function (summonerId) {
				console.log(summonerId);
				recentchampResource.get({summonerId : summonerId}).$promise.then(function (data) {
					for (var i = 0; i < data['champlist'].length; i++) {
						data['champlist'][i].drag = true;
					}
					$scope.recentchamplist = data['champlist'];
					$('#recentchampmodal').modal({
						opacity:0,
					ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
					var overlay = $('.modal-overlay');
					// remove it
					overlay.detach();
				},
				});
					$('#recentchampmodal').modal('open');
					console.log($scope.recentchamplist);
				},function (error) {	
					console.log(error);
				});
			}	
			$scope.startCallback = function(event, ui, title) {
				console.log('You started draggin: ' + title.title);
				$scope.draggedTitle = title.title;
			};

			$scope.stopCallback = function(event, ui) {
				console.log('Why did you stop draggin me?');
			};

			$scope.dragCallback = function(event, ui) {
				console.log('hey, look I`m flying');
			};

			$scope.dropCallback = function(event, ui) {
				console.log('hey, you dumped me :-(' , $scope.draggedTitle);
			};

			$scope.overCallback = function(event, ui) {
				console.log('Look, I`m over you');
			};

			$scope.outCallback = function(event, ui) {
				console.log('I`m not, hehe');
			};
		}
	};
});



