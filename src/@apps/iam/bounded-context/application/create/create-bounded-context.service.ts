import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    BoundedContextId,
    BoundedContextName,
    BoundedContextSort,
    BoundedContextIsActive,
    BoundedContextCreatedAt,
    BoundedContextUpdatedAt,
    BoundedContextDeletedAt,
} from './../../domain/value-objects';
import { IBoundedContextRepository } from './../../domain/bounded-context.repository';
import { IamBoundedContext } from './../../domain/bounded-context.aggregate';

@Injectable()
export class CreateBoundedContextService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IBoundedContextRepository,
    ) {}

    public async main(
        payload: {
            id: BoundedContextId,
            name: BoundedContextName,
            sort: BoundedContextSort,
            isActive: BoundedContextIsActive,
        }
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const boundedContext = IamBoundedContext.register(
            payload.id,
            payload.name,
            payload.sort,
            payload.isActive,
            new BoundedContextCreatedAt({ currentTimestamp: true }),
            new BoundedContextUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(boundedContext);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const boundedContextRegister = this.publisher.mergeObjectContext(
            boundedContext
        );

        boundedContextRegister.created(boundedContext); // apply event to model events
        boundedContextRegister.commit(); // commit all events of model
    }
}