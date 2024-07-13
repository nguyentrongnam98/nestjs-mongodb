import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsEmail, ValidateNested } from 'class-validator';
import { ProductDto } from 'src/product/product.dto';
export class UserSettingDto {
  @IsNotEmpty()
  receiveNotifications: boolean;

  @IsNotEmpty()
  receiveEmails: boolean;

  @IsNotEmpty()
  receiveSMS: boolean;
}
export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @Optional()
  @ValidateNested()
  @Type(() => UserSettingDto)
  settings: UserSettingDto;

  @Optional()
  product: ProductDto;
}
