/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateUserDto } from './../dto/create-user.dto';
import { UserDto } from './../dto/user.dto';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { CreateUserCommand } from '../../../../@apps/iam/user/application/create/create-user.command';

@ApiTags('[iam] user')
@Controller('iam/user/create')
export class IamCreateUserController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: UserDto })
    async main(
        @Body() payload: CreateUserDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateUserCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, {}, { timezone }));
    }
}