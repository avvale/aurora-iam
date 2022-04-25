/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindBoundedContextByIdQuery } from '../../../../@apps/iam/bounded-context/application/find/find-bounded-context-by-id.query';
import { IamBoundedContext } from './../../../../graphql';

@Resolver()
export class IamFindBoundedContextByIdResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamFindBoundedContextById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamBoundedContext>
    {
        return this.queryBus.ask(new FindBoundedContextByIdQuery(id, constraint, { timezone }));
    }
}