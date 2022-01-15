import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateRoleDto } from './../dto/create-role.dto';
import { RoleDto } from './../dto/role.dto';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '../../../../@apps/iam/role/application/create/create-role.command';

@ApiTags('[iam] role')
@Controller('iam/role')
export class IamCreateRoleController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create role' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: RoleDto })
    async main(
        @Body() payload: CreateRoleDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRoleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, {}, { timezone }));
    }
}