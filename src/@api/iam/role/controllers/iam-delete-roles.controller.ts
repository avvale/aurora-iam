import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { RoleDto } from './../dto/role.dto';

// @apps
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { DeleteRolesCommand } from '../../../../@apps/iam/role/application/delete/delete-roles.command';

@ApiTags('[iam] role')
@Controller('iam/roles')
export class IamDeleteRolesController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete roles in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [RoleDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const roles = await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRolesCommand(queryStatement, constraint, { timezone }));

        return roles;
    }
}