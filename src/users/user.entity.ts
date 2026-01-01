import { Review } from 'src/reviews/review.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id ${this.id}`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User with id ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id ${this.id}`);
  }
}
