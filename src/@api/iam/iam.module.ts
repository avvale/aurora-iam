import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { IamModels, IamHandlers, IamServices, IamRepositories, IamSagas } from '../../@apps/iam';
import { IamBoundedContextControllers, IamBoundedContextResolvers } from './bounded-context';
import { IamPermissionControllers, IamPermissionResolvers } from './permission';
import { IamTenantControllers, IamTenantResolvers } from './tenant';
import { IamRoleControllers, IamRoleResolvers } from './role';
import { IamAccountControllers, IamAccountResolvers, IamAccountApiHandlers } from './account';
import { IamUserControllers, IamUserResolvers } from './user';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...IamModels
            ])
    ],
    controllers: [
        ...IamBoundedContextControllers,
        ...IamPermissionControllers,
        ...IamTenantControllers,
        ...IamRoleControllers,
        ...IamAccountControllers,
        ...IamUserControllers
    ],
    providers: [
        ...IamHandlers,
        ...IamServices,
        ...IamRepositories,
        ...IamSagas,
        ...IamBoundedContextResolvers,
        ...IamPermissionResolvers,
        ...IamTenantResolvers,
        ...IamRoleResolvers,
        ...IamAccountResolvers,
        ...IamUserResolvers,
        ...IamAccountApiHandlers
    ],
})
export class IamModule {}
