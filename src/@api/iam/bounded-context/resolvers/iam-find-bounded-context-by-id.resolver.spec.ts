/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamFindBoundedContextByIdResolver } from './iam-find-bounded-context-by-id.resolver';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamFindBoundedContextByIdResolver', () =>
{
    let resolver: IamFindBoundedContextByIdResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamFindBoundedContextByIdResolver,
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

        resolver    = module.get<IamFindBoundedContextByIdResolver>(IamFindBoundedContextByIdResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamFindBoundedContextByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamFindBoundedContextByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContext by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts[0])));
            expect(await resolver.main(boundedContexts[0].id)).toBe(boundedContexts[0]);
        });
    });
});