import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { PaginateAccountsQuery } from '../../../../@apps/iam/account/application/paginate/paginate-accounts.query';
import { Pagination } from './../../../../graphql';

@Resolver()
export class IamPaginateAccountsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamPaginateAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateAccountsQuery(queryStatement, constraint, { timezone }));
    }
}