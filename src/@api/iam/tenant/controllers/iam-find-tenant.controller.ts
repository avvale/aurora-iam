/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { FindTenantQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
export class IamFindTenantController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find tenant according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: TenantDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement, constraint, { timezone }));
    }
}