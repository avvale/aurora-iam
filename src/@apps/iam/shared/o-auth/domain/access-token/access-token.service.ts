import { AccessTokenResponse } from '../../o-auth.types';

export interface AccessTokenService
{
    findAccessTokenById(id: string): AccessTokenResponse;
}