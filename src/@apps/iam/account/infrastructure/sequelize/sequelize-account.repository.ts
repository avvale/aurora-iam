import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ICriteria, SequelizeRepository } from 'aurora-ts-core';
import { IAccountRepository } from '../../domain/account.repository';
import { IamAccount } from '../../domain/account.aggregate';
import { AccountMapper } from '../../domain/account.mapper';
import { IamAccountModel } from './sequelize-account.model';

@Injectable()
export class SequelizeAccountRepository extends SequelizeRepository<IamAccount, IamAccountModel> implements IAccountRepository
{
    public readonly aggregateName: string = 'IamAccount';
    public readonly mapper: AccountMapper = new AccountMapper();

    constructor(
        @InjectModel(IamAccountModel)
        public readonly repository: typeof IamAccountModel,
        public readonly criteria: ICriteria,
    )
    {
        super();
    }

    // hook called after create aggregate
    async createdAggregateHook(aggregate: IamAccount, model: IamAccountModel): Promise<void>
    {
        // add many to many relation
        if (aggregate.roles.length > 0) await model.$add('roles', aggregate.roles.value);
        if (aggregate.tenants.length > 0) await model.$add('tenants', aggregate.tenants.value);
    }

    // hook called after create aggregate
    async updatedAggregateHook(aggregate: IamAccount, model: IamAccountModel): Promise<void>
    {
        // set many to many relation
        if (aggregate.roles.isArray()) await model.$set('roles', aggregate.roles.value);
        if (aggregate.tenants.isArray()) await model.$set('tenants', aggregate.tenants.value);
    }
}