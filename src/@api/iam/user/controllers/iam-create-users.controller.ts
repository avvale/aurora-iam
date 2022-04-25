/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

// @apps
import { CreateUsersCommand } from '../../../../@apps/iam/user/application/create/create-users.command';

@ApiTags('[iam] user')
@Controller('iam/users/create')
export class IamCreateUsersController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create users in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [UserDto] })
    @ApiBody({ type: [CreateUserDto] })
    async main(
        @Body() payload: CreateUserDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateUsersCommand(payload, { timezone }));
    }
}