/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';

// @apps
import { GetUsersQuery } from '../../../../@apps/iam/user/application/get/get-users.query';
import { DeleteUsersCommand } from '../../../../@apps/iam/user/application/delete/delete-users.command';

@ApiTags('[iam] user')
@Controller('iam/users/delete')
export class IamDeleteUsersController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete users in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [UserDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const users = await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteUsersCommand(queryStatement, constraint, { timezone }));

        return users;
    }
}