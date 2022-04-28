import { CQMetadata } from 'aurora-ts-core';

export class CreateRoleCommand
{
    constructor(
        public readonly payload: {
            id: string;
            name: string;
            isMaster: boolean;
            permissions?: string[];
            accounts?: string[];
        },
        public readonly cQMetadata?: CQMetadata,
    ) {}
}