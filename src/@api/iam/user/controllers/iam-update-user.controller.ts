/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateUserDto } from './../dto/update-user.dto';
import { UserDto } from './../dto/user.dto';

// @apps
import { UpdateUserCommand } from '../../../../@apps/iam/user/application/update/update-user.command';
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';

@ApiTags('[iam] user')
@Controller('iam/user')
export class IamUpdateUserController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update user' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: UserDto})
    async main(
        @Body() payload: UpdateUserDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateUserCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindUserByIdQuery(payload.id, constraint, { timezone }));
    }
}