/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Query } from '@nestjs/graphql';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { IamRole } from './../../../../graphql';

@Resolver()
export class IamGetRolesResolver
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Query('iamGetRoles')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    ): Promise<IamRole[]>
    {
        return await this.queryBus.ask(new GetRolesQuery(queryStatement, constraint, { timezone }));
    }
}