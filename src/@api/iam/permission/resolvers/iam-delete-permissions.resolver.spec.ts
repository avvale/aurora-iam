/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamDeletePermissionsResolver } from './iam-delete-permissions.resolver';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamDeletePermissionsResolver', () =>
{
    let resolver: IamDeletePermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamDeletePermissionsResolver,
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

        resolver    = module.get<IamDeletePermissionsResolver>(IamDeletePermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamDeletePermissionsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamDeletePermissionsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an permissions deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await resolver.main()).toBe(permissions);
        });
    });
});