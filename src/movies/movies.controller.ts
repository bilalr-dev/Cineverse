import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  createMovie(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @Get()
  async findAll(
    @Query('title') title?: string,
    @Query() paginationQuery?: PaginationQueryDto,
  ) {
    // If title is provided, search by title
    if (title) {
      const movie = await this.moviesService.findOneByTitle(title);
      if (!movie) throw new NotFoundException('Movie not found!');
      return movie;
    }
    // Otherwise, return all movies with pagination
    const query: PaginationQueryDto = {
      limit: paginationQuery?.limit ?? 10,
      offset: paginationQuery?.offset ?? 0,
    };
    return this.moviesService.findAll(query);
  }

  @Get('/:id')
  async findMovie(@Param('id') id: string) {
    const movie = await this.moviesService.findOne(parseInt(id));
    if (!movie) throw new NotFoundException('Movie not found!');
    return movie;
  }
}
