import { Album } from "./album";
import { Genre } from "./genre";
import { Producer } from "./producer";
import { Song } from "./song";

export class SongDetails {
    id: number;
    album: Album;
    producer: Producer;
    genre: Genre;
    song: Song;

  constructor(
    id: number, 
    album: Album, 
    producer: Producer, 
    genre: Genre, 
    song: Song
) {
    this.id = id
    this.album = album
    this.producer = producer
    this.genre = genre
    this.song = song
  }

    }