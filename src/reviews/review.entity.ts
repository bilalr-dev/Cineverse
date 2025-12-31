import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  review: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted Actor with id: ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Actor with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed Actor with id: ${this.id}`);
  }
}
