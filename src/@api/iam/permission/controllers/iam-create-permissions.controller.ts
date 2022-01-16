/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { PermissionDto } from './../dto/permission.dto';
import { CreatePermissionDto } from './../dto/create-permission.dto';

// @apps
import { CreatePermissionsCommand } from '../../../../@apps/iam/permission/application/create/create-permissions.command';

@ApiTags('[iam] permission')
@Controller('iam/permissions')
export class IamCreatePermissionsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create permissions in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [PermissionDto] })
    @ApiBody({ type: [CreatePermissionDto] })
    async main(
        @Body() payload: CreatePermissionDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload, { timezone }));
    }
}