import { Status } from "../enum/status.enum";

export interface Book{
    id: number;
    title: String;
    author: String;
    bookGenre: String;
    releaseYear: String;
    imageUrl: String;
    status: Status;
}