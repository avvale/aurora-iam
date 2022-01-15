import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindUserByIdQuery } from '../../../../@apps/iam/user/application/find/find-user-by-id.query';
import { DeleteUserByIdCommand } from '../../../../@apps/iam/user/application/delete/delete-user-by-id.command';

@Resolver()
export class IamDeleteUserByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeleteUserById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const user = await this.queryBus.ask(new FindUserByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteUserByIdCommand(id, constraint, { timezone }));

        return user;
    }
}