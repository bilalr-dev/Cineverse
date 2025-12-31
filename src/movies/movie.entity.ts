import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Actor } from '../actors/actor.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  releaseDate: Date;

  @Column()
  poster: string;

  @Column()
  trailerLink: string;

  @ManyToMany(() => Actor, actor => actor.movies)
  @JoinTable()
  actors: Actor[];

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
