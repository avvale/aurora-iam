import { CQMetadata } from 'aurora-ts-core';

export class CreateRolesCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            isMaster: boolean;
            permissions?: string[];
            accounts?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}