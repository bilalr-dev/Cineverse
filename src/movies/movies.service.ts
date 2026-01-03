import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.repo.create(createMovieDto);
    return this.repo.save(movie);
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['actors', 'genres', 'reviews'],
    });
  }

  async findOneByTitle(title: string) {
    return this.repo.findOne({
      where: {
        title: Like(`%${title}`),
      },
    });
  }
  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.repo.find({
      skip: offset,
      take: limit,
    });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);
    if (!movie) throw new NotFoundException();

    // Extract actorIds and genreIds to handle separately
    const { actorIds, genreIds, releaseDate, ...rest } = updateMovieDto;

    // assign defined values (exclude undefined)
    Object.keys(rest).forEach(key => {
      if (rest[key] !== undefined) {
        movie[key] = rest[key];
      }
    });

    // Handle releaseDate conversion if provided
    if (releaseDate !== undefined) {
      movie.releaseDate = new Date(releaseDate);
    }

    // TODO: Handle actorIds and genreIds separately (link actors/genres)

    // Save the movie
    await this.repo.save(movie);

    // Reload with relations to return complete object
    return this.findOne(id);
  }

  async remove(id: number) {
    const movie = await this.findOne(id);
    if (!movie) throw new NotFoundException('Movie not found');
    
    await this.repo.remove(movie);
    return { message: 'Movie deleted successfully' };
  }
}
