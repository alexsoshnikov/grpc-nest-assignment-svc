import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentController } from './assignment.controller';
import { Assignment } from './entities/assignment.entity';
import { AssignmentService } from './assignment.service';
import {
  ASSIGNMENT_PACKAGE_NAME,
  ASSIGNMENT_SERVICE_NAME,
} from './proto/assignments.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ASSIGNMENT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: ASSIGNMENT_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/assignments.proto',
        },
      },
    ]),
    TypeOrmModule.forFeature([Assignment]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
})
export class AssignmentModule {}
