import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateRolesController } from './iam-create-roles.controller';
import { roles } from '../../../../@apps/iam/role/infrastructure/seeds/role.seed';

describe('IamCreateRolesController', () =>
{
    let controller: IamCreateRolesController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                IamCreateRolesController
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

        controller  = module.get<IamCreateRolesController>(IamCreateRolesController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamCreateRolesController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an roles created', async () =>
        {
            expect(await controller.main(roles)).toBe(undefined);
        });
    });
});