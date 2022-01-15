import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        enum       : ['USER','SERVICE'],
        description: 'type [input here api field description]',
        example    : 'USER',
    })
    type: string;

    @ApiProperty({
        type       : String,
        description: 'email [input here api field description]',
        example    : 'john@gmial.com',
    })
    email: string;

    @ApiProperty({
        type       : Boolean,
        description: 'isActive [input here api field description]',
        example    : true,
    })
    isActive: boolean;

    @ApiProperty({
        type       : String,
        description: 'clientId [input here api field description]',
    })
    clientId: string;

    @ApiProperty({
        type       : Object,
        description: 'dApplicationCodes [input here api field description]',
    })
    dApplicationCodes: any;

    @ApiProperty({
        type       : Object,
        description: 'dPermissions [input here api field description]',
    })
    dPermissions: any;

    @ApiProperty({
        type       : Object,
        description: 'dTenants [input here api field description]',
    })
    dTenants: any;

    @ApiProperty({
        type       : Object,
        description: 'data [input here api field description]',
    })
    data: any;

    @ApiProperty({
        type       : [String],
        description: 'roleIds [input here api field description]',
    })
    roleIds: string[];

    @ApiProperty({
        type       : [String],
        description: 'tenantIds [input here api field description]',
    })
    tenantIds: string[];

}