import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { BoundedContextDto } from './../dto/bounded-context.dto';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '../../../../@apps/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';

@ApiTags('[iam] bounded-context')
@Controller('iam/bounded-context')
export class IamDeleteBoundedContextByIdController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete bounded-context by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: BoundedContextDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id, constraint, { timezone }));

        return boundedContext;
    }
}