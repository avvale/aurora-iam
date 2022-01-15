import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class IamFindBoundedContextByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: BoundedContextDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));
    }
}