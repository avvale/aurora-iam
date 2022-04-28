/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IamCreatePermissionDto
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
        example    : '299f2457-980d-445e-8bc9-d35fe963ca4d',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [String],
        description: 'roles [input here api field description]',
    })
    roleIds?: string[];

}