import { Movie } from 'src/movies/movie.entity';
import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  rating: number;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Movie, movie => movie.reviews)
  movie: Movie;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted Review with id: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Review with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed Review with id: ${this.id}`);
  }
}
