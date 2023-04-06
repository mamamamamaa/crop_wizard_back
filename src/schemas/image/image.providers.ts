import { Connection } from 'mongoose';
import { ImageSchema } from './image.schema';
import { DATABASE_PROVIDE } from '../../database/database.providers';

export const IMAGE_PROVIDE = 'IMAGE_MODEL';

export const imageProviders = [
  {
    provide: IMAGE_PROVIDE,
    useFactory: (connection: Connection) =>
      connection.model('image', ImageSchema),
    inject: [DATABASE_PROVIDE],
  },
];
