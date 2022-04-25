/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { TenantDto } from './../dto/tenant.dto';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';

@ApiTags('[iam] tenant')
@Controller('iam/tenant/find')
export class IamFindTenantByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find tenant by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: TenantDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return this.queryBus.ask(new FindTenantByIdQuery(id, constraint, { timezone }));
    }
}