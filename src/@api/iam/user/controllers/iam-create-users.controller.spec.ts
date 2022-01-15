import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateUsersController } from './iam-create-users.controller';
import { users } from '../../../../@apps/iam/user/infrastructure/seeds/user.seed';

describe('IamCreateUsersController', () =>
{
    let controller: IamCreateUsersController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateUsersController
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

        controller  = module.get<IamCreateUsersController>(IamCreateUsersController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateUsersController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an users created', async () =>
        {
            expect(await controller.main(users)).toBe(undefined);
        });
    });
});