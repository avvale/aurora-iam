import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateBoundedContextsCommand } from '../../../../@apps/iam/bounded-context/application/create/create-bounded-contexts.command';
import { IamCreateBoundedContextInput } from './../../../../graphql';

@Resolver()
export class IamCreateBoundedContextsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateBoundedContexts')
    async main(
        @Args('payload') payload: IamCreateBoundedContextInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateBoundedContextsCommand(payload, { timezone }));
        return true;
    }
}