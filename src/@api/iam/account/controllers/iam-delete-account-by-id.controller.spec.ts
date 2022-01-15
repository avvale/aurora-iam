/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamDeleteAccountByIdController } from './iam-delete-account-by-id.controller';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamDeleteAccountByIdController', () =>
{
    let controller: IamDeleteAccountByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamDeleteAccountByIdController
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

        controller  = module.get<IamDeleteAccountByIdController>(IamDeleteAccountByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamDeleteAccountByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an account deleted', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0].id)).toBe(accounts[0]);
        });
    });
});