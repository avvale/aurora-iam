/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AccountDto } from './../dto/account.dto';

// @apps
import { FindAccountQuery } from '../../../../@apps/iam/account/application/find/find-account.query';

@ApiTags('[iam] account')
@Controller('iam/account')
export class IamFindAccountController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find account according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccountDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAccountQuery(queryStatement, constraint, { timezone }));
    }
}