import { RmqService } from '@app/common';
import { Controller } from '@nestjs/common';
import {
    Ctx,
    MessagePattern,
    Payload,
    RmqContext,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly rmqService: RmqService,
    ) {}

    @MessagePattern('registration')
    async registration(@Payload() dto: CreateUserDto) {
        return await this.authService.registration(dto);
    }

    @MessagePattern('login')
    async login(@Payload() dto: CreateUserDto) {
        return await this.authService.login(dto);
    }

    @MessagePattern('validate_user')
    async handleValidateUser(@Payload() data: any, @Ctx() context: RmqContext) {
        this.rmqService.ack(context);
        return await this.authService.handleValidateUser(data);
    }

    @MessagePattern('validate_user_with_roles')
    async handleValidateUserWithRoles(@Payload() data: any, @Ctx() context: RmqContext) {
        this.rmqService.ack(context);
        return await this.authService.handleValidateUserWithRoles(data);
    }

    @MessagePattern('createSuperUser')
    async createSuperUser(@Payload() dto: CreateUserDto) {
        return await this.authService.createSuperUser(dto);
    }

    @MessagePattern('getUser')
    async getUser(@Payload() id: number) {
        return await this.authService.getUser(id);
    }

    @MessagePattern('googleAuth')
    async googleAuth(@Payload() req: any) {}

    @MessagePattern('googleAuthRedirect')
    async googleAuthRedirect(@Payload() user: any) {
        return await this.authService.googleLogin(user);
    }
}
