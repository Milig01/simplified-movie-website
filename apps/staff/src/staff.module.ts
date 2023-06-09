import { DatabaseModule, RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as Joi from 'joi';
import { StaffController } from './staff.controller';
import { Staff } from './staff.model';
import { StaffService } from './staff.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                RABBIT_MQ_URI: Joi.string().required(),
                RABBIT_MQ_STAFF_QUEUE: Joi.string().required(),
                POSTGRES_URI: Joi.string().required(),
            }),
            envFilePath: './apps/staff/.env',
        }),
        DatabaseModule,
        SequelizeModule.forFeature([Staff]),
        RmqModule,
    ],
    controllers: [StaffController],
    providers: [StaffService],
})
export class StaffModule {}
