import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber({}, { message: 'Age must be a number' })
  age;
  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  books: string[];
}
