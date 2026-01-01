import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor.entity';
import { ActorsController } from './actors.controller';
import { ActorsService } from './actors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor])],
  providers: [ActorsService],
  controllers: [ActorsController],
})
export class ActorsModule {}
