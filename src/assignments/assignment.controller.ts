import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AssignmentService } from './assignment.service';
import {
  ASSIGNMENT_SERVICE_NAME,
  CreateAssignmentResponse,
  DeleteAssignmentResponse,
  EditAssignmentResponse,
  FindAllAssignmentsResponse,
  FindOneAssignmentResponse,
} from './proto/assignments.pb';
import {
  CreateAssignmentRequestDto,
  DeleteAssignmentRequestDto,
  EditAssignmentRequestDto,
  FindOneAssignmentRequestDto,
} from './assignment.dto';

@Controller('order')
export class AssignmentController {
  @Inject(AssignmentService)
  private readonly service: AssignmentService;

  @GrpcMethod(ASSIGNMENT_SERVICE_NAME, 'CreateAssignment')
  private async createAssignment(
    data: CreateAssignmentRequestDto,
  ): Promise<CreateAssignmentResponse> {
    return this.service.createAssignment(data);
  }

  @GrpcMethod(ASSIGNMENT_SERVICE_NAME, 'EditAssignment')
  private async editAssignment(
    data: EditAssignmentRequestDto,
  ): Promise<EditAssignmentResponse> {
    return this.service.updateAssignment(data);
  }

  @GrpcMethod(ASSIGNMENT_SERVICE_NAME, 'DeleteAssignment')
  private async deleteAssignment(
    data: DeleteAssignmentRequestDto,
  ): Promise<DeleteAssignmentResponse> {
    return this.service.deleteAssignment(data);
  }

  @GrpcMethod(ASSIGNMENT_SERVICE_NAME, 'FindOneAssignment')
  private async findOneAssignment(
    data: FindOneAssignmentRequestDto,
  ): Promise<FindOneAssignmentResponse> {
    return this.service.findOne(data);
  }

  @GrpcMethod(ASSIGNMENT_SERVICE_NAME, 'FindAllAssignments')
  private async findAllAssignments(): Promise<FindAllAssignmentsResponse> {
    return this.service.findAll();
  }
}
