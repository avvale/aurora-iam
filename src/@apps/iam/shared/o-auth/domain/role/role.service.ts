import { QueryStatement } from 'aurora-ts-core';
import { ClientResponse } from '../../o-auth.types';

export interface ClientService
{
    findClient(queryStatement?: QueryStatement): ClientResponse;
}