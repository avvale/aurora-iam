import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from './../../domain/value-objects';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';

@Injectable()
export class CreateTenantService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: ITenantRepository,
    ) {}

    public async main(
        payload: {
            id: TenantId,
            name: TenantName,
            code: TenantCode,
            logo: TenantLogo,
            isActive: TenantIsActive,
            data: TenantData,
            accountIds: TenantAccountIds,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const tenant = IamTenant.register(
            payload.id,
            payload.name,
            payload.code,
            payload.logo,
            payload.isActive,
            payload.data,
            payload.accountIds,
            new TenantCreatedAt({ currentTimestamp: true }),
            new TenantUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(tenant);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const tenantRegister = this.publisher.mergeObjectContext(
            tenant
        );

        tenantRegister.created(tenant); // apply event to model events
        tenantRegister.commit(); // commit all events of model
    }
}