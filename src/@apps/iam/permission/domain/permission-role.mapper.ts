

import { CQMetadata, IMapper, MapperOptions, ObjectLiteral } from 'aurora-ts-core';
import { IamPermissionRole } from './permission-role.aggregate';
import {
    PermissionPermissionId,
    PermissionRoleId,
} from './value-objects';

export class PermissionRoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param permissionRole
     */
    mapModelToAggregate(permissionRole: ObjectLiteral, cQMetadata?: CQMetadata): IamPermissionRole
    {
        if (!permissionRole) return;

        return this.makeAggregate(permissionRole, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissionsRoles
     */
    mapModelsToAggregates(permissionsRoles: ObjectLiteral[], cQMetadata?: CQMetadata): IamPermissionRole[]
    {
        if (!Array.isArray(permissionsRoles)) return;

        return permissionsRoles.map(permissionRole  => this.makeAggregate(permissionRole, cQMetadata));
    }

    mapAggregateToResponse(permissionRole: IamPermissionRole): ObjectLiteral
    {
        return null;
    }

    mapAggregatesToResponses(permissionRole: IamPermissionRole[]): ObjectLiteral[]
    {
        return null;
    }

    private makeAggregate(permissionRole: ObjectLiteral, cQMetadata?: CQMetadata): IamPermissionRole
    {
        return IamPermissionRole.register(
            new PermissionPermissionId(permissionRole.permissionId),
            new PermissionRoleId(permissionRole.roleId),
        );
    }
}