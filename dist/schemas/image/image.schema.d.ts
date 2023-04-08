import * as mongoose from 'mongoose';
export declare const ImageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    versionKey: false;
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    owner: mongoose.Types.ObjectId;
    fileName?: string;
    url?: string;
    publicId?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    owner: mongoose.Types.ObjectId;
    fileName?: string;
    url?: string;
    publicId?: string;
}>> & Omit<mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    owner: mongoose.Types.ObjectId;
    fileName?: string;
    url?: string;
    publicId?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
