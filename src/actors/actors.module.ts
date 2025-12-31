import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';

@Module({
  providers: [ActorsService],
  controllers: [ActorsController]
})
export class ActorsModule {}
