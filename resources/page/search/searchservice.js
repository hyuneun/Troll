myApp.factory('SearchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"user/:summonerName", {summonerName:"@summonerName"},{
        get:{method:"GET"}
    });
});
myApp.factory('summoner', function(){
	var searchdata={};
	return {
		get:function(){
			return searchdata;
		},
		set:function(data){
			for (var member in searchdata) delete searchdata[member];
			angular.extend(searchdata,data);
		}
	};
})