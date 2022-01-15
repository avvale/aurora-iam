/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IPermissionRepository } from '../../../src/@apps/iam/permission/domain/permission.repository';
import { MockPermissionSeeder } from '../../../src/@apps/iam/permission/infrastructure/mock/mock-permission.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('permission', () =>
{
    let app: INestApplication;
    let repository: IPermissionRepository;
    let seeder: MockPermissionSeeder;

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
                MockPermissionSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IPermissionRepository>(IPermissionRepository);
        seeder          = module.get<MockPermissionSeeder>(MockPermissionSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Tasty Cotton Shoes',
                boundedContextId: '9669f959-4447-4557-b1e4-534a8ceb6bda',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '61e18f7a-71d3-4f70-9a4c-80be00f53dae',
                name: null,
                boundedContextId: '70c49c29-d447-491d-ae31-b304f5cd5659',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'fc6467ef-078d-4582-83c1-35269b1b4a9b',
                name: 'Refined Concrete Chicken',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                name: 'Unbranded Wooden Salad',
                boundedContextId: 'a39a205f-20f5-4d5a-b952-9c203d74bb51',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '9a43d206-78b8-45a5-b733-19a6c4249813',
                boundedContextId: '7cc8a4ab-16eb-41e8-b458-4af993236cae',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '1e60164b-eb6e-4186-80da-9ccc20a7e246',
                name: 'Incredible Frozen Bacon',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'xtbid5opeoq6miii5yufiz8dl0sxerc03rpm3',
                name: 'Rustic Soft Bacon',
                boundedContextId: '798d35ad-ff29-499a-8dd3-507f85da5ac8',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '80f36a87-77f4-4b98-aae0-1831e16da342',
                name: 'Practical Wooden Pizza',
                boundedContextId: '64iuhpqb41ap3n7exf9sismbzln6uora3xage',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission - Got 400 Conflict, PermissionName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '54fa5d0a-b7a7-4610-8958-f59fb2083395',
                name: 'm5ohrqjzfvks1tuhvcqnv7w7p9ho3enawq0j7xvk39i0ap0o73ya4a7047h8uzy5hc3b2citg5desrlcp9kb1ysd5awwjo0qs20wqf4soohp2h6hkphrz4mjqmxbbhbnt8b1joe1a0zsc15myclk68xy9amxyyq2bjgxxu65cx4epvw0547d5dsvbrwqrgfre9mimz4h77f8djhpw589hzy9p5kubavp1dg5dejb1xycwty4nxrzbs4xx6kp8zsl',
                boundedContextId: '3333eff6-8a5b-4447-beb9-1c977f2da062',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST iam/permission - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST iam/permissions/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permissions/paginate')
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
                console.log(res.body)
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET iam/permissions', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permissions')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt'])))
                );
            });
    });

    test('/REST:GET iam/permission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '227d6ab4-49ff-47e8-8c43-550ad77ee7b6'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST iam/permission', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Tasty Fresh Hat',
                boundedContextId: 'a0e618b1-1df8-47c5-a037-8c5bce35fcfa',
                roleIds: [],
            })
            .expect(201);
    });

    test('/REST:GET iam/permission', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission')
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

    test('/REST:GET iam/permission/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/07d7547c-882f-4102-b6e8-c618f25ba584')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/permission/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/permission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: 'a26559e9-fe7a-4a97-9165-f518d1b2fc67',
                name: 'Small Rubber Cheese',
                boundedContextId: 'a232dfe0-197d-4077-ba38-9470450f5b68',
                roleIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/permission', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Refined Fresh Mouse',
                boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                roleIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/permission/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/96a0c442-cfeb-4692-99b3-74bc2bb7b59b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/permission/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreatePermission - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
                            boundedContextId
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

    test('/GraphQL iamPaginatePermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginatePermissions (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginatePermissions).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL iamGetPermissions', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetPermissions (query:$query)
                        {
                            id
                            name
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
                for (const [index, value] of res.body.data.iamGetPermissions.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreatePermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreatePermissionInput!)
                    {
                        iamCreatePermission (payload:$payload)
                        {
                            id
                            name
                            boundedContextId
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Sleek Metal Pants',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreatePermission).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindPermission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {
                            id
                            name
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
                            id: '3530a964-6d4e-4e85-8839-c79761b44844'
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

    test('/GraphQL iamFindPermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindPermission (query:$query)
                        {
                            id
                            name
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
                expect(res.body.data.iamFindPermission.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindPermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'af1fc65c-9666-4cb3-bc1d-2b841764ecca'
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

    test('/GraphQL iamFindPermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindPermissionById (id:$id)
                        {
                            id
                            name
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
                expect(res.body.data.iamFindPermissionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdatePermission - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '36c5fbd5-7c49-4833-8188-133b40f78433',
                        name: 'Tasty Plastic Mouse',
                        boundedContextId: 'f1d08fe1-9524-4b5a-b46e-a4c5924a6568',
                        roleIds: [],
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

    test('/GraphQL iamUpdatePermission', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdatePermissionInput!)
                    {
                        iamUpdatePermission (payload:$payload)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Awesome Metal Bike',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        roleIds: [],
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdatePermission.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeletePermissionById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {
                            id
                            name
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9a36234f-3f63-4afb-8a47-e376245b7b9c'
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

    test('/GraphQL iamDeletePermissionById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeletePermissionById (id:$id)
                        {
                            id
                            name
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
                expect(res.body.data.iamDeletePermissionById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});