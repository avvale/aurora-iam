/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '../../../src/@apps/iam/tenant/domain/tenant.repository';
import { MockTenantSeeder } from '../../../src/@apps/iam/tenant/infrastructure/mock/mock-tenant.seeder';
import { tenants } from '../../../src/@apps/iam/tenant/infrastructure/seeds/tenant.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('tenant', () =>
{
    let app: INestApplication;
    let repository: ITenantRepository;
    let seeder: MockTenantSeeder;

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
                MockTenantSeeder,
            ],
        })
            .compile();

        mockData        = tenants;
        app             = module.createNestApplication();
        repository      = module.get<ITenantRepository>(ITenantRepository);
        seeder          = module.get<MockTenantSeeder>(MockTenantSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantCode is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ code: '***************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantCode is too large, has a maximum length of 50');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ logo: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantLogo is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/tenant/create - Got 400 Conflict, TenantIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ isActive: 'true' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive has to be a boolean value');
            });
    });

    test('/REST:POST iam/tenant/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/tenants/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenants/paginate')
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
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST iam/tenants/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenants/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))),
                );
            });
    });

    test('/REST:POST iam/tenant/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c6e300c5-a774-4ada-9ca8-d5e4724100f6',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/tenant/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST iam/tenant/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant/find')
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

    test('/REST:GET iam/tenant/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/find/6338a7ff-7cfe-43b0-acdb-5705c3c41343')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/tenant/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/tenant/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '4276a2f7-4d10-4717-b13b-3bf26654525c' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/tenant/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Sleek Granite Chips',
                code: 'aza4g7tmmdtabygr9awvltjz7r8xelg6lsct9rdw89lddaf5q',
                logo: 'fhvc3nuysc7g8zyodrl4ooutpffjx4cfwis03cv927z3owk574i2hxz108nhk0yv2g4521jtldghlv9qkfb2pqo2ms6x3hm5nbuwxhtfd3qtutsiqf9xj651972nm4qgp7zc2p73n388xbrgmlld0jvws1d1prcxtdj1ckqxxfmpgd3krm1z37vqa5ivk583661odnlb78o8olhdg6w9ye8qfrwrdx3fdebarsqzlhqmpobic53l1f0ihtwpiu',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/tenant/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/delete/259119a5-252d-43b4-b62a-a18c68802800')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/tenant/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateTenant - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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

    test('/GraphQL iamPaginateTenants', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateTenants (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateTenants).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetTenants', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetTenants (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                for (const [index, value] of res.body.data.iamGetTenants.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateTenantInput!)
                    {
                        iamCreateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Incredible Wooden Tuna',
                        code: 'udlbsxxmfk0ug7vkhqtbxnley0b4co51bs2cbic8x3sg8hca2',
                        logo: '4ydh1758s6k77rbi0ezvttb6a4aqlj6f8cd4o88c46o5wz4zlb1b9ajlrp5pp55thms70ne179lpema7c06wfmsptb5iodhwn6njp4wptnzc4f6u88vhhvwllytbdfy83rgup483j1olvx4xxzrp1htdcec6k3k5cw0lltupi1oul4d8bcyrm35cppjfkv4chz2lzbv0rzuoe2v9ho9w6uqw46e0wdj0uqct7sxyl7xtr4wk8u0buedvb49jpy',
                        isActive: true,
                        data: { "foo" : "bar" },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateTenant).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindTenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                            id: 'ae07b5a7-d9e2-4125-80f3-45c8417d52fe',
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

    test('/GraphQL iamFindTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindTenant (query:$query)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                expect(res.body.data.iamFindTenant.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindTenantById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '033b27c3-f10d-4436-b7ee-df737b96fb92',
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

    test('/GraphQL iamFindTenantById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                expect(res.body.data.iamFindTenantById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateTenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: '19413dfa-88c3-45e3-9ab3-9d10eacdbf4d' },
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

    test('/GraphQL iamUpdateTenant', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateTenantInput!)
                    {
                        iamUpdateTenant (payload:$payload)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Licensed Rubber Sausages',
                        code: 'iqtlw54hurk6mdwmlqwhte1lo21leol6j34kh4p9dq2sw4yrh',
                        logo: '0gdpe3cokv7tnegzliu5eshk0imsxa3x17tgg5dqpkqg1a263r8k85wpepouslx5l7s61tr0rhadm6y2me4dw7l4nj1fbtz0dahcr1gkjzegl1r0r82nrzx7xqh4ulv9gh3bovj0jtih9gks71uz7oqdl3howytp8bca24uac9vbzuy7mfrrajduf4u7ceouef9pann5bsoehnaw7huap7t4zz4xnfks2k2hzs1d740lmnry382ckx11rpmqvh',
                        isActive: true,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateTenant.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteTenantById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3979032b-3d0b-479c-bcfa-ca0b3dbc35d2',
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

    test('/GraphQL iamDeleteTenantById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteTenantById (id:$id)
                        {
                            id
                            name
                            code
                            logo
                            isActive
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
                expect(res.body.data.iamDeleteTenantById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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