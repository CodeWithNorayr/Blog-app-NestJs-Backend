import { IsString, IsDateString, IsBoolean, IsOptional, IsNotEmpty, IsEmail } from "class-validator"


export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  firstname: string
  
  @IsString()
  @IsNotEmpty()
  lastname: string
  
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string
  
  @IsString()
  @IsNotEmpty()
  password: string
  
  @IsOptional()
  @IsString()
  bio?: string
  
  @IsOptional()
  @IsDateString()
  date_of_birth?: string
  
  @IsOptional()
  @IsBoolean()
  married?: boolean

  @IsOptional()
  @IsString()
  hobbies?: string
}