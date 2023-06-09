import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly accessToken: string;
  readonly verificationToken: string;
  readonly verify: boolean;
  readonly avatarUrl: string;
}

export interface RegisterUser {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly verificationToken?: string;
  readonly verify?: boolean;
  readonly avatarUrl: string;
}

export interface OptionalUserFields {
  readonly username?: string;
  readonly email?: string;
  readonly password?: string;
  readonly accessToken?: string;
  readonly verificationToken?: string;
  readonly verify?: boolean;
  readonly avatarUrl?: string;
}
