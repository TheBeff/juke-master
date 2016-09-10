var app = angular.module('app', []);

// var fakeAlbum = {
//   name: 'Abbey Road',
//   imageUrl: 'http://fillmurray.com/300/300',
//   songs: [{
//     name: 'Romeo & Juliette',
//     artists: [{name: 'Bill'}],
//     genre: 'Funk',
//     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//   }, {
//     name: 'White Rabbit',
//     artists: [{name: 'Bill'}, {name: 'Bob'}],
//     genre: 'Fantasy',
//     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//   }, {
//     name: 'Lucy in the Sky with Diamonds',
//     artists: [{name: 'Bob'}],
//     genre: 'Space',
//     audioUrl: 'https://learndotresources.s3.amazonaws.com/workshop/5616dbe5a561920300b10cd7/Dexter_Britain_-_03_-_The_Stars_Are_Out_Interlude.mp3'
//   }]
// };



app.controller('MainCtrl', function($scope, $http, $log){
	$http.get('/api/albums/43')
	  .then(function(response){
	  	var album = response.data;
	  	album.imageUrl = '/api/albums/' + album.id + '/image';
	  	$scope.album = album;
	  })
	  .catch($log.error);

	$scope.findArtists = function(artistArray){
		var result = "";
		for(var i=0; i<artistArray.length; i++){
			result+=(artistArray[i].name + " ");
		}
		return result;
	};
});

app.controller('PlayCtrl', function($scope, $http, $log){
	var audio = document.createElement('audio');
	// audio.load();
	$scope.audio = audio;

	$scope.playAudio = function(song){
		$scope.audio.src = "/api/songs/" + song.id + "/audio";
		audio.play();
		song.nowPlaying = true;
		$scope.currentSong = song;
	};

	$scope.resumeAudio = function(){
		$scope.currentSong.nowPlaying = true;
		audio.play();
	};

	$scope.pauseAudio = function(){
		$scope.currentSong.nowPlaying = false;
		audio.pause();
	};
});


