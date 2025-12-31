import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  genre: string;

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
