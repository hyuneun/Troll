myApp.factory('currentGameData', function(){
	var localeData={};
	return {
		get:function(){
			return localeData;
		},
		set:function(data){
			for (var member in localeData) delete localeData[member];
			angular.extend(localeData,data);
		}
	};
})