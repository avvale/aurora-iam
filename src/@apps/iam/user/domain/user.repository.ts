
import { IRepository, ObjectLiteral, QueryStatement } from 'aurora-ts-core';
import { CQMetadata, Pagination } from 'aurora-ts-core';
import { IamUser } from './user.aggregate';
import { UserId } from './value-objects';

export abstract class IUserRepository implements IRepository<IamUser>
{
    abstract readonly repository: any;

    // paginate records
    abstract paginate(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<Pagination<IamUser>>;

    // find a single record
    abstract find(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamUser | null>;

    // find a single record by id
    abstract findById(
        id: UserId,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamUser | null>;

    // get multiple records
    abstract get(
        options?: {
            queryStatement?: QueryStatement;
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
        }
    ): Promise<IamUser[]>;

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
        user: IamUser,
        options?: {
            dataFactory?: (aggregate: IamUser) => ObjectLiteral;
            // arguments to find object and check if object is duplicated
            finderQueryStatement: (aggregate: IamUser) => QueryStatement;
        }
    ): Promise<void>;

    // create a single or multiple records
    abstract insert(
        users: IamUser[],
        options?: {
            insertOptions?: ObjectLiteral;
            dataFactory?: (aggregate: IamUser) => ObjectLiteral;
        }
    ): Promise<void>;

    // update record
    abstract update(
        user: IamUser,
        options?: {
            constraint?: QueryStatement;
            cQMetadata?: CQMetadata;
            dataFactory?: (aggregate: IamUser) => ObjectLiteral;
            // arguments to find object to update, with i18n we use langId and id relationship with parent entity
            findArguments?: ObjectLiteral;
        }
    ): Promise<void>;

    // delete record
    abstract deleteById(
        id: UserId,
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