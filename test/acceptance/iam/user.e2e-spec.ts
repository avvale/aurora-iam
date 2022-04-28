/* eslint-disable quotes */
/* eslint-disable key-spacing */
import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModuleOptions } from '@nestjs/jwt';
import { IUserRepository } from '../../../src/@apps/iam/user/domain/user.repository';
import { MockUserSeeder } from '../../../src/@apps/iam/user/infrastructure/mock/mock-user.seeder';
import { users } from '../../../src/@apps/iam/user/infrastructure/seeds/user.seed';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';



// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let repository: IUserRepository;
    let seeder: MockUserSeeder;
    const jwtOptions: JwtModuleOptions = {
        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
        signOptions: {
            algorithm: 'RS256',
        },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                IamModule.forRoot(jwtOptions),
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
                MockUserSeeder,
            ],
        })
            .compile();

        mockData        = users;
        app             = module.createNestApplication();
        repository      = module.get<IUserRepository>(IUserRepository);
        seeder          = module.get<MockUserSeeder>(MockUserSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accountId: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ username: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ password: null },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accountId: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ username: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ password: undefined },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ accountId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserLangId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ langId: '*************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ name: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserSurname is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ surname: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ avatar: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserMobile is too large, has a maximum length of 60', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ mobile: '*************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserUsername is too large, has a maximum length of 120', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ username: '*************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserPassword is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ password: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST iam/user/create - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ rememberToken: '****************************************************************************************************************************************************************************************************************************************************************' },
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST iam/user/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST iam/users/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/users/paginate')
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

    test('/REST:POST iam/users/get', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/users/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST iam/user/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '7cd90360-0808-47da-a9f8-c4d7d23fcdc2',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST iam/user/create', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: '5b19d6ac-4081-573b-96b3-56964d5326a8' },
            })
            .expect(201);
    });

    test('/REST:POST iam/user/find', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user/find')
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

    test('/REST:GET iam/user/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/find/82a740a5-ff2a-4172-8683-73e45c0bec85')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/user/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/user/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                ...{ id: 'ae8f945d-3dc9-48ea-99ee-9586bd007023' },
            })
            .expect(404);
    });

    test('/REST:PUT iam/user/update', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user/update')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                accountId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Tasty Steel Hat',
                surname: '4wfc03d8jsvkncjjpslzfu3em101xp7725p92l46rtejrtp5p7tn8t3n8ailc46i09i1gsbky9buuct57u0fdw0yrmdyfcc3315f4wgdxkc4sxl26a6w3387d4xavcx2xlxw3jd2bdb3u6wf6py3iq8rfvw4fl1gfpmj3h6b1t43mcvp1hivjf4ltrnjpgh7qoz3t7mfbvnpg9hbidxvcn8ig40pn8li0hfziq8gmkcdq7hp40gwc904uixl53',
                avatar: '2fad9gwceoyhrrcjxi6cpie2qu6e2et36wu8yu6x7564baotp6hvfu1atra55udu0kvoahtptwtfl7g02uz3w2do6azpcepcvk3r4l8fe82eegqc39vjju64atuxup78t5pr6yy1im47tm8hyudo5k2mkse625y43g6zur2lgem8v8zq1kspw2gx2r6jalys68yb6euxv14fyd8bxk01ss5h1yk0nxp0fdop09mnqpfky2cu8axrc4u27nf5fh',
                mobile: 'we5da8pz410mw901q6ynwh1cg93uxlgiehr3hzhwu0rhh6cs142iufjoq06',
                langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                username: 'xc1tgxjfyzt3lm3h30qeioebtf1u4vlj6o5jjbqvhcutg1saddvkwon5o07zi9knmv1upqmbp4gj1fjjy3eabov9t32a1qw5noa9vlg265g81h3l9vanmyh',
                password: 'sl4c7uyjs0x84cudzfpxf8cn5qa5qupq17qn3enlznnx82112hcvkz1gy7p1ej9i3cgxw1eqt1qnybrxiiqzlmbvz4hk12av6untnqvs2ms5g8ystjgr0wx2qxqdyslu6b83g9moor5h7qbacsz02txxdoljbal1kaqp3ncibsjm06ab4dk94shxwc7evyue2zyd7bu2zguq2rl3vqiw8e0vff50v05xsxfo1gfqyb1lrnvzk7cwjoxcfa3jq5',
                rememberToken: 'f1sqjujsz9r8s7s0xidgr9vetk0mxzfkb4vb2jb5xbhf8tyls37ul2k7i5om3anpvz44hcr8agnqny7qmgkkmcut5g4rrop8np2dnqv18iuld4k9a7nlobq3f2qivawep37ilzknhi5enw1gk3dvy06xmyca8a5v1v4ttzosqbho3ksssdgsnjq936y6qr3dn0ot449nxcv6w2rc20yk9va0r8t4g8jzixa0r6hpw995dj76yetilkq7r4pa91',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE iam/user/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/delete/98b8321e-86e0-4c2e-a199-74a702440d06')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/user/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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

    test('/GraphQL iamPaginateUsers', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL iamGetUsers', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL iamCreateUser', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        accountId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Handmade Concrete Cheese',
                        surname: '9dl5ig723l8q5b16jcowmfqjoqco4xjv6ibgi2s0ttgw9rgv3zt8pcwsrixfun9zfibb5653b2mqv2kk5a8acaxa2cuao0o0iwm9uf9khgloi4yv3zrsslx39nm6zsdjwn9ntauzsc7fz47ky3dpjoi6hi2tjtb06ao1w2sk9yuve8l1m2fkez9timo2opv7ay0uphy96izuurdiscad6tny4059oa9obd8m91zx9uwwdq89ggq02bdy5u0q0x',
                        avatar: 'jzxiav1tqzzzh4ra8gac3pt5enkjn93q53qxoc84j6x5tl6zszq5409eupwx4lc76hnk8kebydclxdy6k0uow5gsmzc805fi69r75ae53mwjx9dr3jzecc2hgvs45c0rdds98e3r28fj07se576h08x0r4t2umgqhy7k2jz8qixv0l62euj5vlzkt69qsrccfo4ptzdbdyjikkmjyi7kae4vpc6rd35oy44ujp643gbph4dzku3ycegy5nebpj',
                        mobile: 'ina0qpxwq20sfmmiz0y7ry3j80iimnqljwct62pb89pwqqevmenqxhnywsd',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: 'ew77m5ftzhgs4dmleo6o3s6i5dtiueps4ucc8o78b4zg64k8bjy63yxq3ei5bb5k7zfwwhkspipidmvmhtma2gz0gnjh3dgbgddy5e93m5z2oynerzb9bqr',
                        password: 'u8s70rzm0gkpzaovrij7semq0m29ratfwskj2e6fuz7apw81d44cavnj5d9pcy2jqa9jch8m2ffl9z5li5mw9qdhqk28euqgkcrpfe6l4qs2enghh0fh59yxbelyjw0okp7jjmxc0z1b3v2zc9hf5rc36r3k6gl2s22qnblpwi9ew1okhobfeqtlgg0wog2sg18vccdba4uaxhqtcerw5y1g0d6nozp4iyi25ajepwdvfvvrravw4147uha2mg',
                        rememberToken: '9bp5t9i9zid2ung7os0y1luyz46sa86c789fgww9l566uqsp01tnbrcmjbgog2v46ycpf984rgv8znwu0k6ewwdofh4138146k81gqj7y5tqnfn7c4rrp1hxwadnr05kkwr2utr8awgfevn8vkw5p65v9p3ce5lm104tiq7ztepyk40wfy8jws46fa151569sdgma5ui6pmfpe0uloghxyz6trlskc9rbl5ewm7a06ltjkhal49au6zvpx1yiy',
                        data: { "foo" : "bar" },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindUser - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                            id: '630403dd-4aca-4598-a147-5e0c009fc110',
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

    test('/GraphQL iamFindUser', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamFindUser.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamFindUserById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7c46cdd0-dd6b-4285-9664-06f4c9a65a01',
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

    test('/GraphQL iamFindUserById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamFindUserById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamUpdateUser - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        ...{ id: 'ce1bc5ca-3807-4d07-af33-2dd7c4e7e5eb' },
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

    test('/GraphQL iamUpdateUser', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        accountId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        name: 'Incredible Granite Keyboard',
                        surname: 'gqovubh1u55bi468vda5ktrfwz8va5n2sqsmhs6ysedacgm8evegch7ohnwmxhcgvqgzvacqmkhjyrsuq56mnf53ttttqv7aayalmdxy0i1zhziyo8fk1vadufuh2bzlr933eqfgxeiy4g0j4er9pvxjemqdtp8l4774ehyjxlfdlf3vj94uw5o69bmq26k3gieezmbbcts0ds49mk0v98oauibgcw4er18ybvoslggp96o78zmsh5zbfxlcu5',
                        avatar: 'jopx62plzems3boi5ja4eybp0aenubqih3v43ynshxjzs0u5pk6cnmzkhf7ykibj707k2l3zwqtvopeq2rkmhctn8bpo32r6ehms4p4czqpr952a3cklv82zaq3f6mkkpan3k5lxuc908062o66oslles7rwhl68e38axcyq36a5ct820rls9t0v4uvx7m23iy2e0m9sg0sku5qnbfpl0yl1g4xvlp7qs3av9dd9ogaauf8wq249zcpv1imssh',
                        mobile: 'mml4wnvk2gyk4e3hxvqh6a7ck96naasqzstr0n57lbpcjn3ujdxfqqrlzbm',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: '7uag1irvhaeohf08o0xztkuazaqnvy5cbp6xe9mjlc57a9a9l8bxgvvhc2i8imekh0c20fp0eyl0oji91q4qc4gzsmvjnd7mkd9np3iqeujm1k1uqpv9msz',
                        password: 'sffpspc9bhuus9w98tgkg152w2yp7cj7maaalc6z79c4o8c74gbt6dqxrhgwkg08l7i2eocui5uay3ajmjgrtz6b5cyi72sw5e04hwnj3ml51q8sj7p886hjmf0lqed83887h0g9wqdy1jx3c91hudkrjfe76gtdk7skimvelsujy0ggrf9mwzt6beiifkm1bk7lzcy45ev5e1b90u8f4hposolnnjeh3qzarr7wnsczyx6xjiyg9i4brsv2e8',
                        rememberToken: 'v3qslbo9adg7ub12f5214md6kqnwwm7zbd47toxk9f9lb4irxkhl439ymffx25xgkvhtiq1xau13lu1v4d01vh5tce5wy926ly8oz3ehpgjs2lc3wy4yrjivmsl26jcxvsssfbw1g0x2bfa6hi7vqvziz1agfh1uapl7vocxrru3fvkbvq3u0pnhst1l4ruwbuvuywo1ief6i8ylnbcb2yerjghmxss0mc0xf3agwqk1e70shp9gcjmzdy51mp',
                        data: { "foo" : "bar" },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL iamDeleteUserById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '11679c38-f973-4f3a-974c-e68329207df5',
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

    test('/GraphQL iamDeleteUserById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
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
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
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