import { Connection } from 'mongoose';
export declare const IMAGE_PROVIDE = "IMAGE_MODEL";
export declare const imageProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    }, {}, {}, {}, import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    }> & Omit<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").ResolveSchemaOptions<{
        versionKey: false;
        timestamps: true;
    }>, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    }, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    }>> & Omit<import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        owner: import("mongoose").Types.ObjectId;
        fileName?: string;
        url?: string;
        publicId?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>>;
    inject: string[];
}[];
