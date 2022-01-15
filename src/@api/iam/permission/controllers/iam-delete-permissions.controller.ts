import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '../../../../@apps/iam/permission/application/delete/delete-permissions.command';

@ApiTags('[iam] permission')
@Controller('iam/permissions')
export class IamDeletePermissionsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete permissions in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [PermissionDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatement, constraint, { timezone }));

        return permissions;
    }
}