/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { Constraint, IQueryBus, QueryStatement, Timezone } from 'aurora-ts-core';
import { UserDto } from './../dto/user.dto';

// @apps
import { GetUsersQuery } from '../../../../@apps/iam/user/application/get/get-users.query';

@ApiTags('[iam] user')
@Controller('iam/users/get')
export class IamGetUsersController
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get users according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [UserDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(
        @Body('query') queryStatement?: QueryStatement,
        @Constraint() constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.queryBus.ask(new GetUsersQuery(queryStatement, constraint, { timezone }));
    }
}