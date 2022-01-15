import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindRoleQuery } from '../../../../@apps/iam/role/application/find/find-role.query';
import { IamRole } from './../../../../graphql';

@Resolver()
export class IamFindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindRole')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatement, constraint, { timezone }));
    }
}