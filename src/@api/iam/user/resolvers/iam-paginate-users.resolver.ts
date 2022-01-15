import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateUsersQuery } from '../../../../@apps/iam/user/application/paginate/paginate-users.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class IamPaginateUsersResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamPaginateUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateUsersQuery(queryStatement, constraint, { timezone }));
    }
}