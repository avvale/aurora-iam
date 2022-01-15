import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/get/get-bounded-contexts.query';
import { DeleteBoundedContextsCommand } from '../../../../@apps/iam/bounded-context/application/delete/delete-bounded-contexts.command';

@Resolver()
export class IamDeleteBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const boundedContexts = await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteBoundedContextsCommand(queryStatement, constraint, { timezone }));

        return boundedContexts;
    }
}