/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamPaginateUsersResolver } from './iam-paginate-users.resolver';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamPaginateUsersResolver', () =>
{
    let resolver: IamPaginateUsersResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateUsersResolver,
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

        resolver    = module.get<IamPaginateUsersResolver>(IamPaginateUsersResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateUsersResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateUsersResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a users', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users)));
            expect(await resolver.main()).toBe(users);
        });
    });
});