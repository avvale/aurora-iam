/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRolesCommand } from './create-roles.command';
import { CreateRolesService } from './create-roles.service';
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

@CommandHandler(CreateRolesCommand)
export class CreateRolesCommandHandler implements ICommandHandler<CreateRolesCommand>
{
    constructor(
        private readonly createRolesService: CreateRolesService,
    ) {}

    async execute(command: CreateRolesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createRolesService.main(
            command.payload
                .map(role =>
                {
                    return {
                        id: new RoleId(role.id),
                        name: new RoleName(role.name),
                        isMaster: new RoleIsMaster(role.isMaster),
                        permissions: new RolePermissions(role.permissions),
                        accounts: new RoleAccounts(role.accounts),
                    };
                }),
            command.cQMetadata,
        );
    }
}