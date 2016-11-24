myApp.factory('ShardResource', function($resource){
	return $resource('http://status.leagueoflegends.com/shards/kr',{},{
		get:{method:"GET",isArray:false}
	});
});//ajax처리 관련 service
myApp.constant('TrollRestUrl', "http://localhost:8080/");

myApp.factory('CurrentGameResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"currentGame/:summonerName2", {summonerName2:"@summonerName2"},{
        get:{method:"GET",isArray:false}
    });
});

