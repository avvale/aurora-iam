
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { IamRoleAccount } from './role-account.aggregate';
import { RoleId } from './value-objects';

export abstract class IRoleAccountRepository implements IRepository<IamRoleAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamRoleAccount>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount | null>;

    // find a single record by id
    abstract findById(
        id: RoleId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamRoleAccount[]>;

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
        roleAccount: IamRoleAccount,
        options?: {
            dataFactory?: (aggregate: IamRoleAccount) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: IamRoleAccount) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        rolesAccounts: IamRoleAccount[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamRoleAccount) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        roleAccount: IamRoleAccount,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamRoleAccount) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: RoleId,
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