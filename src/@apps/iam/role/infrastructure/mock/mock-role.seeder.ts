import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissionIds,
    RoleAccountIds,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from './../../domain/value-objects';
import { IamRole } from './../../domain/role.aggregate';
import { roles } from './../seeds/role.seed';

@Injectable()
export class MockRoleSeeder extends MockSeeder<IamRole>
{
    public collectionSource: IamRole[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const role of roles)
        {
            this.collectionSource.push(
                IamRole.register(
                    new RoleId(role.id),
                    new RoleName(role.name),
                    new RoleIsMaster(role.isMaster),
                    new RolePermissionIds(role.permissionIds),
                    new RoleAccountIds(role.accountIds),
                    new RoleCreatedAt({ currentTimestamp: true }),
                    new RoleUpdatedAt({ currentTimestamp: true }),
                    new RoleDeletedAt(null),
                )
            );
        }
    }
}