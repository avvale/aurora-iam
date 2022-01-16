/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '../../../../@apps/iam/permission/application/delete/delete-permission-by-id.command';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class IamDeletePermissionByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete permission by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: PermissionDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id, constraint, { timezone }));

        return permission;
    }
}