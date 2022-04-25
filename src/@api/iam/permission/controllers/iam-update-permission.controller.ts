/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdatePermissionDto } from './../dto/update-permission.dto';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { UpdatePermissionCommand } from '../../../../@apps/iam/permission/application/update/update-permission.command';
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';

@ApiTags('[iam] permission')
@Controller('iam/permission/update')
export class IamUpdatePermissionController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update permission' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: PermissionDto})
    async main(
        @Body() payload: UpdatePermissionDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdatePermissionCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, constraint, { timezone }));
    }
}