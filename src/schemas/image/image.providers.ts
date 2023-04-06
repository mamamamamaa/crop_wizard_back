import { Connection } from 'mongoose';
import { ImageSchema } from './image.schema';

export const imageProviders = [
  {
    provide: 'IMAGE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('image', ImageSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
