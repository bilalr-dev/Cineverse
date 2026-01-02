import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  releaseDate: string;

  @IsUrl()
  poster: string;

  @IsUrl()
  trailerLink: string;

  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  actorIds: number[];

  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  genreIds: number[];
}
