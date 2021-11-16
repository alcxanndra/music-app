import { SavedSongId } from "./savedsongid";
import { Song } from "./song";
import { User } from "./user";

export class SavedSong {
    id: SavedSongId;
    user: User;
    song: Song;


  constructor(id: SavedSongId, user: User, song: Song) {
    this.id = id
    this.user = user
    this.song = song
  }

}