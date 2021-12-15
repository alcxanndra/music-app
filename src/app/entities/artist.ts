export class Artist{
    id: number;
    name: string;
    imageUrl: string | ArrayBuffer;

  constructor(
    id: number,
    name: string,
    imageUrl: string
) {
    this.id = id
    this.name = name
    this.imageUrl = imageUrl
  }

}
