myApp.factory('BoardResource', function(TrollRestUrl,$resource){
	return $resource(TrollRestUrl+"board/:id/:page/:board_category/:search_category/:search_value",
		{
			id:"@id",
			page:"@page",
			board_category:"@board_category",
			search_category:"@search_category",
			search_value:"@search_value"
		}, 
		{
			get:{method:"GET",isArray:false}
		});
});
myApp.factory('BoardDetailResource', function(TrollRestUrl,$resource){
	return $resource(TrollRestUrl+"boarddetail/:num",
		{num:"@num"}, 
		{
			get:{method:"GET",isArray:false},
			put:{method:"PUT",isArray:false},
			confirm:{method:"POST",isArray:false},
			patch:{method:"PUT",isArray:false},
			delete:{method:"DELETE",isArray:false}
		});
});
myApp.factory('BoardData', function(){
	var boardData={};
	var selectVal={
		id:"",
		page:1,
		board_category:'',
		search_category:'',
		search_value:''
	};
	return {
		get:function(){
			return boardData;
		},
		set:function(data){
			for (var member in boardData) delete boardData[member];
			angular.extend(boardData,data);
		},
		getSelect:function(){
			return selectVal;
		},


	};
})
myApp.factory('ReplyResource', function(TrollRestUrl,$resource){
	return $resource(TrollRestUrl+"reply/:reply_num",
		{reply_num:"@reply_num"}, 
		{
			get:{method:"GET",isArray:false},
			put:{method:"PUT",isArray:false},
			confirm:{method:"POST",isArray:false},
			patch:{method:"PUT",isArray:false},
			delete:{method:"DELETE",isArray:false}
		});
});

myApp.factory('BoardDetailData', function(){
	var detailData={};
	return {
		get:function(){
			return detailData;
		},
		set:function(data){
			for (var member in detailData) delete detailData[member];
			angular.extend(detailData,data);
		}
	};
})


