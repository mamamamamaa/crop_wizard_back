import { Document } from 'mongoose';

export interface Image extends Document {
  readonly fileName: string;
  readonly url: string;
  readonly publicId: string;
  readonly owner: string;
}
