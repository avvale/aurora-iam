/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateTenantsCommand } from '../../../../@apps/iam/tenant/application/create/create-tenants.command';
import { IamCreateTenantInput } from './../../../../graphql';

@Resolver()
export class IamCreateTenantsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateTenants')
    async main(
        @Args('payload') payload: IamCreateTenantInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantsCommand(payload, { timezone }));
        return true;
    }
}