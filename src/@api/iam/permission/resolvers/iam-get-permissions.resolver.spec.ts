/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamGetPermissionsResolver } from './iam-get-permissions.resolver';

// sources
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamGetPermissionsResolver', () =>
{
    let resolver:   IamGetPermissionsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamGetPermissionsResolver,
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

        resolver    = module.get<IamGetPermissionsResolver>(IamGetPermissionsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamGetPermissionsResolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('IamGetPermissionsResolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a permissions', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(permissions)));
            expect(await resolver.main()).toBe(permissions);
        });
    });
});