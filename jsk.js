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

})