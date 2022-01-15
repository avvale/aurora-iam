import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindTenantByIdQuery } from '../../../../@apps/iam/tenant/application/find/find-tenant-by-id.query';
import { CreateTenantCommand } from '../../../../@apps/iam/tenant/application/create/create-tenant.command';
import { IamCreateTenantInput } from './../../../../graphql';

@Resolver()
export class IamCreateTenantResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateTenant')
    async main(
        @Args('payload') payload: IamCreateTenantInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateTenantCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindTenantByIdQuery(payload.id, {}, { timezone }));
    }
}