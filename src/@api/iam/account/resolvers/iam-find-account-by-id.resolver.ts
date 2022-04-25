/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { IamAccount } from './../../../../graphql';

@Resolver()
export class IamFindAccountByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindAccountById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamAccount>
    {
        return this.queryBus.ask(new FindAccountByIdQuery(id, constraint, { timezone }));
    }
}