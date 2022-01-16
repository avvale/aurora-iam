/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';

// @apps
import { CreatePermissionsCommand } from '../../../../@apps/iam/permission/application/create/create-permissions.command';
import { IamCreatePermissionInput } from './../../../../graphql';

@Resolver()
export class IamCreatePermissionsResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Mutation('iamCreatePermissions')
    async main(
        @Args('payload') payload: IamCreatePermissionInput[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreatePermissionsCommand(payload, { timezone }));
        return true;
    }
}