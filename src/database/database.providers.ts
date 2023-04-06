import * as mongoose from 'mongoose';
import * as process from 'process';

const { DB } = process.env;
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(DB),
  },
];
