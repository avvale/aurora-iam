/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateTenantResolver } from './iam-create-tenant.resolver';
import { IamCreateTenantInput } from './../../../../graphql';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamCreateTenantResolver', () =>
{
    let resolver: IamCreateTenantResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateTenantResolver,
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

        resolver    = module.get<IamCreateTenantResolver>(IamCreateTenantResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateTenantResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateTenantResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an tenant created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants[0])));
            expect(await resolver.main(<IamCreateTenantInput>tenants[0])).toBe(tenants[0]);
        });
    });
});