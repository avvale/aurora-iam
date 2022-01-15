import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { PaginateBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/paginate/paginate-bounded-contexts.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/paginate')
export class IamPaginateBoundedContextsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate bounded-contexts' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}