import * as mongoose from 'mongoose';

export const DATABASE_PROVIDE = 'DATABASE_CONNECTION';
export const databaseProviders = [
  {
    provide: DATABASE_PROVIDE,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(process.env.DB),
  },
];
