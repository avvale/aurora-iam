import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { RoleDto } from './../dto/role.dto';
import { CreateRoleDto } from './../dto/create-role.dto';

// @apps
import { CreateRolesCommand } from '../../../../@apps/iam/role/application/create/create-roles.command';

@ApiTags('[iam] role')
@Controller('iam/roles')
export class IamCreateRolesController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create roles in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [RoleDto] })
    @ApiBody({ type: [CreateRoleDto] })
    async main(
        @Body() payload: CreateRoleDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRolesCommand(payload, { timezone }));
    }
}