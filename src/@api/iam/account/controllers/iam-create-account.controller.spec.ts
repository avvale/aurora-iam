/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { IamCreateAccountController } from './iam-create-account.controller';
import { IamCreateAccountHandler } from '../handlers/iam-create-account.handler';

// sources
import { accounts } from '../../../../@apps/iam/account/infrastructure/seeds/account.seed';

describe('IamCreateAccountController', () =>
{
    let controller: IamCreateAccountController;
    let handler: IamCreateAccountHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateAccountController,
            ],
            providers: [
                {
                    provide : IamCreateAccountHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamCreateAccountController>(IamCreateAccountController);
        handler = module.get<IamCreateAccountHandler>(IamCreateAccountHandler);
    });

    describe('main', () =>
    {
        test('IamCreateAccountController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an account created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(accounts[0])));
            expect(await controller.main(accounts[0])).toBe(accounts[0]);
        });
    });
});