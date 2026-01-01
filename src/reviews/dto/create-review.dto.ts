import { Type } from 'class-transformer';
import { IsIn, IsInt, IsString } from 'class-validator';

export class CreateReviewDto {
  @Type(() => Number)
  @IsInt()
  @IsIn([1, 2, 3, 4, 5])
  rating: number;
  @IsString()
  comment: string;
}
