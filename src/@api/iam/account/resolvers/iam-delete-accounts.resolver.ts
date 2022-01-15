import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetAccountsQuery } from '../../../../@apps/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '../../../../@apps/iam/account/application/delete/delete-accounts.command';

@Resolver()
export class IamDeleteAccountsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteAccounts')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement, constraint, { timezone }));

        return accounts;
    }
}