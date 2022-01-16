/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateTenantDto } from './../dto/create-tenant.dto';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '../../../../@apps/iam/tenant/application/create/create-tenant.command';

@ApiTags('[iam] tenant')
@Controller('iam/tenant')
export class IamCreateTenantController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create tenant' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: TenantDto })
    async main(
        @Body() payload: CreateTenantDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}