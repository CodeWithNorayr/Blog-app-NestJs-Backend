import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Auth } from 'src/Schema/AuthSchema/auth.schema';
import { CreateAuthDto } from 'src/dto/authDto/auth.dto';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common/exceptions';
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto } from 'src/dto/authDto/authLogin.dto';
import { AuthUpdateDto } from 'src/dto/authDto/authUpdate.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private readonly authSchema: Model<Auth>, private readonly jwtService: JwtService) { }

  async authRegister(createAuthDto: CreateAuthDto) {
    const existingAuth = await this.authSchema.findOne({ email: createAuthDto.email });
    if (existingAuth) throw new BadRequestException("User already exits");

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const auth = await this.authSchema.create({
      ...createAuthDto,
      password: hashedPassword
    })

    const payload = {
      sub: auth._id,
      firstname: auth.firstname
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      id: auth._id,
      firstname: auth.firstname,
      lastname: auth.lastname,
      email: auth.email,
      bio: auth.bio,
      date_of_birth: auth.date_of_birth,
      married: auth.married,
      hobbies: auth.hobbies,
      access_token: token
    }
  }

  async authSignIn(authLoginDto: AuthLoginDto) {
    const authExisting = await this.authSchema.findOne({
      email: authLoginDto.email
    })

    if (!authExisting) throw new NotFoundException("User is not found");

    const isMAtching = await bcrypt.compare(authLoginDto.password, authExisting.password);

    if (!isMAtching) throw new UnauthorizedException("Unauthorized access");

    const payload = {
      sub: authExisting._id,
      firstname: authExisting.firstname
    }

    const token = await this.jwtService.signAsync(payload);

    return {
      id: authExisting._id,
      firstname: authExisting.firstname,
      lastname: authExisting.lastname,
      email: authExisting.email,
      bio: authExisting.bio,
      date_of_birth: authExisting.date_of_birth,
      married: authExisting.married,
      hobbies: authExisting.hobbies,
      access_token: token
    }
  }

  async findAuthById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }

    const auth = await this.authSchema.findById(id).select("-password").exec();
    if (!auth) throw new NotFoundException("User is not found");

    return auth
  }

  async findAuthByIdAndDelete(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException("Id is invalid");
    }

    const deletedUser = await this.authSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new NotFoundException("User is not found");
    }

    return deletedUser
  }

  async findAuthByIdAndUpdate(id: string, authUpdateDto: AuthUpdateDto) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException("Invalid Id");
    }

    if (authUpdateDto.password) {
      authUpdateDto.password = await bcrypt.hash(authUpdateDto.password, 10);
    }

    const updatedAuth = await this.authSchema.findByIdAndUpdate(id, { $set: authUpdateDto }, { new: true, runValidators: true })

    if (!updatedAuth) {
      throw new NotFoundException("User is not found");
    }

    return updatedAuth;
  }
}
