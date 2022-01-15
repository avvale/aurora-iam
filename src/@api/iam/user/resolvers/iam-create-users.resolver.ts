import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateUsersCommand } from '../../../../@apps/iam/user/application/create/create-users.command';
import { IamCreateUserInput } from './../../../../graphql';

@Resolver()
export class IamCreateUsersResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateUsers')
    async main(
        @Args('payload') payload: IamCreateUserInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateUsersCommand(payload, { timezone }));
        return true;
    }
}