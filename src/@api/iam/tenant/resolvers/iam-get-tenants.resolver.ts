import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
export class IamGetTenantsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamTenant[]>
    {
        return await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));
    }
}