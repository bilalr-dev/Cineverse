import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
    //return all movies with pagination
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(parseInt(id), body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteMovie(@Param('id') id: string) {
    return this.moviesService.remove(parseInt(id));
  }
}
