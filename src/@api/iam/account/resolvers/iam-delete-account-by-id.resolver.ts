import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { DeleteAccountByIdCommand } from '../../../../@apps/iam/account/application/delete/delete-account-by-id.command';

@Resolver()
export class IamDeleteAccountByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteAccountById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const account = await this.queryBus.ask(new FindAccountByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountByIdCommand(id, constraint, { timezone }));

        return account;
    }
}