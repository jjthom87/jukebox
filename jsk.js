$(document).ready(function(){

	var songs = [{
		id: 1,
		song: 'new_wave',
		screen: 'New Wave', 
		artist: 'Against Me!',
		length: 209,
		testLength: 10
	},{
		id: 2,
		song: 'stop', 
		screen: 'Stop',
		artist: 'Against Me!',
		length: 153,
		testLength: 10
	},{
		id: 3,
		song: 'thrash_unreal',
		screen: 'Thrash Unreal',
		artist: 'Against Me!',
		length: 254,
		testLength: 10
	},{
		id: 4,
		song: 'up_the_cuts',
		screen: 'Up The Cuts',
		artist: 'Against Me!',
		length: 173,
		testLength: 10
	},{
		id: 5,
		song: 'basket_case',
		screen: 'Basket Case',
		artist: 'Green Day',
		length: 182,
		testLength: 10
	},{
		id: 6,
		song: 'brain_stew',
		screen: 'Brain Stew',
		artist: 'Green Day',
		length: 193,
		testLength: 10
	},{
		id: 7,
		song: 'she',
		screen: 'She',
		artist: 'Green Day',
		length: 134,
		testLength: 10
	},{
		id: 8,
		song: 'walking_contradiction',
		screen: 'Walking Contradiction',
		artist: 'Green Day',
		length: 151,
		testLength: 10
	},{
		id: 9,
		song: 'welcome_to_paradise',
		screen: 'Welcome To Paradise',
		artist: 'Green Day',
		length: 224,
		testLength: 10
	},{
		id: 10,
		song: 'when_i_come_around',
		screen: 'When I Come Around',
		artist: 'Green Day',
		length: 178,
		testLength: 10
	}]

	var randomSong = Math.floor(Math.random() * songs.length)
	var options = ['stop', 'start', 'pause', 'random', 'next'];
	for(var i = 0; i < options.length; i++){
		var button = $('<button>',{
			class: 'options-buttons',
			id: 'options-buttons-' + options[i],
			text: options[i],
			value: options[i]
		});
		button.attr('data-id', options[i])
		$('div').eq(0).append(button);
	}

	$(document).on('click', '.options-buttons', function(){
		var audioDiv = $('<div>');
		audioDiv.addClass('song-playing');
		var currentSongDiv = $('<div class="current-song-info">');
		switch($(this).val()){
			case "start":
				appendAudioTags(randomSong, audioDiv);
				appendPTags(randomSong, currentSongDiv, audioDiv)
				break;
			case "stop":
				pause(randomSong);
				$('#playing-' + songs[randomSong].song)[0].currentTime = 0;
				break;
			case "pause":
				pause(randomSong);
				break;
			case "random":
				randomSong = Math.floor(Math.random() * songs.length)
				$('.song-playing').remove();
				appendAudioTags(randomSong, audioDiv);
				appendPTags(randomSong, currentSongDiv, audioDiv);
				break;
			case "next":
				randomSong = randomSong + 1;
				$('.song-playing').remove();
				appendAudioTags(randomSong, audioDiv);
				appendPTags(randomSong, currentSongDiv, audioDiv);
		}
	})

	function appendPTags(index, pDiv, mainDiv){
		var songName = $("<p>");
		var songArtist = $('<p>');
		songName.text("Song: " + songs[index].screen)
		songArtist.text("Artist: " + songs[index].artist)

		pDiv.append(songName).append(songArtist);
		mainDiv.append(pDiv);

		$('div').eq(0).append(mainDiv)
		$('#playing-' + songs[index].song)[0].play();
	}

	const appendAudioTags = (index, mainDiv) => {
		$('.current-song-info').remove();
		var audio = $('<audio>', {
			id: 'playing-' + songs[index].song,
			src: './audio/' + songs[index].song + '.m4a',
			type: 'audio/mpeg'
		})
		mainDiv.append(audio);
	}

	function pause(index){
		$('#playing-' + songs[index].song)[0].pause();
	}

	var instructionsP = $('<p>')
	var instructionsH3 = $('<h3>');
	instructionsH3.text('Click on Song to Play, and \'+\' to add to playlist')
	instructionsP.append(instructionsH3);
	$('div').eq(0).append(instructionsP)

	var songListDiv = $('<div>');
	var songList = $('<ol>');
	var songLi;
	for(var i = 0; i < songs.length; i++){
		songLi = $('<li>')
		songLi.html('Song: <button class="direct-play" data-id="' + songs[i].id + '">' + songs[i].screen + "</button>, <span>Artist: " + songs[i].artist + "</span><button class='playlist-button' data-id='" + songs[i].id + "'>+</button>");
		songList.append(songLi);
	}
	songListDiv.append(songList);
	$('div').eq(0).append(songListDiv);

	$(document).on('click', '.direct-play', function(){
		$('.song-playing').remove();
		var audioDiv = $('<div>');
		audioDiv.addClass('song-playing');
		var currentSongDiv = $('<div class="current-song-info">');

		var song = $(this).data('id') - 1;
		randomSong = song;
		appendAudioTags(song, audioDiv);
		appendPTags(song, currentSongDiv, audioDiv);
	})

	var hoverMethods = ['play', 'stop'];
	var hoverDiv = $('<div>');
	var img;
	hoverMethods.forEach((item) => {
		img = $('<img>', {
			src: './images/' + item + ".png",
			class: 'hover-action',
			width: 'auto',
			height: '150px'
		});
		img.attr('data-action', item)
		hoverDiv.append(img);
	})
	$('div').eq(0).append(hoverDiv);

	$('.hover-action').mouseover('.hover-action', function(){
		var audioDiv = $('<div>');
		audioDiv.addClass('song-playing');
		var currentSongDiv = $('<div class="current-song-info">');
		var action = $(this).data('action');
		switch(action){
			case 'play':
				appendAudioTags(randomSong, audioDiv);
				appendPTags(randomSong, currentSongDiv, audioDiv)
				break;
			case 'stop':
				pause(randomSong);
				$('#playing-' + songs[randomSong].song)[0].currentTime = 0;
				break;
		}
	});

	function createPlaylistTable(div, arr){
		var playlistTable = "<table><tr><th>Artist</th><th>Song</th></tr>";
		for(var i = 0; i < arr.length; i++){
			playlistTable += "<tr><td>" + arr[i].artist + "</td><td>" + arr[i].screen + "</td></tr>"
		}
		div.append(playlistTable + "</table>")
		$('div').eq(0).append(div);
	}

	var playlistArr = [];
	$(document).on('click', '.playlist-button', function(){
		$('.playlist-songs').remove();
		var audioDiv = $('<div>');
		audioDiv.addClass('song-playing');
		var index = $(this).data('id') - 1;
		playlistArr.push(songs[index]);
		var playlistDiv = $('<div>', {
			class: 'playlist-songs'
		});
		createPlaylistTable(playlistDiv, playlistArr)	
		var currentSongDiv = $('<div class="current-song-info">');
		var index = playlistArr[0].id - 1;
		randomSong = index;
		appendAudioTags(randomSong, audioDiv);
		appendPTags(randomSong, currentSongDiv, audioDiv);
		var intee = setInterval(function(){
			var current = $('#playing-' + playlistArr[0].song)[0].currentTime;
			if(playlistArr[0].testLength <= current){
				playlistArr.splice(0,1);
				$('.playlist-songs').remove();
				$('.song-playing').remove();
				$('.current-song-info').remove();
				playlistDiv = $('<div>', {
					class: 'playlist-songs'
				});
				createPlaylistTable(playlistDiv, playlistArr);
				if(playlistArr.length > 0){
					audioDiv = $('<div>');
					audioDiv.addClass('song-playing');
					var currentSongDiv = $('<div class="current-song-info">');
					var index = playlistArr[0].id - 1;
					randomSong = index;
					appendAudioTags(randomSong, audioDiv);
					appendPTags(randomSong, currentSongDiv, audioDiv);
					clearInterval(intee)
				} else {
					$('.playlist-songs').remove();
					clearInterval(intee)
				}
			}
		}, 2000)
	})

})