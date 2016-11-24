myApp.directive('loading',function(){ 
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/loading.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('error',function($route){
	// Runs during compile
	return {
		scope: {errorCode:"@errorCode",errorMessage:"@errorMessage"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.reload=function(){
				$route.reload();
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/error.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('backCover',function($routeParams,$location){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {	
			$scope.layout={
				on:true
			};
			$scope.$on("backCoverOn",function(event,data){
				$scope.layout.on=true;
			});
			$scope.$on("backCoverOff",function(event,data){
				$scope.layout.on=false;

			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/back-cover.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});


myApp.directive('searchNav',function($cookies,$timeout,$location,mediaElement,summoner,$routeParams){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			//cookie 클릭시 search input에 값 입력
			$scope.searchList=[];
			if(angular.isDefined($cookies.get("searchList"))){
				angular.extend($scope.searchList,angular.fromJson($cookies.get("searchList")));
			}
			$scope.cookieClick=function(searchval){
				$scope.summonerName=searchval;
			}
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

			//검색시 실행 메소드
			$scope.search = function (summonerName) {
				if($scope.searchList.indexOf(summonerName)==-1&&$scope.searchList.length<5){
					$scope.searchList.push(summonerName)
				}
				$cookies.putObject("searchList",$scope.searchList);
				
				if (summonerName == "" ||summonerName == null) {
					Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
					return;
				}
				$scope.$emit("searchStart",{});
				$timeout(function(){
					$location.path("/"+summonerName).replace();
				},1000);	
			}

			$scope.keysearch = function (event,summonerName) {
				if(event.keyCode == 13){
				if($scope.searchList.indexOf(summonerName)==-1&&$scope.searchList.length<5){
					$scope.searchList.push(summonerName)
				}
				$cookies.putObject("searchList",$scope.searchList);
				
				if (summonerName == "" ||summonerName == null) {
					Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
					return;
				}
				$scope.$emit("searchStart",{});
				$timeout(function(){
					$location.path("/"+summonerName).replace();
				},1000);	
			  }
			}
			$scope.goStatic=function(){
				$location.path("/static").replace();
			}
			$scope.viewChange=function(view){
				$scope.$emit("searchViewChange",view);
			}
			$scope.params=$routeParams;
			$scope.dropdownLayout=true;
			$scope.$watch("params",function(newval,oldval){
				if(angular.isUndefined($scope.params.summonerName)){
					$scope.dropdownLayout=false;
					
					
				}else{
					$scope.dropdownLayout=true;
					$scope.summonerName=oldval.summonerName;
				}
			})



		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/publicdirective/search-nav.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});

myApp.directive('statusToast', function(ShardResource){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			ShardResource.get().$promise.then(function(data){
				var index=0;
				for(var i=0;i<data.services.length;i++){
					if(data.services[i].status!="online"){
						index=i;
						break;
					}
				}
				if(index==data.services.length){
					Materialize.toast(data.services[index].name+"이 현재 점검중입니다.",20000)
				}
				for(var i=0;i<data.services.length;i++){
					if(data.services[i].incidents.length!=0){
						Materialize.toast(data.services[i].incidents[0].updates[0].content,20000)
					}
				}
			},function(error){
				console.log(error);
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// templateUrl: '',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('loadingCover', function(){
  return {
    scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $element, $attrs, $transclude) {
    	$scope.layout={
    		loading:false,
    	};
    	$scope.$on("loadingCoverOn",function(){
    		$scope.layout.loading=true;
    	});
    	$scope.$on("loadingCoverOff",function(){
    		$scope.layout.loading=false;
    	});
    },
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: '/resources/publicdirective/loading-cover.html',
    link: function($scope, iElm, iAttrs, controller) {
      
    }
  };
});

myApp.directive('errSrc', function() {
  return {
  	restrict : "A",
    link: function(scope, element, attrs) {
      element.bind('error', function() {
      	attrs.$$element.context.outerHTML = "";
      });
    }
  }
});

