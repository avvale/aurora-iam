/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamUpdatePermissionDto
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
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'boundedContextId [input here api field description]',
        example    : 'ca7ced1f-9943-4c42-97e4-e158495596c1',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [String],
        description: 'roleIds [input here api field description]',
    })
    roleIds?: string[];

}