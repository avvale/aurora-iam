import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetUsersQuery } from '../../../../@apps/iam/user/application/get/get-users.query';
import { IamUser } from './../../../../graphql';

@Resolver()
export class IamGetUsersResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetUsers')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser[]>
    {
        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}