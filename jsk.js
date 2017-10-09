$(document).ready(function(){


	var songs = [{
		id: 1,
		song: 'new_wave',
		screen: 'New Wave', 
		artist: 'Against Me!'  
	},{
		id: 2,
		song: 'stop', 
		screen: 'Stop',
		artist: 'Against Me!' 
	},{
		id: 3,
		song: 'thrash_unreal',
		screen: 'Thrash Unreal',
		artist: 'Against Me!'
	},{
		id: 4,
		song: 'up_the_cuts',
		screen: 'Up The Cuts',
		artist: 'Against Me!'
	},{
		id: 5,
		song: 'basket_case',
		screen: 'Basket Case',
		artist: 'Green Day'
	},{
		id: 6,
		song: 'brain_stew',
		screen: 'Brain Stew',
		artist: 'Green Day'
	},{
		id: 7,
		song: 'she',
		screen: 'She',
		artist: 'Green Day'
	},{
		id: 8,
		song: 'walking_contradiction',
		screen: 'Walking Contradiction',
		artist: 'Green Day'
	},{
		id: 9,
		song: 'welcome_to_paradise',
		screen: 'Welcome To Paradise',
		artist: 'Green Day'
	},{
		id: 10,
		song: 'when_i_come_around',
		screen: 'When I Come Around',
		artist: 'Green Day'
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
	instructionsH3.text('Click on Song to Play')
	instructionsP.append(instructionsH3);
	$('div').eq(0).append(instructionsP)

	var songListDiv = $('<div>');
	var songList = $('<ol>');
	var songLi;
	for(var i = 0; i < songs.length; i++){
		songLi = $('<li>')
		songLi.html('Song: <button class="direct-play" data-id="' + songs[i].id + '">' + songs[i].screen + "</button>, Artist: " + songs[i].artist);
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

})