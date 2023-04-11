import { IsNotEmpty } from 'class-validator';

export class CreateImageDto {
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  fileName: string;
  @IsNotEmpty()
  owner: string;
  @IsNotEmpty()
  publicId: string;
}
