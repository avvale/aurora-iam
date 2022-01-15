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
                name: 'Ergonomic Wooden Chips',
                boundedContextId: '432db722-592f-4b1f-bcbe-e80c70dca9dd',
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
                id: '66e89c7e-ccdf-425f-bf40-f58012a7fdac',
                name: null,
                boundedContextId: 'c421c35a-a19f-409d-bb03-26091221edf8',
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
                id: '6d6e2747-5f25-4418-810b-ab480b54fd2d',
                name: 'Incredible Soft Bike',
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
                name: 'Ergonomic Cotton Bacon',
                boundedContextId: '8871eae6-2bb3-4032-a3e0-df2d7ea5f733',
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
                id: '8bd14a3d-5bd9-4e58-8ed6-132380736afe',
                boundedContextId: 'b9e7d4bb-4993-45c4-b493-a8ab79ed259b',
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
                id: '1eda61b0-55a0-4630-8156-d5b345fa69df',
                name: 'Licensed Metal Fish',
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
                id: 'r5ntmdxjlqshbb7gxocz7mo2no46vs53vx0k7',
                name: 'Small Wooden Fish',
                boundedContextId: 'ddb99823-9be2-4a8d-9a1c-5939652d3aa1',
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
                id: '7a5fead0-1c90-4a85-80e1-652094050fb9',
                name: 'Unbranded Metal Bike',
                boundedContextId: 'cyk1ugk0jncr9jzqrlikm8nlqitzsiupp4zoi',
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
                id: 'ed93584d-8ad8-4e0a-a6e7-05ae983b507a',
                name: 'nqyh1p9k3wdyxu4x6pdx47njr5oedevgalo7wgjl4x8tmwgs0gud0an16r7n485okml32h6iv6z9wdstcq13705qhy0zh8cdy21kqxbmtbhvrtbon76mrg4fb7blzbiltyzlsxkrxubzd14pz7hs476fjqdiz1tlooxxbf9ebarcev1tcl3s8smrtwfcrhlumow91b3mdxtmxdfdeujei7g3dfeidvbzax778ki87w989twnbi0dp76cimpl69y7',
                boundedContextId: '29ca53a8-a503-4c77-8302-2e2fa7bf6fcd',
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
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds'])))
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
                        id: '726a685e-6aa6-4485-8eee-65ed3a1a5f33'
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
                name: 'Small Metal Table',
                boundedContextId: 'a6dfef70-8eda-4df0-8c93-12720fe61b07',
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
            .get('/iam/permission/e909bcf0-541d-4ba0-bb13-6a7688d7276e')
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
                id: '321de990-8fb6-41e4-8791-86b3f10ad34e',
                name: 'Rustic Steel Salad',
                boundedContextId: '28b515d1-4504-4c76-8831-847dafdd39eb',
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
                name: 'Awesome Plastic Pants',
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
            .delete('/iam/permission/fb55196e-6d44-42f7-a7f8-d381d6734b64')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5)
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
                        name: 'Awesome Fresh Hat',
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
                            id: 'c7d85ba1-8bd9-4e60-acd8-681fb95c7016'
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
                    id: 'ba006fab-1646-4ec3-89a4-1959780d3da4'
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
                        id: 'c2c9d1a1-3e66-4595-bd5e-f03d6d90e3cb',
                        name: 'Small Concrete Soap',
                        boundedContextId: '5978065c-8f36-4bd2-92ed-51e67dba0c82',
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
                        name: 'Rustic Concrete Salad',
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
                    id: 'bfba2919-1be7-479e-83cb-bb57da9b6c53'
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