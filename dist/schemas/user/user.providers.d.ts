import { Connection } from 'mongoose';
export declare const USER_PROVIDE = "USER_MODEL";
export declare const userProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    }> & Omit<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
        versionKey: false;
        timestamps: true;
    }>, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    }>> & Omit<import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        email: string;
        password: string;
        accessToken: string;
        verificationToken: string;
        verify: boolean;
        username?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>>;
    inject: string[];
}[];
