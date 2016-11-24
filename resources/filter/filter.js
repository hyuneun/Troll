myApp.filter('kdafilter',function () {
	return function (stats) {
		var kda;
		if (stats.numDeaths === 0) {
			kda= (stats.assists + stats.championsKilled) / 1;
		}else{
			kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		}
		return kda.toFixed(2) + ':1' ;
	}
});

myApp.filter('kdatxtcolorfilter',function () {
	return function (stats) {
		var kda= (stats.assists + stats.championsKilled) / stats.numDeaths;
		if (kda < 1) {
			return 'kdared'
		}else if(kda >= 3){
			return 'kdablue'
		}else{
			return ''
		}
	}
});

myApp.filter('avgcsfilter' ,function(){
	return function (stats) {
		return (stats.minionsKilled / (stats.timePlayed / 60)).toFixed(2);
	}
});
myApp.filter('commafilter',function () {
	return function (stats) {
	  return stats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
});

/*myApp.filter('Killingsfilter',function () {
	return function (stats) {
	  var killdata = [stats.firstBlood , stats.doubleKills , stats.tripleKills , stats.quadraKills , stats.pentaKills];
	  console.log(killdata);
	  return killdata;
	}
});*/

myApp.filter('gametypefilter',function () {
	return function (type) {
		if (type == 'RANKED_FLEX_TT' || type == 'RANKED_FLEX_SR'){
			return '자유랭크'
		}else if(type == 'NORMAL' || type === 'NORMAL_3x3'){
			return '일반'
		}else if(type === "ODIN_UNRANKED"){
			return '도미니언'
		}else if(type === 'ARAM_UNRANKED_5x5'){
			return '칼바람'
		}else if(type === 'BOT' ||type === 'BOT_3x3' ){
			return '봇전'
		}else if(type === 'RANKED_SOLO_5x5' ){
			return '랭크'
		}else if(type === 'RANKED_TEAM_3x3'){
			return '랭크{3:3}'
		}else if(type === 'RANKED_TEAM_5x5' ||type === 'BOT_3x3' ){
			return '랭크{5:5}'
		}else if(type === 'ONEFORALL_5x5'){
			return '원챔프'
		}else if(type === 'FIRSTBLOOD_1x1' ||type === 'FIRSTBLOOD_2x2' ){
			return '퍼블'
		}else if(type === 'URF' ||type === 'URF_BOT' ){
			return '우르프'
		}else if(type === 'NIGHTMARE_BOT'){
			return '봇(나이트메어)'
		}else if(type === 'HEXAKILL' || type ==='SR_6x6'){
			return '헥사킬'
		}else if(type === 'KING_PORO' ){
			return '왕과포로'
		}else if(type === 'BILGEWATER'){
			return '배'
		}else{
			return '커스텀'
		}
	}
});
myApp.filter('gameendtimefilter', function () {
	return function(date){
		var endgametime = new Date(parseInt(date));
		var today = new Date();
		var endtime =  today.getTime() - endgametime.getTime();
		if (endtime < 3600000) {
			return (Math.round(endtime / 60000) < 1? '방금전': Math.round(endtime / 60000)+ '분전')
		}else if(endtime < 86400000){
			return Math.round(endtime / 3600000) + '시간전';
		}else if(endtime < (86400000 * 30)){
			return Math.round(endtime / 86400000) + '일전';
		}else if(endtime < ((86400000 * 30)* 12)){
			return Math.floor(endtime / (86400000 * 30)) + '달전';
		}else {
			return '오래된 게임(1년 이상)';
		}
	}
})
myApp.filter('gamedatefilter', function () {
	return function(date){
		var gamedate = new Date(parseInt(date));
		var year = gamedate.getFullYear();
		var month = gamedate.getMonth() + 1;
		var day = gamedate.getDate();
		return year + '년 '+(month >= 10 ?  month:'0'+month) + '월 '+(day > 10 ? day:'0'+day)+'일'
	}
})
myApp.filter('victoryfilter',function () {
	return function (boolean) {
		if (boolean) {return 'Win';
		}else {return 'Lose';}
	}
});


myApp.filter('gametimefilter',function () {
	return function (gametime) {
		var minutes = parseInt(gametime / 60);
		var millisecond = gametime % 60;
		var hour = parseInt(minutes / 60);
		var hourminute = (minutes % 60)
		if (minutes > 60) {
			return hour + '시간' + (hourminute >= 10? hourminute:'0'+hourminute) + '분';
		}
		return (minutes >= 10? minutes:'0'+minutes)  + '분' + (millisecond >= 10? millisecond:'0'+millisecond) + '초';
	}
});

myApp.filter('teamcolorfilter',function () {
	return function (teamId) {
		if (teamId == '100') {return 'blueteamborder';
		}else {return 'redteamborder';}
	}
});

myApp.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
