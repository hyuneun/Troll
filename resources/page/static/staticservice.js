myApp.factory('staticLocaleData', function(){
	var localeData={};
	var selectedLocale="ko_KR";
	return {
		get:function(){
			return localeData;
		},
		set:function(data){
			for (var member in localeData) delete localeData[member];
			angular.extend(localeData,data);
		},
		selected:function(){
			return selectedLocale;
		},
		select:function(locale){
			selectedLocale=locale;
		}
	};
})
myApp.factory('staticData', function(){
	var staticData={};
	var selectedCategory="champion";
	return {
		get:function(){
			return staticData;
		},
		set:function(data){
			for (var member in staticData) delete staticData[member];
			angular.extend(staticData,data);
		},
		selected:function(){
			return selectedCategory;
		},
		select:function(view){
			selectedCategory=view;
		}

	};
});
myApp.factory('staticDetail', function(){
	var selectData={};
	return{
		get:function(){
			return selectData;
		},
		set:function(data){
			for (var member in selectData) delete selectData[member];
			angular.extend(selectData,data);
		}
	};
});
myApp.factory('StaticLocaleResource',function($resource,TrollRestUrl){
	return $resource(TrollRestUrl+"static/locale/:locale/:category/:id",
		{locale:"@locale",category:"@category",id:"@id"},{
		get:{method:"GET",isArray:false}
	});
});
