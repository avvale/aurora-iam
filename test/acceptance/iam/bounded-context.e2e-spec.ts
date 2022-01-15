/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
                SequelizeModule.forRoot({
                    dialect       : 'sqlite',
                    storage       : ':memory:',
                    logging       : false,
                    autoLoadModels: true,
                    models        : [],
                }),
            ],
            providers: [
                MockBoundedContextSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IBoundedContextRepository>(IBoundedContextRepository);
        seeder          = module.get<MockBoundedContextSeeder>(MockBoundedContextSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Practical Metal Chicken',
                sort: 915909,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3fb476b8-be6a-4fb7-b97f-77be16640f11',
                name: null,
                sort: 584517,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'ba884233-7c79-4d34-aec5-dd53546233ab',
                name: 'Sleek Cotton Car',
                sort: 436125,
                isActive: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                name: 'Rustic Cotton Fish',
                sort: 154637,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'e42a7f08-4bca-49a4-8816-82a1b7b28956',
                sort: 129972,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'e03135d8-5bcc-4569-a375-0e5f46ea91f4',
                name: 'Generic Frozen Chicken',
                sort: 569727,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'nernmmr051qqbl4h3pcfo6et7hpaw2qj2wkxj',
                name: 'Generic Rubber Bacon',
                sort: 337189,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'bae99fb5-49f0-4e6d-b190-9ad7214445ec',
                name: '8fgfwtonuvcboyy9ovtrfiepf89gxdjfhvpeyyqwlyjhtrm5r9ckfd9wqelwu923nqcbhg8uxn1hhzzbl4dnr05qllpa445d1t9cgk5bz27fh8fr376x3aasyb11qtd54w4jn4u5fk5b21hk4m6c1cvwkoqx4x82pju7moqo1zthjqb3x78njckiaaa9zm6d99thccunxk7j372adphzauydchr3d5woszcltc5qgz4dfquhtzpawu7h65ewv0x0',
                sort: 160206,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '206289d3-bb80-44cb-85a5-7790cd145cb5',
                name: 'Licensed Concrete Cheese',
                sort: 1710693,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'b2baad15-be36-44d2-a5b7-becbfe9768dc',
                name: 'Handmade Metal Table',
                sort: 332668,
                isActive: 'true',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
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
                    limit: 5
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET iam/bounded-contexts', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET iam/bounded-context - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '8a21140a-076c-46de-a61b-f031b35e75b3'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST iam/bounded-context', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Fantastic Wooden Soap',
                sort: 416790,
                isActive: true,
            })
            .expect(201);
    });

    test('/REST:GET iam/bounded-context', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:GET iam/bounded-context/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/a4ca8e1f-d248-4bc4-8688-dc9820e9ca39')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/bounded-context/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/bounded-context - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'b5262c7b-7747-4470-925d-0265795b6bad',
                name: 'Handcrafted Fresh Salad',
                sort: 320313,
                isActive: false,
            })
            .expect(404);
    });

    test('/REST:PUT iam/bounded-context', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Licensed Wooden Salad',
                sort: 736020,
                isActive: false,
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/ea374718-0bf3-4a30-ad0d-6548824fad30')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/bounded-context/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                            sort
                            isActive
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginateBoundedContexts).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
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
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Tasty Concrete Soap',
                        sort: 316884,
                        isActive: true,
                    }
                }
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
                            id: '5a698e4b-f224-4d26-b484-b0d827ba4ac8'
                        }
                    }
                }
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2d91bec4-0e14-4b0e-960c-1f628cda9cf0'
                }
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a43fca3c-e398-41cc-b72b-71e3d7b2b043',
                        name: 'Generic Plastic Keyboard',
                        sort: 284976,
                        isActive: true,
                    }
                }
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
                        name: 'Ergonomic Steel Shirt',
                        sort: 396232,
                        isActive: false,
                    }
                }
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '851d2121-88f7-4a80-bc2b-0fe543b387f8'
                }
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
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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