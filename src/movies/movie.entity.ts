import { Genre } from 'src/genres/genre.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../actors/actor.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column()
  poster: string;

  @Column()
  trailerLink: string;

  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable()
  actors: Actor[];

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable()
  genres: Genre[];

  @OneToMany(() => Review, review => review.movie)
  reviews: Review[];
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Movie with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Movie with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Movie with id: ${this.id}`);
  }
}
