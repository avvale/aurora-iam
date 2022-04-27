
import { CQMetadata, IRepository, ObjectLiteral, Pagination, QueryStatement } from 'aurora-ts-core';
import { IamTenant } from './tenant.aggregate';
import { TenantId } from './value-objects';

export abstract class ITenantRepository implements IRepository<IamTenant>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamTenant>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamTenant | null>;

    // find a single record by id
    abstract findById(
        id: TenantId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamTenant | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamTenant[]>;

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
        tenant: IamTenant,
        options?: {
            createOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamTenant) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement?: (aggregate: IamTenant) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        tenants: IamTenant[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamTenant) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        tenant: IamTenant,
        options?: {
            updateOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamTenant) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: TenantId,
        options?: {
            deleteOptions?: ObjectLiteral;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;

    // delete records
    abstract delete(
        options?: {
            deleteOptions?: ObjectLiteral;
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<void>;
}