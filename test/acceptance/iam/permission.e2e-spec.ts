/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
                MockPermissionSeeder,
            ],
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IPermissionRepository>(IPermissionRepository);
        seeder          = module.get<MockPermissionSeeder>(MockPermissionSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Awesome Steel Shirt',
                boundedContextId: '1696bce9-4b3f-407b-b53e-4b24ed6332bf',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: 'f71bc232-9c25-4f63-89c3-8f460a7077ec',
                name: null,
                boundedContextId: '61e4a239-9654-42a7-82d6-becdf8a8ea77',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '6e9589d9-6c4d-465b-98b7-1e2601b97b7f',
                name: 'Practical Cotton Car',
                boundedContextId: null,
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                name: 'Awesome Soft Soap',
                boundedContextId: 'fdc70cf9-2d29-426c-b092-79f81005ffef',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '4a12b9d5-4a54-42fa-8a12-e38b775c5986',
                boundedContextId: 'e5e78d7f-7ff1-4548-bf6b-89dce50db196',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '4500d1c9-5e99-41f2-b1e8-a32595946365',
                name: 'Generic Steel Soap',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '7zvkcvz1iyclthahxr16oa3c48t38r59pma4i',
                name: 'Tasty Wooden Chips',
                boundedContextId: 'a5c5723f-fe08-41b3-946b-e315b1867fde',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionBoundedContextId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '3d3a26dc-18d0-46cb-a4ca-688fb926cc29',
                name: 'Small Fresh Soap',
                boundedContextId: 'fxd87mf5fmuwgy0ibgt7mstkq9pdffmjneybc',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionBoundedContextId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/permission/create - Got 400 Conflict, PermissionName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '152ed623-91c7-475f-84a7-e528ba0086ae',
                name: 'yjgb7v08ti1rax36e1rmk18xt0dtsowd0b72by8jvbtt1joq0d9obzxzs0o138w7vzjy1vn7lwpg47dgkn2hh4jhjhwt8m1kqm531g71pkj239yf89u4kb39k6ebrce6ll8e3ks5m3gw0bdgirlnh3zgw7tvssvn52f2k0ulpsht94nb6tuyz80myztgily3iafivckxmnfyytznd6x3mstj1agmiff5l5mlqhyt60fiokx263raibq6eyclbw9l',
                boundedContextId: '4aaca6f5-263f-4d6d-be03-411f29d5a57d',
                roleIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for PermissionName is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST iam/permission/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
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
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/permissions/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permissions/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))),
                );
            });
    });

    test('/REST:POST iam/permission/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'a1769ffc-2a51-4125-9550-70155282a72f',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/permission/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/create')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Intelligent Rubber Computer',
                boundedContextId: '94ac501c-64e8-4f92-8b9b-86e415982224',
                roleIds: [],
            })
            .expect(201);
    });

    test('/REST:POST iam/permission/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/permission/find')
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

    test('/REST:GET iam/permission/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/find/4d89920b-b54d-4008-b3f3-600e352dfbb0')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/permission/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/permission/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/permission/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission/update')
            .set('Accept', 'application/json')
            .send({
                id: 'bd03bd7c-7e24-4e81-a1af-1f0e9d5f84d1',
                name: 'Intelligent Cotton Shoes',
                boundedContextId: '6fbf0e1d-b653-40de-9fe1-15e98fb6548f',
                roleIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/permission/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/permission/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Generic Cotton Chair',
                boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                roleIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/permission/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/a09d0e4e-374f-45b3-89b1-27ad2a667592')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/permission/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/permission/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginatePermissions).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds']))).slice(0, 5),
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
                variables: {},
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
                        name: 'Ergonomic Rubber Bike',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
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
                            id: '2a5005c7-aa5a-435f-a9a5-9803fb47dc73',
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
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
                    id: '484dbcd9-91cc-4a9f-a2e9-485e95c0e83f',
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
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
                        id: '329d2a34-f87f-4251-8afb-465a0ac9c1b3',
                        name: 'Tasty Fresh Chicken',
                        boundedContextId: '028b1fa7-d18e-476c-bf36-e70e5fd48ed2',
                        roleIds: [],
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
                        name: 'Rustic Concrete Gloves',
                        boundedContextId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        roleIds: [],
                    },
                },
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
                    id: '69f8392f-31b0-442e-b395-0247c1930a61',
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
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