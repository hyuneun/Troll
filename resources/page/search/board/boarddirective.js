myApp.directive('board', function(BoardResource,BoardData,summoner){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerData=summoner.get();
			$scope.selectVal=BoardData.getSelect();
			$scope.selectVal.page=1;
			$scope.selectVal.board_category='';
			$scope.selectVal.search_category='';
			$scope.selectVal.search_value='';
			$scope.boardData=BoardData.get();
			$scope.category=["고의트롤","하수","핵사용자","어뷰져","욕설"];
			$scope.layout={
				view:""
			}
			$scope.$watch("summonerData.$promise",function(newval,oldval){
				if(angular.isUndefined(newval))return;
				newval.then(function(data){
					$scope.selectVal.id=data.summonerData.id;
					boardChange($scope.selectVal);
				},function(error){
					Materialize.toast('게시판정보를 가져오는데 실패했습니다.', 4000);
				});
			});
			$scope.selectBoard=function(board){
				$scope.detail=board;
				$scope.layout.view="detail"
			}
			$scope.categoryChange=function(selectVal) {
				selectVal.page=1;
				boardChange(selectVal);
			}
			$scope.selectPage=function(page){
				$scope.selectVal.page=page;
				boardChange($scope.selectVal);
				
			}
			var boardChange=function(selectVal){
				$scope.$emit("loadingOn",{});
				BoardResource.get(selectVal).$promise.then(function(data){
					BoardData.set(data);
					$scope.$emit("loadingOff",{});
				},function(error){
					console.log(error);
					$scope.$emit("loadingOff",{});
				});
			}
			$scope.$on("boardViewChange",function(event,data){
				$scope.layout.view=data;
			});
			$scope.$on("boardRedirect",function(event,data){
				boardChange($scope.selectVal);
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});
myApp.directive('boardDetail', function(BoardDetailResource,BoardDetailData,ReplyResource){
	return {
		scope: {board:"@board"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.data=angular.fromJson($scope.board);
			BoardDetailResource.get({num:$scope.data.board_num}).$promise.then(function(data){
				BoardDetailData.set(data);
				$scope.data=BoardDetailData.get();
				
			},function(error){
				$scope.$emit("boardViewChange",'');
				$scope.$emit("boardRedirect",{});
				Materialize.toast('존재하지않는 게시물입니다.', 4000);
			});
			$scope.back=function(){
				$scope.$emit("boardViewChange",'');
			}
			$scope.layout=false;
			$scope.passwordlayout=false;
			$scope.modify=false;
			$scope.confirmPassword=false;
			$scope.delete=false;
			$scope.category=["고의트롤","하수","핵사용자","어뷰져","욕설"];
			$scope.passwordConfirm=function(data){
				if($scope.modify){
					if($scope.confirmPassword){
						$scope.data.board_detail.num=$scope.data.board_detail.board_num;
						BoardDetailResource.patch($scope.data.board_detail).$promise.then(function(data){
							$scope.$emit("boardRedirect",{});
							$scope.$emit("boardViewChange",'');
							Materialize.toast('수정에 성공했습니다.', 4000);
						},function(error){
							Materialize.toast('수정실패!', 4000);
						});
					}else{
						BoardDetailResource.confirm({num:$scope.data.board_detail.board_num,board_password:data}).$promise
						.then(function(data){
							if(data.success){
								$scope.confirmPassword=true;
								$scope.layout=true;
								$scope.modify=true;
								$scope.error=false;
							}else{
								$scope.confirmPassword=false;
								$scope.modify=true;
								$scope.layout=false;
								$scope.error=true;
							}
						}, function(error){
								$scope.confirmPassword=false;
								$scope.modify=true;
								$scope.layout=false;
								$scope.error=false;
						});
					}
					
				}else if($scope.delete){
					BoardDetailResource.delete({num:$scope.data.board_detail.board_num,board_password:data}).$promise
					.then(function(data){
						if(data.success){
							Materialize.toast('삭제에 성공했습니다.', 4000);
							$scope.$emit("boardRedirect",{});
							$scope.$emit("boardViewChange",'');
						}else{
							$scope.error=true;
							$scope.layout=false;
						}
					}, function(error){
						Materialize.toast('에러!.', 4000);
					});
				}
			}
			$scope.deleteClick=function(){
				if($scope.delete){
					$scope.layout=false;
					$scope.delete=false;
					$scope.passwordlayout=false;
					$scope.confirmPassword=false;
					$scope.data.board_detail.board_password="";
				}else{
					$scope.delete=true;
					$scope.passwordlayout=true;
				}
			}
			$scope.modifyClick=function(){
				if($scope.modify){
					$scope.layout=false;
					$scope.modify=false;
					$scope.passwordlayout=false;
					$scope.confirmPassword=false;
					$scope.data.board_detail.board_password="";
				}else{
					$scope.modify=true;
					$scope.passwordlayout=true;
				}	
			}
			$scope.replydelete=function(data){
				$scope.$emit("loadingOn",{});
				ReplyResource.delete(data).$promise.then(function(data){
					if(data.success){
						BoardDetailResource.get({num:$scope.data.board_detail.board_num}).$promise.then(function(data){
							BoardDetailData.set(data);
							$scope.$emit("loadingOff",{});
						},function(error){
							$scope.$emit("loadingOff",{});
							$scope.$emit("boardViewChange",'');
							$scope.$emit("boardRedirect",{});
							Materialize.toast('존재하지않는 게시물입니다.', 4000);
						});

					}else{
						Materialize.toast("암호가 틀렸습니다",2000);
						$scope.$emit("loadingOff",{});
					}
				},function(error){
					$scope.$emit("loadingOff",{});
				});
			}
			
			
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board-detail.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});
myApp.directive('boardCreate', function(summoner,BoardDetailResource,BoardResource,BoardData){
	return {
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.summonerData=summoner.get();
			$scope.createBoard={};
			$scope.category=["고의트롤","하수","핵사용자","어뷰져","욕설"];
			$scope.$watch("summonerData.$promise",function(newval,oldval){
				if(angular.isUndefined(newval))return;
				newval.then(function(data){
					$scope.createBoard.id=data.summonerData.id;
				},function(error){
				});
			});
			$scope.create=function(data){
				BoardDetailResource.put(data).$promise.then(function(result){
					if(result.success==true){
						BoardResource.get(BoardData.getSelect()).$promise.then(function(data){
							BoardData.set(data);
							$scope.$emit("boardViewChange",'');
						});
					}else{
						Materialize.toast("데이터 삽입에러",1000);
					}
				},function(error){
					Materialize.toast("서버와 통신에러",1000);
				});
			}
			$scope.back=function(){
				$scope.$emit("boardViewChange",'');
			}
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/board-create.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});

myApp.directive('paging', function(BoardResource){
	return {
		scope: {
			page:"=page",
			size:"=size",
			pagesize:"@pagesize",
			pagelength:"@pagelength",
			pageclick:"&pageclick"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.$watch("size",function(newval,oldval){
				
				$scope.pageCount=Math.ceil($scope.size/$scope.pagesize);
				$scope.startPage=Math.floor(($scope.page-1)/$scope.pagelength)*5+1;
				$scope.endPage=($scope.startPage+($scope.pagelength-1));
				$scope.endPage=$scope.endPage>$scope.pageCount?$scope.pageCount:$scope.endPage;
				$scope.array=[];
				for(var i=$scope.startPage;i<=$scope.endPage;i++){
					$scope.array.push(i);
				}
				
			});
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/paging.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});

myApp.directive('replyForm', function(ReplyResource,BoardDetailResource,BoardDetailData){
	return {
		scope: {boardnum:"=boardnum",selectgnum:"=selectgnum"}, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {
			$scope.create=function(replydata){
				replydata.board_num=$scope.boardnum;
				replydata.selectgnum=$scope.selectgnum;
				ReplyResource.put(replydata).$promise.then(function(data){
					if(data.success){
						$scope.renewal();
					}
				},function(error){
					Materialize.toast("자료추가 오류!",2000);
				});
			}
			$scope.renewal=function(){
				$scope.$emit("loadingOn",{});
				BoardDetailResource.get({num:$scope.createReply.board_num})
					.$promise.then(function(data){
					$scope.$emit("loadingOff",{});
					BoardDetailData.set(data);

				},function(error){
					Materialize.toast("자료추가 오류!",2000);
					$scope.$emit("loadingOff",{});
				});
			}
			
		},
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: '/resources/page/search/board/reply-form.html',
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});