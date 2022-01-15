import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreatePermissionsController } from './iam-create-permissions.controller';
import { permissions } from '../../../../@apps/iam/permission/infrastructure/seeds/permission.seed';

describe('IamCreatePermissionsController', () =>
{
    let controller: IamCreatePermissionsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreatePermissionsController
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

        controller  = module.get<IamCreatePermissionsController>(IamCreatePermissionsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreatePermissionsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an permissions created', async () =>
        {
            expect(await controller.main(permissions)).toBe(undefined);
        });
    });
});