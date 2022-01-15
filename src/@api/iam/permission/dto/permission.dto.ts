/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../../../iam/role/dto/role.dto';

export class PermissionDto
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
        description: 'boundedContextId [input here api field description]',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [RoleDto],
        description: 'roleIds [input here api field description]',
    })
    roles: RoleDto[];

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