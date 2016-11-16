myApp.controller('searchCtrl',function(
	$scope,$routeParams,CurrentGameResource,currentGameData,$window,$document,$timeout){
	$scope.$emit("CoverOff",{});
	$scope.$emit("loadingOff",{});

	$scope.search={
		loading:false,
		error:false
	};

	$scope.$on("searchPageStart",function(event,data){
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
	});

	$scope.$on("searchPageError",function(event,data){
		$scope.search.error=true;
		$scope.search.errorCode=data.errorCode;
		$scope.search.errorMessage=data.errorMessage;
	});
	$scope.$on("searchPageSuccess",function(event,data){
		$scope.search.loading=data.loading;
		$scope.search.error=data.error;
		$scope.$broadcast('pageonview', {});
	});
	//
	$scope.layout={
		section:[1,2,3,4],
		index:0,
		available:true
	}
	$scope.$on("searchViewChange",function(event,data){
		$scope.$emit("loadingOff",{});
		$scope.$emit("CoverOff",{});
		$scope.layout.index=data;
	});
	//scroll이벤트 기능 취소
	/*$window.onmousewheel=function(data){
		//loading이 끝날경우에만 페이지내에서 뷰변경 가능
		if($scope.layout.available){
			//페이지가 상단에 닿았을경우 상단 뷰로 이동
			if(data.deltaY<0){
				$scope.layout.index--;
				if($scope.layout.index<0){
					$scope.layout.index=$scope.layout.section.length;
				}
				$scope.$apply();
			}
			//페이지가 하단에 닿았을 경우 하단 뷰로 이동
			if(data.deltaY>0){
				$scope.layout.index++;
				if(!($scope.layout.index<$scope.layout.section.length)){
					$scope.layout.index=0;
				}
				$window.scroll(0,0)
				$scope.$apply();
			}
		}
	}*/
	$scope.$on("loadingCoverOn",function(event,data){
		$scope.layout.available=false;
	});
	$scope.$on("loadingCoverOff",function(event,data){
		$timeout(function(){
			$scope.layout.available=true;
		},2000);
	})

	
});