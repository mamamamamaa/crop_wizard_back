import * as mongoose from 'mongoose';
export declare const DATABASE_PROVIDE = "DATABASE_CONNECTION";
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<typeof mongoose>;
}[];
