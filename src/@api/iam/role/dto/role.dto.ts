/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { PermissionDto } from '../../../iam/permission/dto/permission.dto';
import { AccountDto } from '../../../iam/account/dto/account.dto';

export class RoleDto
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
        type       : Boolean,
        description: 'isMaster [input here api field description]',
    })
    isMaster: boolean;

    @ApiProperty({
        type       : [PermissionDto],
        description: 'permissionIds [input here api field description]',
    })
    permissions: PermissionDto[];

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