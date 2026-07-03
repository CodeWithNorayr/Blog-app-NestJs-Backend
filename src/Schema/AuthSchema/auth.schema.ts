import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "../PostSchema/post.schema";


@Schema({timestamps: true})
export class Auth {

@Prop({required: true})
firstname: string

@Prop({required: true})
lastname: string

@Prop({required: true, unique:true})
email: string

@Prop({required: true})
password: string

@Prop({required: false})
bio?: string

@Prop({required: false})
date_of_birth?: Date

@Prop({required: false})
hobbies?: string

@Prop({required: false})
married?: boolean

}

export const AuthSchema = SchemaFactory.createForClass(Auth);