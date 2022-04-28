/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRoleCommand } from './create-role.command';
import { CreateRoleService } from './create-role.service';
import {
    RoleId,
    RoleName,
    RoleIsMaster,
    RolePermissions,
    RoleAccounts,
    RoleCreatedAt,
    RoleUpdatedAt,
    RoleDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateRoleCommand)
export class CreateRoleCommandHandler implements ICommandHandler<CreateRoleCommand>
{
    constructor(
        private readonly createRoleService: CreateRoleService,
    ) {}

    async execute(command: CreateRoleCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRoleService.main(
            {
                id: new RoleId(command.payload.id),
                name: new RoleName(command.payload.name),
                isMaster: new RoleIsMaster(command.payload.isMaster),
                permissions: new RolePermissions(command.payload.permissions),
                accounts: new RoleAccounts(command.payload.accounts),
            },
            command.cQMetadata,
        );
    }
}