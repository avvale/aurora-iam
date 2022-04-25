/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { RoleDto } from './../dto/role.dto';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { DeleteRoleByIdCommand } from '../../../../@apps/iam/role/application/delete/delete-role-by-id.command';

@ApiTags('[iam] role')
@Controller('iam/role/delete')
export class IamDeleteRoleByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete role by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: RoleDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const role = await this.queryBus.ask(new FindRoleByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteRoleByIdCommand(id, constraint, { timezone }));

        return role;
    }
}