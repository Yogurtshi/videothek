import { Media } from './media';

export class Comment {
  public id!: number;
  public commentText = '';
  public username = '';
  public media?: Media;
}