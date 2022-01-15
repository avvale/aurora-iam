import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class IamGetPermissionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetPermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission[]>
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));
    }
}