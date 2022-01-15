import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { FindBoundedContextQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class IamFindBoundedContextController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find bounded-context according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement, constraint, { timezone }));
    }
}