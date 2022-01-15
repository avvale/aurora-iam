import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetTenantsQuery } from '../../../../@apps/iam/tenant/application/get/get-tenants.query';
import { DeleteTenantsCommand } from '../../../../@apps/iam/tenant/application/delete/delete-tenants.command';

@Resolver()
export class IamDeleteTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteTenants')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const tenants = await this.queryBus.ask(new GetTenantsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteTenantsCommand(queryStatement, constraint, { timezone }));

        return tenants;
    }
}