
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { CQMetadata, Pagination } from 'aurora-ts-core';
import { IamAccount } from './account.aggregate';
import { AccountId } from './value-objects';

export abstract class IAccountRepository implements IRepository<IamAccount>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamAccount>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount | null>;

    // find a single record by id
    abstract findById(
        id: AccountId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamAccount[]>;

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
        account: IamAccount,
        options?: {
            dataFactory?: (aggregate: IamAccount) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: IamAccount) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        accounts: IamAccount[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamAccount) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        account: IamAccount,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamAccount) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: AccountId,
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