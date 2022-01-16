/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreateAccountsCommand } from '../../../../@apps/iam/account/application/create/create-accounts.command';
import { IamCreateAccountInput } from './../../../../graphql';

@Resolver()
export class IamCreateAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateAccounts')
    async main(
        @Args('payload') payload: IamCreateAccountInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(payload, { timezone }));
        return true;
    }
}