import { IMapper, MapperOptions, ObjectLiteral, CQMetadata } from 'aurora-ts-core';
import { IamRole } from './role.aggregate';
import { RoleResponse } from './role.response';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './value-objects';
import { PermissionMapper } from '../../../../@apps/iam/permission/domain/permission.mapper';
import { AccountMapper } from '../../../../@apps/iam/account/domain/account.mapper';

export class RoleMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param role
     */
    mapModelToAggregate(role: ObjectLiteral, cQMetadata?: CQMetadata): IamRole
    {
        if (!role) return;

        return this.makeAggregate(role, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param roles
     */
    mapModelsToAggregates(roles: ObjectLiteral[], cQMetadata?: CQMetadata): IamRole[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role  => this.makeAggregate(role, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param role
     */
    mapAggregateToResponse(role: IamRole): RoleResponse
    {
        return this.makeResponse(role);
    }

    /**
     * Map array of aggregates to array responses
     * @param roles
     */
    mapAggregatesToResponses(roles: IamRole[]): RoleResponse[]
    {
        if (!Array.isArray(roles)) return;

        return roles.map(role => this.makeResponse(role));
    }

    private makeAggregate(role: ObjectLiteral, cQMetadata?: CQMetadata): IamRole
    {
        return IamRole.register(
            new RoleId(role.id),
            new RoleName(role.name),
            new RoleIsMaster(role.isMaster),
            new RolePermissionIds(role.permissionIds),
            new RoleAccountIds(role.accountIds),
            new RoleCreatedAt(role.createdAt, {}, { addTimezone: cQMetadata?.timezone }),
            new RoleUpdatedAt(role.updatedAt, {}, { addTimezone: cQMetadata?.timezone }),
            new RoleDeletedAt(role.deletedAt, {}, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapModelsToAggregates(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapModelsToAggregates(role.accounts) : undefined,
        );
    }

    private makeResponse(role: IamRole): RoleResponse
    {
        if (!role) return;

        return new RoleResponse(
            role.id.value,
            role.name.value,
            role.isMaster.value,
            role.permissionIds.value,
            role.accountIds.value,
            role.createdAt.value,
            role.updatedAt.value,
            role.deletedAt.value,
            this.options.eagerLoading ? new PermissionMapper({ eagerLoading: false }).mapAggregatesToResponses(role.permissions) : undefined,
            this.options.eagerLoading ? new AccountMapper({ eagerLoading: false }).mapAggregatesToResponses(role.accounts) : undefined,
        );
    }
}