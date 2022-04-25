/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Args, Mutation, Context } from '@nestjs/graphql';
import { ICommandBus, IQueryBus, Jwt, Timezone, Utils } from 'aurora-ts-core';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '../../../../@apps/iam/account/application/create/create-account.command';
import { IamAccountType, IamCreateAccountInput } from './../../../../graphql';

// ---- customizations ----
import { JwtService } from '@nestjs/jwt';
import { AccessTokenService } from '../../../../@apps/iam/shared/o-auth/domain/access-token/access-token.service';
import { ClientService } from '../../../../@apps/iam/shared/o-auth/domain/client/client.service';
import { GetRolesQuery } from '../../../../@apps/iam/role/application/get/get-roles.query';
import { CreateUserCommand } from '../../../../@apps/iam/user/application/create/create-user.command';
import { AccountHelper } from '../../../../@apps/iam/account/domain/account.helper';

@Resolver()
export class IamCreateAccountResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
        private readonly jwtService: JwtService,
        private readonly accessTokenService: AccessTokenService,
        private readonly clientService: ClientService,
    ) {}

    @Mutation('iamCreateAccount')
    async main(
        @Args('payload') payload: IamCreateAccountInput,
        @Context() context,
        @Timezone() timezone?: string,
    )
    {
        // get token from Headers
        const jwt = <Jwt>this.jwtService.decode(context.req.headers.authorization.replace('Bearer ', ''));

        // get access token from database
        const accessToken = await this.accessTokenService.findAccessTokenById(jwt.jit);

        // get client to get applications related
        const client = await this.clientService.findClient({
            where: {
                id: payload.type === IamAccountType.SERVICE ? payload.clientId : accessToken.clientId
            },
            include: ['applications'],
        });

        // get roles
        const roles = await this.queryBus.ask(new GetRolesQuery({
            where: {
                id: payload.roleIds,
            },
            include: ['permissions'],
        }));

        await this.commandBus.dispatch(new CreateAccountCommand(
            {
                id               : payload.id,
                type             : payload.type,
                email            : payload.email,
                isActive         : payload.isActive,
                clientId         : accessToken.clientId,
                dApplicationCodes: client.applications.map(application => application.code),
                dPermissions     : AccountHelper.createPermissions(roles),
                data             : payload.data,
                roleIds          : payload.roleIds,
                tenantIds        : payload.tenantIds,
            },
        ));

        if (payload.type === IamAccountType.USER)
        {
            await this.commandBus.dispatch(new CreateUserCommand(
                {
                    id           : Utils.uuid(),
                    accountId    : payload.id,
                    name         : payload.user.name,
                    surname      : payload.user.surname,
                    avatar       : payload.user.avatar,
                    mobile       : payload.user.mobile,
                    langId       : payload.user.langId,
                    username     : payload.user.username,
                    password     : payload.user.password,
                    rememberToken: payload.user.rememberToken,
                    data         : payload.user.data,
                }, { timezone },
            ));
        }

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}