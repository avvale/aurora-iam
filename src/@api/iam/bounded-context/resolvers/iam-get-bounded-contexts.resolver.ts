import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/get/get-bounded-contexts.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class IamGetBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext[]>
    {
        return await this.queryBus.ask(new GetBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}