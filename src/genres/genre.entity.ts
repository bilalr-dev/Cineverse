import { Movie } from 'src/movies/movie.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted Genre with id: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Genre with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed Genre with id: ${this.id}`);
  }
}
