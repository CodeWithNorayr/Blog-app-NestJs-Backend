import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from './Auth/post/post/post.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://norayrbabayann_db_user:SnIg07zWyDKouKVW@cluster0.dpfpmui.mongodb.net/?appName=Cluster0"), AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

