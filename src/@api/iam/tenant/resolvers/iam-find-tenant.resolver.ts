import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindTenantQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
export class IamFindTenantResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindTenant')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant>
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement, constraint, { timezone }));
    }
}