/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, Timezone } from 'aurora-ts-core';
import { AccountDto } from './../dto/account.dto';
import { CreateAccountDto } from './../dto/create-account.dto';

// @apps
import { CreateAccountsCommand } from '../../../../@apps/iam/account/application/create/create-accounts.command';

@ApiTags('[iam] account')
@Controller('iam/accounts/create')
export class IamCreateAccountsController
{
    constructor(
        private readonly commandBus: ICommandBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create accounts in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [AccountDto] })
    @ApiBody({ type: [CreateAccountDto] })
    async main(
        @Body() payload: CreateAccountDto[],
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAccountsCommand(payload, { timezone }));
    }
}