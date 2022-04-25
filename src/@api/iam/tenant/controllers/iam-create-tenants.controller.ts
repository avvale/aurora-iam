/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';
import { CreateTenantDto } from './../dto/create-tenant.dto';

// @apps
import { CreateTenantsCommand } from '../../../../@apps/iam/tenant/application/create/create-tenants.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenants/create')
export class IamCreateTenantsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenants in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [TenantDto] })
    @ApiBody({ type: [CreateTenantDto] })
    async main(
        @Body() payload: CreateTenantDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload, { timezone }));
    }
}