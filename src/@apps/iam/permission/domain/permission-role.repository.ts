
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { IamPermissionRole } from './permission-role.aggregate';
import { PermissionId } from './value-objects';

export abstract class IPermissionRoleRepository implements IRepository<IamPermissionRole>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamPermissionRole>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole | null>;

    // find a single record by id
    abstract findById(
        id: PermissionId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamPermissionRole[]>;

    // count records
    abstract count(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<number>;

    // ******************
    // ** side effects **
    // ******************

    // create a single record
    abstract create(
        permissionRole: IamPermissionRole,
        options?: {
            dataFactory?: (aggregate: IamPermissionRole) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: IamPermissionRole) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        permissionsRoles: IamPermissionRole[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamPermissionRole) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        permissionRole: IamPermissionRole,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamPermissionRole) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: PermissionId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}