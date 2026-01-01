import { IsArray, IsDateString, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  releaseDate: Date;

  @IsString()
  poster: string;

  @IsUrl()
  trailerLink: string;

  @IsArray()
  @IsInt({ each: true })
  actorIds: number[];

  @IsArray()
  @IsInt({ each: true })
  genreIds: number[];
}
