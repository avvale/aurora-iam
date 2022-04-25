/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { GetBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/get/get-bounded-contexts.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts/get')
export class IamGetBoundedContextsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get bounded-contexts according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [BoundedContextDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}