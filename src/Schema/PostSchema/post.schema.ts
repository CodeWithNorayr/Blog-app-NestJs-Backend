import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { Types } from "mongoose"
import { Auth } from "../AuthSchema/auth.schema"

@Schema()
export class Post {

  @Prop()
  title: string

  @Prop()
  content: string

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Auth.name, required: true})
  author: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);

