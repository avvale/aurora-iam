import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { IamPermission } from './../../../../graphql';

@Resolver()
export class IamFindPermissionByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindPermissionById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamPermission>
    {
        return await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));
    }
}