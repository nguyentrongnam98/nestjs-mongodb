import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  title: string;
  @IsNotEmpty()
  @MaxLength(500)
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
