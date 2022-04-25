/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { DeleteUserByIdCommand } from '../../../../@apps/iam/user/application/delete/delete-user-by-id.command';

@ApiTags('[iam] user')
@Controller('iam/user/delete')
export class IamDeleteUserByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: UserDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteUserByIdCommand(id, constraint, { timezone }));

        return user;
    }
}