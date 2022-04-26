/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateAccountResolver } from './iam-create-account.resolver';
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';
import { IamCreateAccountInput } from '../../../../graphql';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamCreateAccountResolver', () =>
{
    let resolver: IamCreateAccountResolver;
    let handler: IamCreateAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamCreateAccountResolver,
                {
                    provide : IamCreateAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        resolver = module.get<IamCreateAccountResolver>(IamCreateAccountResolver);
        handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
    });

    test('IamCreateAccountResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateAccountResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await resolver.main(<IamCreateAccountInput>accounts[0])).toBe(accounts[0]);
        });
    });
});