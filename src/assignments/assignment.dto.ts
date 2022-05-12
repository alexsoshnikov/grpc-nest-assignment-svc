import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  CreateAssignmentRequest,
  DeleteAssignmentRequest,
  EditAssignmentRequest,
  FindOneAssignmentRequest,
} from './proto/assignments.pb';

export class CreateAssignmentRequestDto implements CreateAssignmentRequest {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNumber({}, { each: true })
  public idStudents: number[];

  @IsNotEmpty()
  @IsString()
  public courseName: string;

  @IsNumber()
  public idTeacher: number;

  @IsDate()
  public deadline: string;
}

export class EditAssignmentRequestDto implements EditAssignmentRequest {
  @IsNumber()
  public id: number;

  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsNumber({}, { each: true })
  public idStudents: number[];

  @IsNotEmpty()
  @IsString()
  public courseName: string;

  @IsNumber()
  public idTeacher: number;

  @IsDate()
  public deadline: string;
}

export class DeleteAssignmentRequestDto implements DeleteAssignmentRequest {
  @IsNumber()
  public id: number;
}

export class FindOneAssignmentRequestDto implements FindOneAssignmentRequest {
  @IsNumber()
  public id: number;
}
