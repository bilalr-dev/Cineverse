import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private repo: Repository<Movie>) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = this.repo.create(createMovieDto);
    return this.repo.save(movie);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  findOneByTitle(title: string) {
    return this.repo.findOne({
      where: {
        title: Like(`%${title}`),
      },
    });
  }
  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.repo.find({
      skip: offset,
      take: limit,
    });
  }
}
