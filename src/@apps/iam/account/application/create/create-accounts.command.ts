import { CQMetadata } from 'aurora-ts-core';

export class CreateAccountsCommand
{
    constructor(
        public readonly payload: {
            id: string;
            type: string;
            email: string;
            isActive: boolean;
            clientId: string;
            dApplicationCodes: any;
            dPermissions: any;
            dTenants: any;
            data?: any;
            roles?: string[];
            tenants?: string[];
        } [],
        public readonly cQMetadata?: CQMetadata,
    ) {}
}