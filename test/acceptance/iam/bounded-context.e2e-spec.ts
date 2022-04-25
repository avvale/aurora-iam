/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '../../../src/@apps/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextSeeder } from '../../../src/@apps/iam/bounded-context/infrastructure/mock/mock-bounded-context.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let repository: IBoundedContextRepository;
    let seeder: MockBoundedContextSeeder;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockBoundedContextSeeder,
            ],
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IBoundedContextRepository>(IBoundedContextRepository);
        seeder          = module.get<MockBoundedContextSeeder>(MockBoundedContextSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Fantastic Metal Chips',
                root: 'vtemzehjwh9kj3u2v3yrvus3fhn6x',
                sort: 68434,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '46f775b1-6219-4dd4-acf9-f041d47b045d',
                name: null,
                root: '2yktle9fnimgwvj8hw2g8lw7s4dqo',
                sort: 53584,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: 'ab595d26-e1ed-410c-815c-801d9ee6ab3e',
                name: 'Handmade Cotton Table',
                root: null,
                sort: 25396,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: 'cf2c15d8-cd1b-471d-b602-f8df9d1bab81',
                name: 'Practical Plastic Salad',
                root: 'x2j6sflg889n4uy2v18pztjcnztsq',
                sort: 53200,
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                name: 'Awesome Granite Gloves',
                root: 'orabw6n44749wi2qruogdu32osno6',
                sort: 19844,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '3de23917-cbaf-4349-a4ab-864ab03d818a',
                root: '7n5ornnrl90qucu4m3ibma5konuni',
                sort: 65762,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '31d16291-640d-4136-b867-fa3eeb111fc1',
                name: 'Handcrafted Metal Pizza',
                sort: 47625,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '4a4b2ee2-1432-429f-b75e-bf6618a8b6c6',
                name: 'Sleek Plastic Computer',
                root: '353mumzbvca8vts8txrz9dygc8cz7',
                sort: 92892,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: 'cc9ib6gw13xqij42g5p0xtdiik2ltcxzvsoog',
                name: 'Fantastic Cotton Tuna',
                root: '6gqfj29r05n3edgsmcb471618q4m0',
                sort: 32791,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '420f206d-0fb9-4593-b408-64ddbcd81917',
                name: 'fa6ayla5kougsdaswjxlyes7bao3obktg1gmmcnrhlguvu82j9bfr6xlo3umtzvj06cqvve6jj6t90tsvgai9g78tb2fzfktxglxwsv6r9oi3cqy1p9ci46uepq773f5j2085qwew7dapy7tkusy0jjndga94ix58ndxv7sri4u2r88hgwx6yh01wvh7loc0vr7jw9bx73spkl6i1jygubdjk94agxaducvg7q37f0qofxsl1yl2s0gzzwkcngnd',
                root: 'jib468n6jv05vdfa9lcci7d50ciwq',
                sort: 57863,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '44662e4e-1f94-4e40-b350-9f1bbb657621',
                name: 'Incredible Fresh Chips',
                root: '6lo2uwb40n3getevm9tglbk25fpwouw',
                sort: 85050,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: 'b3ff5a6c-a19a-40a8-b95a-e4042c7226e1',
                name: 'Awesome Rubber Tuna',
                root: 'agtjiyp7vm5unv1lh3hqst47p0mle',
                sort: 7534832,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 400 Conflict, BoundedContextIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '859c4156-73e9-462d-bccf-9d7253054dfe',
                name: 'Sleek Steel Bike',
                root: 'lroeyxtv8ey7veldq9l892ysh6da9',
                sort: 80999,
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/bounded-context/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST iam/bounded-contexts/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-contexts/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/bounded-contexts/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-contexts/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST iam/bounded-context/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'e1c68c78-5e20-4ee2-8d91-7f696e12a314',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/bounded-context/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/create')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Handcrafted Soft Ball',
                root: 'd8a7zmn7jgs1jzj2dyawycbe1z55z',
                sort: 77790,
                isActive: false,
            })
            .expect(201);
    });

    test('/REST:POST iam/bounded-context/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET iam/bounded-context/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/find/8acf546a-3419-4e06-9321-161151e17575')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/bounded-context/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/bounded-context/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context/update')
            .set('Accept', 'application/json')
            .send({
                id: '147d5163-90c3-4273-bec7-203de37631bc',
                name: 'Small Wooden Shoes',
                root: 'qql6l5trmnijsbo8us6x5h15lpp6m',
                sort: 36345,
                isActive: true,
            })
            .expect(404);
    });

    test('/REST:PUT iam/bounded-context/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Gorgeous Metal Chicken',
                root: 'dieebws659tqoouof9hm36klsqw25',
                sort: 54922,
                isActive: true,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/bounded-context/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/delete/14ab22f1-e5fe-49c5-a4e2-40ad631898ce')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/bounded-context/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.response.message).toContain('already exist in database');
            });
    });

    test('/GraphQL iamPaginateBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginateBoundedContexts).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetBoundedContexts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Licensed Wooden Tuna',
                        root: 'm601tl68a9lpkdvkrn02eewh1idc8',
                        sort: 31682,
                        isActive: true,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindBoundedContext - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '94f1a1d6-2c04-4345-a755-e2c0b2431428',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL iamFindBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '8ff83b7c-828f-44ba-baf2-6de428951628',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL iamFindBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateBoundedContext - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'c9c9b01a-8f41-4df2-95f3-e0e8df7afc42',
                        name: 'Generic Metal Chicken',
                        root: 'pm3gaxuspvjtbcdukjiriir7j2l5y',
                        sort: 30102,
                        isActive: false,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL iamUpdateBoundedContext', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Handcrafted Rubber Ball',
                        root: 'n25hd60mvabad2htfmfyi06bzy2tk',
                        sort: 33232,
                        isActive: false,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteBoundedContextById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '679bcca7-904f-49b9-8e45-e77ba04042d3',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.response.message).toContain('not found');
            });
    });

    test('/GraphQL iamDeleteBoundedContextById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});