/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '../../../src/@apps/iam/account/domain/account.repository';
import { MockAccountSeeder } from '../../../src/@apps/iam/account/infrastructure/mock/mock-account.seeder';
import { accounts } from '../../../src/@apps/iam/account/infrastructure/seeds/account.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import { IamAccountType } from '../../../src/graphql';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: IAccountRepository;
    let seeder: MockAccountSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

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
                MockAccountSeeder,
            ],
        })
            .compile();

        mockData        = accounts;
        app             = module.createNestApplication();
        repository      = module.get<IAccountRepository>(IAccountRepository);
        seeder          = module.get<MockAccountSeeder>(MockAccountSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ type: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ email: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDApplicationCodes property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dApplicationCodes: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDPermissions property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dPermissions: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDTenants property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dTenants: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be null');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ type: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ email: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dApplicationCodes: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDPermissions property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dPermissions: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountDTenants property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ dTenants: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ clientId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ email: '*************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });

    test('/REST:POST iam/account/create - Got 400 Conflict, AccountIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    test('/REST:POST iam/account/create - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ type: '****' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });

    test('/REST:POST iam/account/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/accounts/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/accounts/paginate')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/accounts/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/accounts/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))),
                );
            });
    });

    test('/REST:POST iam/account/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'f410729b-e4f6-4eb8-955d-c655d4f48fb3',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/account/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST iam/account/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account/find')
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

    test('/REST:GET iam/account/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/find/e2946b9d-d4df-4eb5-acd5-f62bfaff7709')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/account/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/account/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '0f1c4ab9-5932-4b39-994b-e5a0fb0ec1f8' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/account/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                type: IamAccountType.SERVICE,
                email: 'b2re1mjtrn2x4907x5yqnt68px3mun6zmnuxigb4hk68on7k7jlc6920dbk80q50s29lnmprtm2vlzrhnw6740z5bgzmiwh4u18kobykkrx646058cksa3k',
                isActive: true,
                clientId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/account/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/delete/1cbb105e-4bc3-497a-8b99-6b5970b3b4c8')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/account/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
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

    test('/GraphQL iamPaginateAccounts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetAccounts', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        type: IamAccountType.SERVICE,
                        email: 'q5y6kmm9y4kdhbnuu46s1mwux13yjl9irxet7hky9ax67h6qdwclvqz32mikj7v7v2cp783wukazr91k2btleyjxghtqppa761t5bgfwtb2shz90jp76xqh',
                        isActive: true,
                        clientId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindAccount - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: '12330468-8612-4328-8a63-7f1c39139cfa',
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

    test('/GraphQL iamFindAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamFindAccount.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindAccountById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '74a3b746-5c5f-4458-be56-c1eb5b779e94',
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

    test('/GraphQL iamFindAccountById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateAccount - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '685c20c3-db01-4283-8b30-359ccdb25a00' },
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

    test('/GraphQL iamUpdateAccount', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        type: IamAccountType.USER,
                        email: 'fwj24akp31e2nu2zjr6f9ywj8pn0h0tgr6v3nnc1wlf83w0kz1jf4ne3ems8uzgawlkdfznh3mco89jcv67rxy1zftovx5slvgpmo0yyj9j18od3tgs3q4p',
                        isActive: false,
                        clientId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteAccountById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '6ca769be-78ee-49fb-80a0-bfc5e0cf88d8',
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

    test('/GraphQL iamDeleteAccountById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await repository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});