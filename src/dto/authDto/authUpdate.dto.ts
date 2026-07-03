import { IsString, IsBoolean, IsOptional, IsEmail, IsDateString }  from "class-validator"

export class AuthUpdateDto {
  
  @IsOptional()
  @IsString()
  firstname?: string

  @IsOptional()
  @IsString()
  lastname?: string
  
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string
  
  @IsOptional()
  @IsString()
  password?: string
  
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