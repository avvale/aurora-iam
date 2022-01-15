/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectLiteral, Utils } from 'aurora-ts-core';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from './value-objects';
import { CreatedBoundedContextEvent } from './../application/events/created-bounded-context.event';
import { UpdatedBoundedContextEvent } from './../application/events/updated-bounded-context.event';
import { DeletedBoundedContextEvent } from './../application/events/deleted-bounded-context.event';
import { IamPermission } from '../../../../@apps/iam/permission/domain/permission.aggregate';

export class IamBoundedContext extends AggregateRoot
{
    id: BoundedContextId;
    name: BoundedContextName;
    sort: BoundedContextSort;
    isActive: BoundedContextIsActive;
    createdAt: BoundedContextCreatedAt;
    updatedAt: BoundedContextUpdatedAt;
    deletedAt: BoundedContextDeletedAt;

    // eager relationship
    permissions: IamPermission[];

    constructor(
        id: BoundedContextId,
        name: BoundedContextName,
        sort: BoundedContextSort,
        isActive: BoundedContextIsActive,
        createdAt: BoundedContextCreatedAt,
        updatedAt: BoundedContextUpdatedAt,
        deletedAt: BoundedContextDeletedAt,

        permissions?: IamPermission[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.sort = sort;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.permissions = permissions;
    }

    static register (
        id: BoundedContextId,
        name: BoundedContextName,
        sort: BoundedContextSort,
        isActive: BoundedContextIsActive,
        createdAt: BoundedContextCreatedAt,
        updatedAt: BoundedContextUpdatedAt,
        deletedAt: BoundedContextDeletedAt,

        permissions?: IamPermission[],
    ): IamBoundedContext
    {
        return new IamBoundedContext(
            id,
            name,
            sort,
            isActive,
            createdAt,
            updatedAt,
            deletedAt,

            permissions,
        );
    }

    created(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new CreatedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.sort?.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            )
        );
    }

    updated(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new UpdatedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name?.value,
                boundedContext.sort?.value,
                boundedContext.isActive?.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            )
        );
    }

    deleted(boundedContext: IamBoundedContext): void
    {
        this.apply(
            new DeletedBoundedContextEvent(
                boundedContext.id.value,
                boundedContext.name.value,
                boundedContext.sort?.value,
                boundedContext.isActive.value,
                boundedContext.createdAt?.value,
                boundedContext.updatedAt?.value,
                boundedContext.deletedAt?.value,
            )
        );
    }

    toDTO(): ObjectLiteral
    {
        return {
            id: this.id.value,
            name: this.name.value,
            sort: this.sort?.value,
            isActive: this.isActive.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            permissions: this.permissions?.map(item => item.toDTO()),
        };
    }


    toI18nDTO(): ObjectLiteral
    {
        return {
        };
    }
}
