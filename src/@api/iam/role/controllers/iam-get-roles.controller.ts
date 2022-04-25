/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { RoleDto } from './../dto/role.dto';

// @apps
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';

@ApiTags('[iam] role')
@Controller('iam/roles/get')
export class IamGetRolesController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get roles according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [RoleDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));
    }
}