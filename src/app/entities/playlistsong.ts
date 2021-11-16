import { Playlist } from "./playlist";
import { PlaylistSongId } from "./playlistsongid";
import { Song } from "./song";

export class PlaylistSong {
    id: PlaylistSongId;
    playlist: Playlist;
    song: Song;

  constructor(id: PlaylistSongId, playlist: Playlist, song: Song) {
    this.id = id
    this.playlist = playlist
    this.song = song
  }

}