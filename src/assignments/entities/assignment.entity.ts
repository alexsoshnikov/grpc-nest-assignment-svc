import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Assignment extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public title!: string;

  @Column({ type: 'varchar' })
  public description!: string;

  @Column({ type: 'simple-array' })
  public idStudents: number[];

  @Column({ type: 'varchar' })
  public courseName!: string;

  @Column({ type: 'integer' })
  public idTeacher!: number;

  @Column({ type: 'datetime' })
  public deadline!: string;
}
