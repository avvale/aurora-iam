import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';

// @apps
import { FindPermissionByIdQuery } from '../../../../@apps/iam/permission/application/find/find-permission-by-id.query';
import { DeletePermissionByIdCommand } from '../../../../@apps/iam/permission/application/delete/delete-permission-by-id.command';

@Resolver()
export class IamDeletePermissionByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamDeletePermissionById')
    async main(
        @Args('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const permission = await this.queryBus.ask(new FindPermissionByIdQuery(id, constraint, { timezone }));

        await this.commandBus.dispatch(new DeletePermissionByIdCommand(id, constraint, { timezone }));

        return permission;
    }
}