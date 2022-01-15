/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateUserResolver } from './iam-create-user.resolver';
import { IamCreateUserInput } from './../../../../graphql';

// sources
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUserResolver', () =>
{
    let resolver: IamCreateUserResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateUserResolver,
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

        resolver    = module.get<IamCreateUserResolver>(IamCreateUserResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateUserResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateUserResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an user created', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(users[0])));
            expect(await resolver.main(<IamCreateUserInput>users[0])).toBe(users[0]);
        });
    });
});