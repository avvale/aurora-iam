import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreatePermissionDto } from './../dto/create-permission.dto';
import { PermissionDto } from './../dto/permission.dto';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { CreatePermissionCommand } from '../../../../@apps/iam/permission/application/create/create-permission.command';

@ApiTags('[iam] permission')
@Controller('iam/permission')
export class IamCreatePermissionController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permission' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: PermissionDto })
    async main(
        @Body() payload: CreatePermissionDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePermissionCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindPermissionByIdQuery(payload.id, {}, { timezone }));
    }
}