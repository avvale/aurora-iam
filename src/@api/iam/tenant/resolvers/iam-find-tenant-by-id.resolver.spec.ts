/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamFindTenantByIdResolver } from './iam-find-tenant-by-id.resolver';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamFindTenantByIdResolver', () =>
{
    let resolver: IamFindTenantByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindTenantByIdResolver,
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

        resolver    = module.get<IamFindTenantByIdResolver>(IamFindTenantByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamFindTenantByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindTenantByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(tenants[0].id)).toBe(tenants[0]);
        });
    });
});