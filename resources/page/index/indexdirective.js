myApp.directive('indexVideo', function(mediaElement,$cookies){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change	
		controller: function($scope, $element, $attrs, $transclude) {
			mediaElement.setVideo($element.children().eq(0));
			$scope.video=mediaElement.getMedia().video.element[0];
			$scope.setting=mediaElement.getMedia().video.setting;
			if(angular.isDefined($cookies.get("video"))){
				if($cookies.get("video")=="true"){
					$scope.setting.on=true;
				}else{
					$scope.setting.on=false;
				}
			}
			$scope.$watch("setting.on",function(newval,oldval){
				if(newval==oldval)return;
				if(newval){
					$cookies.put("video",true);
				}else{
					$cookies.put("video",false);
				}
			});		
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/index/index-video.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('indexMusic', function(mediaElement,$cookies){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			mediaElement.setMusic($element.children().eq(0));
			$scope.music=mediaElement.getMedia().music.element[0];
			$scope.setting=mediaElement.getMedia().music.setting;

			if(angular.isDefined($cookies.get("music"))){
				if($cookies.get("music")=="true"){
					$scope.setting.on=true;
					$scope.music.muted=false;
				}else{
					$scope.setting.on=false;
					$scope.music.muted=true;
				}
			}
			$scope.$watch("setting.on",function(newval,oldval){
				if(newval==oldval)return;
				if(newval){
					$cookies.put("music",true);
					$scope.music.muted=false;
				}else{
					$cookies.put("music",false);
					$scope.music.muted=true;
				}
			});		
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/index/index-music.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('indexSearchform',function($cookies,$timeout,$location){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			//cookie 클릭시 search input에 값 입력
		
			$scope.searchList=[];
			if(angular.isDefined($cookies.get("searchList"))){
				angular.extend($scope.searchList,angular.fromJson($cookies.get("searchList")));
				
			}
			/*$scope.cookieClick=function(searchval){
				$scope.summonerName=searchval;
			}*/
			//chip삭제시 쿠키에서도 delete
			$scope.cookieDelete=function(searchval){
				$scope.searchList.splice($scope.searchList.indexOf(searchval),1)
				$cookies.putObject("searchList",$scope.searchList);
			}
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
				$scope.$emit("loadingOn",{});
				$timeout(function(){
					$location.path("/"+summonerName);
				},1000);	
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/index/index-searchform.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('indexMusicicon', function(mediaElement){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.music=mediaElement.getMedia().music.setting;
			$scope.musicoff = function () {
				$scope.music.on = false;
			}
			$scope.musicon = function () {
				$scope.music.on = true;
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/index/index-musicicon.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});

myApp.directive('indexVideoicon', function(mediaElement){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.video=mediaElement.getMedia().video.setting;
			$scope.videoshow = function () {
				$scope.video.on = false;
			}
			$scope.videostop = function () {
				$scope.video.on = true;
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/index/index-videoicon.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
