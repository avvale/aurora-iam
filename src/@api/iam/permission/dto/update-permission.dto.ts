import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto
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
        type       : [String],
        description: 'roleIds [input here api field description]',
    })
    roleIds: string[];

}