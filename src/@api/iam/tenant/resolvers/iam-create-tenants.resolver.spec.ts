import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateTenantsResolver } from './iam-create-tenants.resolver';
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { IamCreateTenantInput } from './../../../../graphql';

describe('IamCreateTenantsResolver', () =>
{
    let resolver: IamCreateTenantsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateTenantsResolver,
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    }
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    }
                },
            ]
        }).compile();

        resolver    = module.get<IamCreateTenantsResolver>(IamCreateTenantsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateTenantsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateTenantsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenants created', async () =>
        {
            expect(await resolver.main(<IamCreateTenantInput[]>tenants)).toBe(true);
        });
    });
});