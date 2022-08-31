import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';
import { IsEmail, MinLength } from 'class-validator';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { nullable: false })
  @IsEmail()
  email: string;

  @Field()
  @Column('text', { nullable: false })
  @MinLength(4, {
    message: 'Title is too short',
  })
  password: string;

  @Column('int', { default: 0 })
  tokenVersion: number;
}
