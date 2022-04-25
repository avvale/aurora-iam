/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';

// @apps
import { FindUserQuery } from '../../../../@apps/iam/user/application/find/find-user.query';

@ApiTags('[iam] user')
@Controller('iam/user/find')
export class IamFindUserController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Find user according to query' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: UserDto })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new FindUserQuery(queryStatement, constraint, { timezone }));
    }
}