import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { IamCreateBoundedContextsResolver } from './iam-create-bounded-contexts.resolver';
import { boundedContexts } from '../../../../@apps/iam/bounded-context/infrastructure/seeds/bounded-context.seed';
import { IamCreateBoundedContextInput } from './../../../../graphql';

describe('IamCreateBoundedContextsResolver', () =>
{
    let resolver: IamCreateBoundedContextsResolver;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateBoundedContextsResolver,
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

        resolver    = module.get<IamCreateBoundedContextsResolver>(IamCreateBoundedContextsResolver);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    test('IamCreateBoundedContextsResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('IamCreateBoundedContextsResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an boundedContexts created', async () =>
        {
            expect(await resolver.main(<IamCreateBoundedContextInput[]>boundedContexts)).toBe(true);
        });
    });
});