import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class IamPaginateBoundedContextsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamPaginateBoundedContexts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}