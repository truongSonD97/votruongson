import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { ResourceType } from '../models/Resource';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsEnum(ResourceType)
  @IsOptional()
  type?: ResourceType

}

export class UpdatedResourceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsEnum(ResourceType)
  @IsOptional()
  type?: ResourceType

}


