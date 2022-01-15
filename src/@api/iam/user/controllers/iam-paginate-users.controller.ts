import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';

// @apps
import { PaginateUsersQuery } from '../../../../@apps/iam/user/application/paginate/paginate-users.query';

@ApiTags('[iam] user')
@Controller('iam/users/paginate')
export class IamPaginateUsersController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate users' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateUsersQuery(queryStatement, constraint, { timezone }));
    }
}