import { Artist } from "./artist";
import { SongDetails } from "./songdetails";

export class Song{
    id: number;
    title: string;
    imageUrl: string | ArrayBuffer;
    artist: Artist;
    songDetails: SongDetails;
    songUrl: string;

  constructor(
    id: number,
    title: string,
    imageUrl: string,
    artist: Artist,
    songDetails: SongDetails,
    songUrl: string
  ) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.artist = artist
    this.songDetails = songDetails
    this.songUrl = songUrl;
  }

    }
