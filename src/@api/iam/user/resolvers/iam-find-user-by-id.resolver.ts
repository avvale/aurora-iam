/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { IamUser } from './../../../../graphql';

@Resolver()
export class IamFindUserByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindUserById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamUser>
    {
        return this.queryBus.ask(new FindUserByIdQuery(id, constraint, { timezone }));
    }
}