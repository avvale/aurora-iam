import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindBoundedContextQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class IamFindBoundedContextResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindBoundedContext')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return await this.queryBus.ask(new FindBoundedContextQuery(queryStatement, constraint, { timezone }));
    }
}