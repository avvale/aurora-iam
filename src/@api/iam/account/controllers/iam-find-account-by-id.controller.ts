import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { AccountDto } from './../dto/account.dto';

// @apps
import { FindAccountByIdQuery } from '../../../../@apps/iam/account/application/find/find-account-by-id.query';

@ApiTags('[iam] account')
@Controller('iam/account')
export class IamFindAccountByIdController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find account by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: AccountDto })
    async main(
        @Param('id') id: string,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindAccountByIdQuery(id, constraint, { timezone }));
    }
}