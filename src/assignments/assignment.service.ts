import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientGrpc } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import {
  ASSIGNMENT_SERVICE_NAME,
  DeleteAssignmentResponse,
  EditAssignmentResponse,
  FindAllAssignmentsResponse,
  FindOneAssignmentResponse,
} from './proto/assignments.pb';
import {
  CreateAssignmentRequest,
  CreateAssignmentResponse,
} from './proto/assignments.pb';
import { Assignment } from './entities/assignment.entity';
import {
  CreateAssignmentRequestDto,
  DeleteAssignmentRequestDto,
  EditAssignmentRequestDto,
  FindOneAssignmentRequestDto,
} from './assignment.dto';
import { Empty } from './proto/google/protobuf/empty.pb';

@Injectable()
export class AssignmentService implements OnModuleInit {
  private productSvc: AssignmentService;

  @Inject(ASSIGNMENT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  @InjectRepository(Assignment)
  private readonly repository: Repository<Assignment>;

  public onModuleInit(): void {
    this.productSvc = this.client.getService<AssignmentService>(
      ASSIGNMENT_SERVICE_NAME,
    );
  }

  public async createAssignment(
    payload: CreateAssignmentRequestDto,
  ): Promise<CreateAssignmentResponse> {
    const assignment: Assignment = new Assignment();

    assignment.title = payload.title;
    assignment.deadline = payload.deadline;
    assignment.description = payload.description;
    assignment.idStudents = payload.idStudents;
    assignment.idTeacher = payload.idTeacher;

    await this.repository.save(assignment);

    return {
      ...assignment,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async updateAssignment(
    payload: EditAssignmentRequestDto,
  ): Promise<EditAssignmentResponse> {
    const assignment: Assignment = await this.repository.findOne({
      where: { id: payload.id },
    });

    assignment.title = payload.title;
    assignment.description = payload.description;
    assignment.deadline = payload.deadline;
    assignment.idStudents = payload.idStudents;
    assignment.idTeacher = payload.idTeacher;

    await this.repository.save(assignment);

    return {
      ...assignment,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async deleteAssignment(
    payload: DeleteAssignmentRequestDto,
  ): Promise<DeleteAssignmentResponse> {
    const assignment = this.repository.delete({ id: payload.id });

    if (!assignment) {
      return {
        error: ['Assignment not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      error: [],
      status: HttpStatus.OK,
    };
  }

  public async findOne({
    id,
  }: FindOneAssignmentRequestDto): Promise<FindOneAssignmentResponse> {
    const assignment: Assignment = await this.repository.findOne({
      where: { id },
    });

    if (!assignment) {
      return {
        id: id,
        deadline: null,
        description: null,
        courseName: null,
        title: null,
        idStudents: [],
        idTeacher: null,
        error: ['Product not found'],
        status: HttpStatus.NOT_FOUND,
      };
    }

    return {
      id: id,
      ...assignment,
      error: null,
      status: HttpStatus.OK,
    };
  }

  public async findAll(): Promise<FindAllAssignmentsResponse> {
    const assignments: Assignment[] = await this.repository.find();

    return {
      assignments,
      error: null,
      status: HttpStatus.OK,
    };
  }
}
