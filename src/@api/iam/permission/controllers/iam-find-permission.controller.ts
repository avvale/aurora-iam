import { Controller, Get, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { FindPermissionQuery } from '../../../../@apps/iam/permission/application/find/find-permission.query';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class IamFindPermissionController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Find permission according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: PermissionDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement, constraint, { timezone }));
    }
}