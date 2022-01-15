import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindRoleByIdQuery } from '../../../../@apps/iam/role/application/find/find-role-by-id.query';
import { CreateRoleCommand } from '../../../../@apps/iam/role/application/create/create-role.command';
import { IamCreateRoleInput } from './../../../../graphql';

@Resolver()
export class IamCreateRoleResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateRole')
    async main(
        @Args('payload') payload: IamCreateRoleInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateRoleCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindRoleByIdQuery(payload.id, {}, { timezone }));
    }
}