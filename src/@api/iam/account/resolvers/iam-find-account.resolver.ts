/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAccountQuery } from '../../../../@apps/iam/account/application/find/find-account.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class IamFindAccountResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindAccount')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return await this.queryBus.ask(new FindAccountQuery(queryStatement, constraint, { timezone }));
    }
}