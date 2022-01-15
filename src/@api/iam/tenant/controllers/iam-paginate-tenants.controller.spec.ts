/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamPaginateTenantsController } from './iam-paginate-tenants.controller';

// sources
import { tenants } from '../../../../@apps/iam/tenant/infrastructure/seeds/tenant.seed';

describe('IamPaginateTenantsController', () =>
{
    let controller: IamPaginateTenantsController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamPaginateTenantsController
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

        controller  = module.get<IamPaginateTenantsController>(IamPaginateTenantsController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamPaginateTenantsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a tenants', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(tenants)));
            expect(await controller.main()).toBe(tenants);
        });
    });
});