import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { CreateBoundedContextCommand } from '../../../../@apps/iam/bounded-context/application/create/create-bounded-context.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class IamCreateBoundedContextController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-context' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    async main(
        @Body() payload: CreateBoundedContextDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateBoundedContextCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, {}, { timezone }));
    }
}