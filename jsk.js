$(document).ready(function(){


	var songs = [{
		song: 'new_wave',
		screen: 'New Wave', 
		artist: 'Against Me!'  
	},{
		song: 'stop', 
		screen: 'Stop',
		artist: 'Against Me!' 
	},{
		song: 'thrash_unreal',
		screen: 'Thrash Unreal',
		artist: 'Against Me!'
	},{
		song: 'up_the_cuts',
		screen: 'Up The Cuts',
		artist: 'Against Me!'
	},{
		song: 'basket_case',
		screen: 'Basket Case',
		artist: 'Green Day'
	},{
		song: 'brain_stew',
		screen: 'Brain Stew',
		artist: 'Green Day'
	},{
		song: 'she',
		screen: 'She',
		artist: 'Green Day'
	},{
		song: 'walking_contradiction',
		screen: 'Walking Contradiction',
		artist: 'Green Day'
	},{
		song: 'welcome_to_paradise',
		screen: 'Welcome To Paradise',
		artist: 'Green Day'
	},{
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
		var currentSongDiv = $('<div class="current-song-info">')
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

	var songListDiv = $('<div>');
	var songList = $('<ol>');
	var songLi;
	for(var i = 0; i < songs.length; i++){
		songLi = $('<li>')
		songLi.text('Song: ' + songs[i].screen + ", Artist: " + songs[i].artist);
		songList.append(songLi);
	}
	songListDiv.append(songList);
	$('div').eq(0).append(songListDiv)

})