/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/get')
export class IamGetTenantsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get tenants according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [TenantDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));
    }
}