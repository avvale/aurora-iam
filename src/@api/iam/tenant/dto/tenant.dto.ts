/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { AccountDto } from '../../../iam/account/dto/account.dto';

export class TenantDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type       : String,
        description: 'logo [input here api field description]',
    })
    logo: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
    })
    isActive: boolean;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data: any;

    @ApiProperty({
        type       : [AccountDto],
        description: 'accountIds [input here api field description]',
    })
    accounts: AccountDto[];

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt: string;

}