/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamPaginateBoundedContextsResolver } from './iam-paginate-bounded-contexts.resolver';

// sources
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';

describe('IamPaginateBoundedContextsResolver', () =>
{
    let resolver: IamPaginateBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamPaginateBoundedContextsResolver,
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

        resolver    = module.get<IamPaginateBoundedContextsResolver>(IamPaginateBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamPaginateBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamPaginateBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a boundedContexts', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(boundedContexts)));
            expect(await resolver.main()).toBe(boundedContexts);
        });
    });
});