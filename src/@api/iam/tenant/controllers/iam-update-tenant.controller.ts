import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateTenantDto } from './../dto/update-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { UpdateTenantCommand } from '../../../../@apps/iam/tenant/application/update/update-tenant.command';
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class IamUpdateTenantController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update tenant' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: TenantDto})
    async main(
        @Body() payload: UpdateTenantDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateTenantCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, constraint, { timezone }));
    }
}