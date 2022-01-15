import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { DeleteBoundedContextByIdCommand } from '../../../../@apps/iam/bounded-context/application/delete/delete-bounded-context-by-id.command';

@Resolver()
export class IamDeleteBoundedContextByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteBoundedContextById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const boundedContext = await this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextByIdCommand(id, constraint, { timezone }));

        return boundedContext;
    }
}