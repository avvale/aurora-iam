import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ICommandBus, IQueryBus, Timezone } from 'aurora-ts-core';
import { CreateAccountDto } from './../dto/create-account.dto';
import { AccountDto } from './../dto/account.dto';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';
import { CreateAccountCommand } from '../../../../@apps/iam/account/application/create/create-account.command';

@ApiTags('[iam] account')
@Controller('iam/account')
export class IamCreateAccountController
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create account' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: AccountDto })
    async main(
        @Body() payload: CreateAccountDto,
        @Timezone() timezone?: string,
    )
    {
        await this.commandBus.dispatch(new CreateAccountCommand(payload, { timezone }));

        return await this.queryBus.ask(new FindAccountByIdQuery(payload.id, {}, { timezone }));
    }
}