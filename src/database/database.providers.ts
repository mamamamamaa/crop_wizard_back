import * as mongoose from 'mongoose';
import * as process from 'process';

const { DB } = process.env;
export const DATABASE_PROVIDE = 'DATABASE_CONNECTION';
export const databaseProviders = [
  {
    provide: DATABASE_PROVIDE,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(DB),
  },
];
