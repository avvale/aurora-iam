/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, Pagination, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { PaginateTenantsQuery } from '../../../../@apps/iam/tenant/application/paginate/paginate-tenants.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/paginate')
export class IamPaginateTenantsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate tenants' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new PaginateTenantsQuery(queryStatement, constraint, { timezone }));
    }
}