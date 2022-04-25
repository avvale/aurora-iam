/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';

@ApiTags('[iam] permission')
@Controller('iam/permissions/get')
export class IamGetPermissionsController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get permissions according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [PermissionDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));
    }
}