import { 
  IsEmail, IsString, IsInt, IsOptional, IsUUID, 
  IsUrl, IsDateString, IsEnum, IsArray, IsObject,
  Min, Max, Length, ValidateNested 
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderDto {}
