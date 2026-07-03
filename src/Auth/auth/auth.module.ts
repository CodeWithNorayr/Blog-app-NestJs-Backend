import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/Schema/AuthSchema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants/auth.constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" }
    }),
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: AuthSchema
      }
    ])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule { }
