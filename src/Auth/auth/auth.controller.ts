import { Controller, Post, Body, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/dto/authDto/auth.dto';
import { AuthLoginDto } from 'src/dto/authDto/authLogin.dto';
import { AuthUpdateDto } from 'src/dto/authDto/authUpdate.dto';
import { AuthGuard } from 'src/Guards/AuthGuard/auth.guards';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("auth-registration")
  registration(@Body() craeteAuthDto: CreateAuthDto) {
    return this.authService.authRegister(craeteAuthDto);
  }

  @Post("auth-login")
  authSignIn(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.authSignIn(authLoginDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findAuthById(@Param("id") id: string) {
    return this.authService.findAuthById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(":id")
  findByIdAndUpdate(@Param("id") id: string, @Body() authUpdateDto: AuthUpdateDto) {
    return this.authService.findAuthByIdAndUpdate(id, authUpdateDto)
  }

  @UseGuards(AuthGuard)
  @Delete(":id")
  findByIdAndDelete(@Param("id") id: string) {
    return this.authService.findAuthByIdAndDelete(id);
  }
}
