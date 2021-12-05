import { Playlist } from "./playlist";
import { SavedSong } from "./savedsong";
import { UserRole } from "./userrole";

export class User{
    id: number;
    username: string;
    name: string;
    url: string;
    description: string;
    location: string;
    email: string;
    profilePicture: string;
    password: string;
    playlists: Playlist[];
    savedSongs: SavedSong[];
    userRoles: UserRole[];

  constructor(
    id: number, 
    username: string, 
    name: string, 
    description: string,
    url: string,
    location: string,
    email: string, 
    profilePicture: string,
    password: string, 
    playlists: Playlist[], 
    savedSongs: SavedSong[], 
    userRoles: UserRole[]
) {
    this.id = id
    this.username = username
    this.name = name
    this.url = url
    this.description = description
    this.location = location
    this.email = email
    this.profilePicture = profilePicture
    this.password = password
    this.playlists = playlists
    this.savedSongs = savedSongs
    this.userRoles = userRoles
  }

}