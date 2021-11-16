import { Playlist } from "./playlist";
import { SavedSong } from "./savedsong";
import { UserRole } from "./userrole";

export class User{
    id: number;
    username: string;
    email: string;
    password: string;
    playlists: Playlist[];
    savedSongs: SavedSong[];
    userRoles: UserRole[];

  constructor(
    id: number, 
    username: string, 
    email: string, 
    password: string, 
    playlists: Playlist[], 
    savedSongs: SavedSong[], 
    userRoles: UserRole[]
) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.playlists = playlists
    this.savedSongs = savedSongs
    this.userRoles = userRoles
  }

}