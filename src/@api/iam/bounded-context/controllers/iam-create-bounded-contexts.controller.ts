import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';
import { CreateBoundedContextDto } from './../dto/create-bounded-context.dto';

// @apps
import { CreateBoundedContextsCommand } from '../../../../@apps/iam/bounded-context/application/create/create-bounded-contexts.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-contexts')
export class IamCreateBoundedContextsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create bounded-contexts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [BoundedContextDto] })
    @ApiBody({ type: [CreateBoundedContextDto] })
    async main(
        @Body() payload: CreateBoundedContextDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload, { timezone }));
    }
}