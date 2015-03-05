var audiojsplayer;
var as;

var playlist;
var playlistItemIndex;

$(document).ready(function()
{
	$('.modal-trigger').leanModal();
	$('.parallax').parallax();
	$('.button-collapse').sideNav();
	$('select').material_select();
	$('#audio-pause').hide();
	resizeFrameOnResize();
	audiojsplayer = document.getElementById('audiojsplayer');
})

audiojs.events.ready(function()
{
	audioInit(0);
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
	playlist = [];
	playlistItemIndex = 0;
	as = audiojs.createAll(
		{
			trackEnded: function()
			{
				if(playlist.length > 0)
				{
					if(playlistItemIndex < playlist.length - 1)
					{
						playlistItemIndex++;
						audiojsplayer.load(playlist.songs[playlistItemIndex].url);
						audiojsplayer.play();
					}
				}
			}
		});
}

function audioPlay()
{
	if(playlist.length > 0)
	{
		if(audiojsplayer.paused)
		{
			audiojsplayer.play();
			$('#audio-pause').show();
			$('#audio-play').hide();
		}
		else
		{ 
			audiojsplayer.pause();
			$('#audio-pause').hide();
			$('#audio-play').show();
		}
	}	
}

function audioSetPlaylist(playlistParam)
{
	playlist = playlistParam;
	console.log(playlist);
}

function audioSetPlaylistIndex(index)
{
	playlistItemIndex = index;
	console.log(playlistItemIndex);
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