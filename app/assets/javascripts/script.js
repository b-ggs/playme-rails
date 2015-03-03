$(document).ready(function()
{
	$('.modal-trigger').leanModal();
	$('.parallax').parallax();
	$('.button-collapse').sideNav();
	$('select').material_select();
	resizeFrameOnResize();
})

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