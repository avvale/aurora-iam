import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateAccountsResolver } from './iam-create-accounts.resolver';
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';
import { IamCreateAccountInput } from './../../../../graphql';

describe('IamCreateAccountsResolver', () =>
{
    let resolver: IamCreateAccountsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateAccountsResolver,
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

        resolver    = module.get<IamCreateAccountsResolver>(IamCreateAccountsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateAccountsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateAccountsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an accounts created', async () =>
        {
            expect(await resolver.main(<IamCreateAccountInput[]>accounts)).toBe(true);
        });
    });
});