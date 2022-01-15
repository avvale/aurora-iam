import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { DeleteTenantByIdCommand } from '../../../../@apps/iam/tenant/application/delete/delete-tenant-by-id.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class IamDeleteTenantByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete tenant by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: TenantDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenant = await this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantByIdCommand(id, constraint, { timezone }));

        return tenant;
    }
}