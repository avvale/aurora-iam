/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, ICommandBus, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UpdateAccountDto } from './../dto/update-account.dto';
import { AccountDto } from './../dto/account.dto';

// @apps
import { UpdateAccountCommand } from '../../../../@apps/iam/account/application/update/update-account.command';
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';

@ApiTags('[iam] account')
@Controller('iam/account/update')
export class IamUpdateAccountController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update account' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: AccountDto})
    async main(
        @Body() payload: UpdateAccountDto,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new UpdateAccountCommand(payload, constraint, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, constraint, { timezone }));
    }
}