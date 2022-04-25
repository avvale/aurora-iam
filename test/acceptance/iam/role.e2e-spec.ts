/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
                MockRoleSeeder,
            ],
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IRoleRepository>(IRoleRepository);
        seeder          = module.get<MockRoleSeeder>(MockRoleSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Rustic Wooden Hat',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '4425c308-10c7-44b0-a27e-7708793306af',
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

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleIsMaster property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: 'b9665a84-4a3d-488b-b468-e73619d6ffd1',
                name: 'Tasty Plastic Car',
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

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                name: 'Generic Steel Pants',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '355236c1-4995-417b-9427-475e83e30630',
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

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleIsMaster property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '1dc4f09c-ecbb-480d-a538-9d43fe939bed',
                name: 'Unbranded Cotton Shirt',
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleIsMaster must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '0o7wix264nq3vduetf6988f0ttdvu8eg4wvxf',
                name: 'Sleek Steel Pizza',
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

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: 'fe0eabe5-0a9e-4eb9-ad96-102208a9f967',
                name: 'qqvkbsprpll02p23fyviifbpdnaxeims730btxc6434np4rijfiwwwsoxv77bmr6qididip95oqpamcak3mnjtvj7oshj16pj2k74hlgfi6gvpog30d83noskjxw101p1z9wekysbql3riaxwfrxd339a5mf7sfs7l303o0occo5btpin2nvp3c9znm0pssd7v4qan5ape9r35vyjxojkcy4t6co6sfxfp054q5h673ds3ph97nxtopzuhy3xytt',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for RoleName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/role/create - Got 400 Conflict, RoleIsMaster has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '0f050082-4090-4354-b723-1f904632deda',
                name: 'Sleek Plastic Shoes',
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

    test('/REST:POST iam/role/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
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
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/roles/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/roles/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds']))),
                );
            });
    });

    test('/REST:POST iam/role/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '1ecd59a8-344c-4004-97c0-fb39b6ccd922',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/role/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/create')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Ergonomic Soft Fish',
                isMaster: false,
                permissionIds: [],
                accountIds: [],
            })
            .expect(201);
    });

    test('/REST:POST iam/role/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/role/find')
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

    test('/REST:GET iam/role/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/find/8d25c416-eb5b-4a37-a410-7030f97f6d5e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/role/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/role/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/role/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/role/update')
            .set('Accept', 'application/json')
            .send({
                id: 'cb6105e6-8a63-47bd-940f-b523c02c9c49',
                name: 'Intelligent Metal Bacon',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/role/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/role/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Sleek Metal Ball',
                isMaster: true,
                permissionIds: [],
                accountIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/role/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/delete/3cb4ad05-62ee-4dee-8eac-14d1f1733b6e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/role/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/role/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginateRoles).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'permissionIds', 'accountIds']))).slice(0, 5),
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
                variables: {},
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
                        name: 'Refined Soft Chicken',
                        isMaster: false,
                    },
                },
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
                            id: '001e58f1-e4f2-4c74-827c-56f8d628f00f',
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
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
                    id: 'f2ab9817-d737-4bee-99e7-61605f131644',
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
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
                        id: 'f96d028f-7e60-4eec-873c-c48afecdf1ff',
                        name: 'Rustic Metal Chicken',
                        isMaster: false,
                        permissionIds: [],
                        accountIds: [],
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
                        name: 'Small Wooden Chips',
                        isMaster: true,
                        permissionIds: [],
                        accountIds: [],
                    },
                },
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
                    id: '9ced1fdf-dc31-4326-9fdb-1c14351ed45f',
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
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