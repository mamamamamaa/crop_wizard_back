import { Document } from 'mongoose';

export interface ImageInterface extends Document {
  readonly fileName: string;
  readonly url: string;
  readonly publicId: string;
  readonly owner: string;
}
