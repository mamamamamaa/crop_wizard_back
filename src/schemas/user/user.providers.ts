import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';
import { DATABASE_PROVIDE } from '../../database/database.providers';

export const USER_PROVIDE = 'USER_MODEL';

export const userProviders = [
  {
    provide: USER_PROVIDE,
    useFactory: (connection: Connection) =>
      connection.model('user', UserSchema),
    inject: [DATABASE_PROVIDE],
  },
];
