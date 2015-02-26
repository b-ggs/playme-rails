$(document).ready(function()
{
	$('.modal-trigger').leanModal();
	$('.parallax').parallax();
	$('.button-collapse').sideNav();
})

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