// controllers
import { IamCreateTenantController } from './controllers/iam-create-tenant.controller';
import { IamCreateTenantsController } from './controllers/iam-create-tenants.controller';
import { IamPaginateTenantsController } from './controllers/iam-paginate-tenants.controller';
import { IamGetTenantsController } from './controllers/iam-get-tenants.controller';
import { IamFindTenantByIdController } from './controllers/iam-find-tenant-by-id.controller';
import { IamFindTenantController } from './controllers/iam-find-tenant.controller';
import { IamUpdateTenantController } from './controllers/iam-update-tenant.controller';
import { IamDeleteTenantByIdController } from './controllers/iam-delete-tenant-by-id.controller';
import { IamDeleteTenantsController } from './controllers/iam-delete-tenants.controller';

// resolvers
import { IamCreateTenantResolver } from './resolvers/iam-create-tenant.resolver';
import { IamCreateTenantsResolver } from './resolvers/iam-create-tenants.resolver';
import { IamPaginateTenantsResolver } from './resolvers/iam-paginate-tenants.resolver';
import { IamGetTenantsResolver } from './resolvers/iam-get-tenants.resolver';
import { IamFindTenantByIdResolver } from './resolvers/iam-find-tenant-by-id.resolver';
import { IamFindTenantResolver } from './resolvers/iam-find-tenant.resolver';
import { IamUpdateTenantResolver } from './resolvers/iam-update-tenant.resolver';
import { IamDeleteTenantByIdResolver } from './resolvers/iam-delete-tenant-by-id.resolver';
import { IamDeleteTenantsResolver } from './resolvers/iam-delete-tenants.resolver';

export const IamTenantControllers = [
    IamCreateTenantController,
    IamCreateTenantsController,
    IamPaginateTenantsController,
    IamGetTenantsController,
    IamFindTenantByIdController,
    IamFindTenantController,
    IamUpdateTenantController,
    IamDeleteTenantByIdController,
    IamDeleteTenantsController,
];

export const IamTenantResolvers = [
    IamCreateTenantResolver,
    IamCreateTenantsResolver,
    IamPaginateTenantsResolver,
    IamGetTenantsResolver,
    IamFindTenantByIdResolver,
    IamFindTenantResolver,
    IamUpdateTenantResolver,
    IamDeleteTenantByIdResolver,
    IamDeleteTenantsResolver,
];