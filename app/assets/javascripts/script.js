var audiojsplayer;
var as;

var currentSong = null;

$(document).ready(function()
{
	$('.modal-trigger').leanModal();
	$('.parallax').parallax();
	$('.button-collapse').sideNav();
	$('select').material_select();
	$('#audio-pause').hide();
	resizeFrameOnResize();
	if(document.getElementById('audiojsplayer') != null)
		audiojsplayer = document.getElementById('audiojsplayer');
	else
		audiojsplayer = window.parent.document.getElementById('audiojsplayer');
	console.log(audiojsplayer);

	$('.dropdown-button').dropdown(
	{
	    inDuration: 300,
	    outDuration: 225,
	    constrain_width: false, // Does not change width of dropdown to that of the activator
	    hover: false, // Activate on click
	    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
	    gutter: 0, // Spacing from edge
	    belowOrigin: true // Displays dropdown below the button
	});

	$("#playlist-content").tableDnD(
	{
		onDragClass: "playing-drag",
		onDrop: function(table, row)
		{
			console.log("Content dragged");
			var object = $('.playing');
			resetPlaying();
			object.addClass('playing');
			generatePrevNext(object);
		}
	});
})

audiojs.events.ready(function()
{
	audioInit(0);
	selectInit();
})

function Song(id, title, artist, album, url)
{
	this.id = id;
	this.title = title;
	this.artist = artist;
	this.album = album;
	this.url = url;
}

function Playlist(id, name, songs)
{
	this.id = id;
	this.name = name;
	this.songs = songs;
}

function audioInit(index)
{
	as = audiojs.createAll(
		{
			trackEnded: function()
			{
				audioNext();
			}
		});
}

function audioPlay()
{
	// console.log(playlist);
	// if(playlist.length > 0)
	// {
		if(currentSong == null)
			selectInit();

		as[0].play();
		$('#audio-pause').show();
		$('#audio-play').hide();
		$('.audio-title').text(currentSong.title);
		$('.audio-artist').text(currentSong.artist);
		console.log("Playing " + currentSong.title + " by " + currentSong.artist + ".");

		if(currentSong.id == null)
			audioPause();
	// }
	// else
	// {
	// 	console.log("Empty playlist.")
	// }
}

function audioPause()
{
	// console.log(playlist);
	// if(playlist.length > 0)
	// {
		as[0].pause();
		$('#audio-pause').hide();
		$('#audio-play').show();
		$('.audio-title').text(currentSong.title);
		$('.audio-artist').text(currentSong.artist);
		console.log("Paused " + currentSong.title + " by " + currentSong.artist + ".")
	// }
	// else
	// {
	// 	console.log("Empty playlist.")
	// }
}

function audioPlayPause()
{
	if(as[0].paused)
		audioPlay();
	else
		audioPause();
}

function audioStop()
{
	audioPause();
	audioLoad(null, null, null, null, null);
}

function audioHasNext()
{
	if($('.playing').length)
		return true;
	return false;
}

function audioNext()
{
	console.log("Next");
	var object = $('.playing-next');
	resetPlaying();
	object.addClass('playing');
	generatePrevNext(object);

	if(audioHasNext())
	{
		audioLoadHelper();
		audioPlay();
	}
	else
	{
		audioStop();
		$('#audio-pause').hide();
		$('#audio-play').show();
		$('.audio-title').text('');
		$('.audio-artist').text('');
		selectInit();
	}
}

function audioPrev()
{
	console.log("Prev");
	var object = $('.playing-previous');
	resetPlaying();
	object.addClass('playing');
	generatePrevNext(object);

	if(audioHasNext())
	{
		audioLoadHelper();
		audioPlay();
	}
	else
	{
		audioStop();
		$('#audio-pause').hide();
		$('#audio-play').show();
		$('.audio-title').text('');
		$('.audio-artist').text('');
		selectInit();
	}
}

function audioLoadHelper()
{
	var id = $('.playing .item-id span').text();
	var title = $('.playing .item-title span').text();
	var artist = $('.playing .item-artist span').text();
	var album = $('.playing .item-album span').text()
	var url = $('.playing .item-url span').text();

	if(id == "")
		id = null;

	audioLoad(id, title, artist, album, url);
}

function selectInit()
{
	var object = $('.item-content').first();
	object.addClass('playing');
	generatePrevNext(object);
	audioLoadHelper();
}

function playSelected(object)
{
	resetPlaying();
	object.addClass('playing');
	generatePrevNext(object);
	audioLoadHelper();
	audioPlay();
}

function generatePrevNext(object)
{
	object.prev().addClass('playing-previous');
	object.next().addClass('playing-next');
}

function resetPlaying()
{
	$('.playing').removeClass('playing');
	$('.playing-next').removeClass('playing-next');
	$('.playing-previous').removeClass('playing-previous');
}

function audioLoad(id, title, artist, album, url)
{
	currentSong = new Song(id, title, artist, album, url);
	as[0].load("uploads/" + currentSong.url);
}

function resizeFrameOnResize()
{
	$('#innerplayer').attr('height', ($(window).height() - $('header').height()) - 10)
}

function showNowPlaying()
{
	$(".nowplaying").slideDown("slow");
}

function hideNowPlaying()
{
	$(".nowplaying").slideUp("slow");
}

function showPlaylists()
{
	$(".playlists").slideDown("slow");
}

function hidePlaylists()
{
	$(".playlists").slideUp("slow");
}

function showPlaylistDetails()
{
	$(".playlistDetails").slideDown("slow");
}

function hidePlaylistDetails()
{
	$(".playlistDetails").slideUp("slow");
}

function playlistNav()
{
	hidePlaylistDetails();
	showPlaylists();
}

// var playlist_in_modal = null;

// function assignPlaylistInModal(number)
// {
// 	playlist_in_modal = number;
// }

// function getPlaylistInModal()
// {
// 	return playlist_in_modal;
// }