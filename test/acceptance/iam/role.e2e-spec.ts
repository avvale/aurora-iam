/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IRoleRepository } from '../../../src/@apps/iam/role/domain/role.repository';
import { MockRoleSeeder } from '../../../src/@apps/iam/role/infrastructure/mock/mock-role.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('role', () =>
{
    let app: INestApplication;
    let repository: IRoleRepository;
    let seeder: MockRoleSeeder;

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
                MockRoleSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IRoleRepository>(IRoleRepository);
        seeder          = module.get<MockRoleSeeder>(MockRoleSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Fantastic Granite Chair',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '67c3c7ea-55c9-4ee9-af91-d0c4ebff0e19',
                name: null,
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'f4c7fa84-28f3-413f-bc2a-807d6c649c15',
                name: 'Ergonomic Soft Soap',
                isMaster: null,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be null');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                name: 'Refined Soft Salad',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'ca286f76-341f-4d12-9272-b2b1cc3db51d',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '311f282e-1540-414b-93c2-093e1990acf4',
                name: 'Incredible Cotton Shoes',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'xg99ulzwyk5vesgzon04mrxvr0oso0kja2or5',
                name: 'Incredible Steel Chicken',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '76f167ca-bf09-49e1-9eaa-3fd3eff4063e',
                name: 'k6gr2n46zp9go9yy4czt2wrw5voy9ekeld6mbyd5c2hyoia7h6o4ndjd6m9mnffero2rlfwqexfa538exytjy9cxxe71ihibfzqpfy1egbij0bwimjo8kf5j7a8yefpnscohbj8hp1c43y3w25nij04uatmrwwgffua45v054e3wlfupxsnkcdcpx4m6w8r6csk585ref0mlhhn6pzbdafutg47xg1m6zkzxxacwnzgjzutr3hj823ty7gwc72sc',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/role - Got 400 Conflict, RoleIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'fcc0dd7d-de59-4ff0-82f6-5178773cee0d',
                name: 'Gorgeous Wooden Tuna',
                isMaster: 'true',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleIsMaster has to be a boolean value');
            });
    });

    test('/REST:POST iam/role - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test('/REST:POST iam/roles/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/roles/paginate')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET iam/roles', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/roles')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds'])))
                );
            });
    });

    test('/REST:GET iam/role - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '3f55403f-5099-4739-a4ce-882920e41998'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST iam/role', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Rustic Metal Pizza',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test('/REST:GET iam/role', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role')
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

    test('/REST:GET iam/role/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/6e2ec4de-1759-463b-add7-b37a368ef3fb')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/role/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/role - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: 'b9f8488f-4419-4ee0-be29-bd90900441df',
                name: 'Gorgeous Wooden Salad',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/role', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/role')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Awesome Wooden Bacon',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/role/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/0e25f3b1-0771-431b-b20d-553a0d9b3294')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/role/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateRole - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
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

    test('/GraphQL iamPaginateRoles', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateRoles (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateRoles).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds']))).slice(0, 5)
                });
            });
    });

    test('/GraphQL iamGetRoles', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetRoles (query:$query)
                        {
                            id
                            name
                            isMaster
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
                for (const [index, value] of res.body.data.iamGetRoles.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateRole', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateRoleInput!)
                    {
                        iamCreateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Awesome Metal Chicken',
                        isMaster: false,
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateRole).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindRole - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {
                            id
                            name
                            isMaster
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
                            id: 'd31c88b1-167a-4dca-8f10-a159a3d2d388'
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

    test('/GraphQL iamFindRole', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindRole (query:$query)
                        {
                            id
                            name
                            isMaster
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
                expect(res.body.data.iamFindRole.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindRoleById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '0230e26a-f1bf-4c92-9f66-61512a10e4cb'
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

    test('/GraphQL iamFindRoleById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindRoleById (id:$id)
                        {
                            id
                            name
                            isMaster
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
                expect(res.body.data.iamFindRoleById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateRole - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6c8d7337-d09a-401f-abc8-4793dd09d533',
                        name: 'Licensed Concrete Tuna',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
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

    test('/GraphQL iamUpdateRole', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateRoleInput!)
                    {
                        iamUpdateRole (payload:$payload)
                        {
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Gorgeous Frozen Chips',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateRole.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteRoleById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {
                            id
                            name
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'cd11b19f-76b2-428b-b0de-1f73aac5bbd1'
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

    test('/GraphQL iamDeleteRoleById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteRoleById (id:$id)
                        {
                            id
                            name
                            isMaster
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
                expect(res.body.data.iamDeleteRoleById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});