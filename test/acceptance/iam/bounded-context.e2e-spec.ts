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
                name: 'Licensed Fresh Soap',
                root: 'd975eml5xk5n4wrq72kaj45vnyr0es',
                sort: 550761,
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
                id: '4f510910-1a91-43fa-be42-8da5c0acadab',
                name: null,
                root: 'myu4d3mfckzn0i31mlwnpmnl8os148',
                sort: 504511,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: 'aecdc85b-f7e0-4fac-ad35-332b8c8fb687',
                name: 'Unbranded Wooden Chicken',
                root: null,
                sort: 122600,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '620b3bd4-e601-462b-a969-9979366fa6bd',
                name: 'Handmade Concrete Shoes',
                root: '774mukebezg0csmemyh5f4vmo6c0n1',
                sort: 567286,
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
                name: 'Generic Concrete Salad',
                root: 'dvg9qyuiyqjeld0qfkm56b1aprzn0v',
                sort: 654411,
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
                id: '2506421f-0856-4653-93d3-5280d11c0d4a',
                root: '6bdf88ss0yfbubqkvhkhgk7kw7mq1n',
                sort: 404157,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '62a24a82-4c69-42fd-ab07-12d275e61b04',
                name: 'Ergonomic Concrete Pants',
                sort: 784631,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3e0ad376-f98c-493a-ac7f-38c4cc6fe8d9',
                name: 'Gorgeous Frozen Salad',
                root: 'cqv1rmhwuv947fsy16rx7n50prr0ta',
                sort: 155350,
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
                id: 'pvor5fntpilya5nhro6lwftm77tqy7hz48qxh',
                name: 'Sleek Rubber Bacon',
                root: 'ml0ncdcfcklod9uljtnjk7e90z9ygo',
                sort: 163466,
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
                id: '1a891b39-5fbc-4d2f-a71f-6f0ebdface76',
                name: 'vg2nggxdajrl1r05xamsd0vrayvdrtjfbqefk7tgh2sdhgxi0yfq9baa2jfsnohmbssjrx0br5mv8be8jhg1o27wiogrr65ep4ojgfs8nvp3e4wrbgvjat4fh2ddvhminq6gfe0ry1bmwoy9bhzitdxqwbtcn1r9nbm4d8x2gfpd6s8rtz3cp0kqwbw1w26yygz1jxbh4xuc4x9fw7hjqebdu4duyje59qjoradd82yingdzlns3rlqzf2vm3dt4',
                root: 'rhs4nlnbzikin1dyx39irleseq04t1',
                sort: 581705,
                isActive: false,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '921a0dc9-a4c3-4fd6-be16-92ffe003828a',
                name: 'Awesome Concrete Soap',
                root: 'hw3tk5hnbrkinji92chlyo1m06b5jtr',
                sort: 766765,
                isActive: true,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });

    test('/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '8d7858bc-9496-455e-8a50-ee11029893ec',
                name: 'Tasty Rubber Bike',
                root: 'bcy3lcqlecx6uf5tgjqov1kmvw6tq5',
                sort: 7535989,
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
                id: 'e248c5c4-453f-49de-a83d-403d72173e2e',
                name: 'Licensed Steel Car',
                root: '5atnm9g5giefwwap366o88jo0i4gsr',
                sort: 827182,
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
                        id: '6c68192f-98ff-4e84-bfb4-0c901bea30a2'
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
                name: 'Gorgeous Fresh Cheese',
                root: '3g0hxexeabzwn3b1ns0qtkt6xoxc1l',
                sort: 773008,
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
            .get('/iam/bounded-context/2e777912-47b4-4a97-b3ca-08f620385dc1')
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
                id: '0ad784f4-a305-4ac8-9551-395a228bb6ff',
                name: 'Handcrafted Steel Computer',
                root: 'ci3i1v1wigkhbrq8ebeind1qyyovi9',
                sort: 296770,
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
                name: 'Fantastic Fresh Gloves',
                root: 'b9y1f0f5fye65fkwhx23d6mbq4mzfp',
                sort: 884052,
                isActive: true,
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
            .delete('/iam/bounded-context/5913cdf7-be7e-4f99-96c3-4b2d00f00540')
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
                            root
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
                            root
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
                            root
                            sort
                            isActive
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Practical Rubber Bike',
                        root: 'setqtkcg8v61ga887rjm8b0eh7cp95',
                        sort: 727428,
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
                            id: '7ab86735-f97d-4ebb-ac2e-5b7253931edc'
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
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '2947b7ea-510f-4b4d-856a-8f62da3ca53d'
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
                            root
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
                        id: '7661642b-13a9-4eb1-a9f8-571a5a7daedb',
                        name: 'Awesome Fresh Bike',
                        root: 'pdg4cbwpnsigg8sxsr0g5ids5sj26c',
                        sort: 166073,
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
                        name: 'Handmade Rubber Gloves',
                        root: 'fclhvcg0bqtupgge4n38nt4s7euk2f',
                        sort: 458503,
                        isActive: true,
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
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7220cd31-1bb6-4d7f-b472-af62170d9f62'
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
                            root
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