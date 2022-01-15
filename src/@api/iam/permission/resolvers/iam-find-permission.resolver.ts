import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindPermissionQuery } from '../../../../@apps/iam/permission/application/find/find-permission.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class IamFindPermissionResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindPermission')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement, constraint, { timezone }));
    }
}