/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '../../../../@apps/iam/tenant/application/delete/delete-tenants.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/delete')
export class IamDeleteTenantsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete tenants in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [TenantDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement, constraint, { timezone }));

        return tenants;
    }
}