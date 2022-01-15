import { IMapper, MapperOptions, ObjectLiteral, CQMetadata } from 'aurora-ts-core';
import { IamPermission } from './permission.aggregate';
import { PermissionResponse } from './permission.response';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from './value-objects';
import { BoundedContextMapper } from '../../../../@apps/iam/bounded-context/domain/bounded-context.mapper';
import { RoleMapper } from '../../../../@apps/iam/role/domain/role.mapper';

export class PermissionMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param permission
     */
    mapModelToAggregate(permission: ObjectLiteral, cQMetadata?: CQMetadata): IamPermission
    {
        if (!permission) return;

        return this.makeAggregate(permission, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param permissions
     */
    mapModelsToAggregates(permissions: ObjectLiteral[], cQMetadata?: CQMetadata): IamPermission[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission  => this.makeAggregate(permission, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param permission
     */
    mapAggregateToResponse(permission: IamPermission): PermissionResponse
    {
        return this.makeResponse(permission);
    }

    /**
     * Map array of aggregates to array responses
     * @param permissions
     */
    mapAggregatesToResponses(permissions: IamPermission[]): PermissionResponse[]
    {
        if (!Array.isArray(permissions)) return;

        return permissions.map(permission => this.makeResponse(permission));
    }

    private makeAggregate(permission: ObjectLiteral, cQMetadata?: CQMetadata): IamPermission
    {
        return IamPermission.register(
            new PermissionId(permission.id),
            new PermissionName(permission.name),
            new PermissionBoundedContextId(permission.boundedContextId),
            new PermissionRoleIds(permission.roleIds),
            new PermissionCreatedAt(permission.createdAt, {}, { addTimezone: cQMetadata?.timezone }),
            new PermissionUpdatedAt(permission.updatedAt, {}, { addTimezone: cQMetadata?.timezone }),
            new PermissionDeletedAt(permission.deletedAt, {}, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapModelToAggregate(permission.boundedContext) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapModelsToAggregates(permission.roles) : undefined,
        );
    }

    private makeResponse(permission: IamPermission): PermissionResponse
    {
        if (!permission) return;

        return new PermissionResponse(
            permission.id.value,
            permission.name.value,
            permission.boundedContextId.value,
            permission.roleIds.value,
            permission.createdAt.value,
            permission.updatedAt.value,
            permission.deletedAt.value,
            this.options.eagerLoading ? new BoundedContextMapper({ eagerLoading: false }).mapAggregateToResponse(permission.boundedContext) : undefined,
            this.options.eagerLoading ? new RoleMapper({ eagerLoading: false }).mapAggregatesToResponses(permission.roles) : undefined,
        );
    }
}