//ajax처리 관련 service
myApp.constant('TrollRestUrl', "http://localhost:8080/");
myApp.factory('SearchResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"/user/:summonerName", {summonerName:"@summonerName"},{
        get:{method:"GET",isArray:true}
    });
});
myApp.factory('CurrentGameResource',function($resource,TrollRestUrl){
    return $resource(TrollRestUrl+"currentGame/:summonerName2", {summonerName2:"@summonerName2"},{
        get:{method:"GET",isArray:false}
    });
});

