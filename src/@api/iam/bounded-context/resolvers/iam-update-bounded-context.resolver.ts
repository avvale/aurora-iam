import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { UpdateBoundedContextCommand } from '../../../../@apps/iam/bounded-context/application/update/update-bounded-context.command';
import { IamUpdateBoundedContextInput } from './../../../../graphql';

@Resolver()
export class IamUpdateBoundedContextResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamUpdateBoundedContext')
    async main(
        @Args('payload') payload: IamUpdateBoundedContextInput,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateBoundedContextCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindBoundedContextByIdQuery(payload.id, constraint, { timezone }));
    }
}