import { SongDetails } from "./songdetails";

export class Producer{
    id: number;
    name: string;
    imageUrl: string;
    songDetails: SongDetails[];

  constructor(id: number, name: string, imageUrl: string, songDetails: SongDetails[]) {
    this.id = id
    this.imageUrl = imageUrl
    this.name = name
    this.songDetails = songDetails
  }

}