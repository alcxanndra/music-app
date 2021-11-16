import { PlaylistSong } from "./playlistsong";
import { User } from "./user";

export class Playlist {
    id: number;
    user: User;
    title: string;
    playlistSongs: PlaylistSong[];


  constructor(
    id: number, 
    user: User, 
    title: string, 
    playlistSongs: PlaylistSong[]
) {
    this.id = id
    this.user = user
    this.title = title
    this.playlistSongs = playlistSongs
  }

}