import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '../../../../@apps/iam/account/application/create/create-account.command';
import { IamCreateAccountInput } from './../../../../graphql';

@Resolver()
export class IamCreateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreateAccount')
    async main(
        @Args('payload') payload: IamCreateAccountInput,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAccountCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}