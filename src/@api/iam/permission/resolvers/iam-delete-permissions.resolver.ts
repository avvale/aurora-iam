import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';
import { DeletePermissionsCommand } from '../../../../@apps/iam/permission/application/delete/delete-permissions.command';

@Resolver()
export class IamDeletePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeletePermissions')
    async main(
        @Args('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const permissions = await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionsCommand(queryStatement, constraint, { timezone }));

        return permissions;
    }
}