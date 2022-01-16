/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AccountDto } from './../dto/account.dto';

// @apps
import { GetAccountsQuery } from '../../../../@apps/iam/account/application/get/get-accounts.query';
import { DeleteAccountsCommand } from '../../../../@apps/iam/account/application/delete/delete-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts')
export class IamDeleteAccountsController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete accounts in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [AccountDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        const accounts = await this.queryBus.ask(new GetAccountsQuery(queryStatement, constraint, { timezone }));

        await this.commandBus.dispatch(new DeleteAccountsCommand(queryStatement, constraint, { timezone }));

        return accounts;
    }
}