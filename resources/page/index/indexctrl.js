myApp.controller('indexCtrl', function($scope,$timeout,$location,$cookies){
	var video;
	var searchList=[];
	$scope.searchList=[];
	if(angular.isDefined($cookies.get("searchList"))){
		angular.extend(searchList,angular.fromJson($cookies.get("searchList")));
		$scope.searchList=searchList;
	}
	$scope.videoOn=true;
	$scope.mute=true;
	if(angular.isDefined($cookies.get("videoOn"))){
		if($cookies.get("videoOn")=="true"){
			$scope.videoOn=true;
		}else{
			$scope.videoOn=false;
			$scope.mute=false;
		}
	}
	if(angular.isDefined($cookies.get("mute"))){
		if($cookies.get("mute")=="true"){
			$scope.mute=true;
		}else{
			$scope.mute=false;
		}

	}
	$scope.$watch("videoOn",function(newval,oldval){
		if(newval==oldval)return;
		video=document.getElementById("myVideo");
		if(newval==false){
			$scope.mute=false;
			$cookies.put("mute",false);
			$cookies.put("videoOn",false);
		}else{
			$scope.mute=true;
			$cookies.put("mute",true);
			$cookies.put("videoOn",true);
		}
	});

	$scope.$watch("mute",function(newval,oldval){
		if(newval==oldval)return;
		video=document.getElementById("myVideo");
		if(video!=null){
			if(newval==true){
				video.muted=false;
				$cookies.put("mute",true);
			}else{
				video.muted=true;
			}
		}
		
	});
	$scope.searchLayout={
		loading:false
	};

	//cookie 클릭시 search input에 값 입력
	$scope.cookieClick=function(searchval){
		$scope.summonerName=searchval;
	}
	//chip삭제시 쿠키에서도 delete
	$scope.cookieDelete=function(searchval){
		searchList.splice(searchList.indexOf(searchval),1)
		$cookies.putObject("searchList",searchList);
	}
	//검색시 실행 메소드
	$scope.search = function (summonerName) {
		if(searchList.indexOf(summonerName)==-1&&searchList.length<5){
			searchList.push(summonerName)
		}
		$cookies.putObject("searchList",searchList);
		
		if (summonerName == "" ||summonerName == null) {
			Materialize.toast('소환사의 아이디를 입력해주세요.', 4000)
			return;
		}
		$scope.searchLayout.loading=true;
		$timeout(function(){
			$location.path("/"+summonerName);
		},1000);	
	}

});
