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
        example    : 'f6107b97-0c4a-4605-ab40-d736e8df4608',
    })
    boundedContextId: string;

    @ApiProperty({
        type       : [String],
        description: 'roleIds [input here api field description]',
    })
    roleIds?: string[];

}