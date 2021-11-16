import { Artist } from "./artist";
import { SongDetails } from "./songdetails";

export class Album{
    id: number;
    title: string;
    artist: Artist;
    songDetails: SongDetails[];

  constructor(
    id: number,
    title: string,
    artist: Artist,
    songDetails: SongDetails[]
) {
    this.id = id
    this.title = title
    this.artist = artist
    this.songDetails = songDetails
  }

}
