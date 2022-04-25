/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { RoleDto } from './../dto/role.dto';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';

@ApiTags('[iam] role')
@Controller('iam/role/find')
export class IamFindRoleByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find role by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: RoleDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return this.queryBus.ask(new FindRoleByIdQuery(id, constraint, { timezone }));
    }
}