$(document).ready(function()
{
	$(".button-collapse").sideNav();
	$('.modal-trigger').leanModal();
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