import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateAccountsController } from './iam-create-accounts.controller';
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamCreateAccountsController', () =>
{
    let controller: IamCreateAccountsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateAccountsController
            ],
            providers: [
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

        controller  = module.get<IamCreateAccountsController>(IamCreateAccountsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateAccountsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an accounts created', async () =>
        {
            expect(await controller.main(accounts)).toBe(undefined);
        });
    });
});