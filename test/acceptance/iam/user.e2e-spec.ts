/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
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
                        id: 'c540fda7-c3fc-480a-ad83-232c36baae01',
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
            .get('/iam/user/find/b7bca8c6-ea25-4f93-9a81-3c244797fba1')
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
                ...{ id: 'e141ab8c-35d6-40c6-9f81-a0ad4d7805a4' },
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
                name: 'Practical Rubber Chair',
                surname: 'd11avkj1jfw5ibuuc1b1r6h6ch31wvpkgw27g5flr00laupczj79sls2mv16hngkjph0dtrehfnxjq9htj1ziabbg36xhqw3dsb9ub6hsk81gagigs0z03aln2tzdlavvnrf2ctn2hrn8ri9k8qfyhih27h1yzhm6au3rj8y0af560ujayv05tmkekbmltbfg1zq0qw8zzajxaozgxpr663qlo9uq8pqw4521v2lfe0tytnwhpohkq5mpgw2tr',
                avatar: 'rn68fzicrbpk0bx2tbhcj1137byu08mer6ldv3bp2ab8ptegnuwitgyk1xgkexayan1qmc6iyegadgor081j7ipwdm5s9ph267ls33p7j0l0f464q08kxtaxnzvf7b28hkx94o59z4lbsm13i88osb1vp2ifz5inp68spmefm2z4w1ddk20ghmp29g5lgrl9wcsip2wgpj0qqrg3watxbtlxgxpjxr6nurm1uvlii4h7ffsxb0frbx575kmadk',
                mobile: 'i00vmyk2xbtf0e1wibtfopxjf944t5k94lxbsjfxlq6qvynvy0ymsvfupdo',
                langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                username: 'cpon5uidowp0b2zr0k6xs9c7f5bi5lav2c14l3chupq98nkz5xx800amvffcjfa9df638ej0kdsiw9e1y9ygvu1rzv3jeu9rx6f5zer7xr009qpa9kgfmla',
                password: 'd5stvi7hil0rjvlsch8ww7mjywfd1qfnmsa4uu3xa7jia293u1yj34zrrgpcunf3yrhdshah3u6ykfq2hz9xp1x31jtv7rcm7beccmytoe5gyusoe5p41ut1xxki9hsr0jxgr7hp6z555nnq07avmil4asmw322i0k6t0d58lavsnpjbm1spujyefnb1rcw6oja368cin2rv5n3myou6k5z6m8k0ecoc41juujuefs2juwlalcet2pirm16mxh',
                rememberToken: '7422j9c4632145lu4romlkbvdf4hslsymhdhamhy1x1xo5p4its3clvmaiuei1vsdoem0eff3zrhmjeo3r4w4xk9v6748lrm5zoto72xdepvuu60ym8sv3gy64tpuvzgyppl8wqtzajns685o8yxe8c4xs16uux3zi3b4sdfbhslsd3zhcqrxxpi6t9u46aqadv83gp2kkr73d3g7ik2op4xmyovv0usvllvk7wquujpsxavaf9xc5uyisuwq7',
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
            .delete('/iam/user/delete/87421547-f8d9-46f8-945d-a4c19c648bd4')
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
                        name: 'Sleek Metal Cheese',
                        surname: 'q85r93v3pytdb5x2nyic6tmg34fp4qf2j8bn2ry4rvpgzh7vdl5z2wxz0ehtz2jgcml2tun93opfks3bates1iqxhbuyt0hnotdpw4vsgy1visy7yxmms8ocexf2gwnofg9sqwnlvedkgud6lyoeofxhpm5s6ydq9wpe5pnowyuhru2an42quxi4vbxukdske5n112uc7q2hntgihd9wde2y250i264mptkkk6o8xvgkuahhnsjr3wlel6vhg0',
                        avatar: 'u4dzt6w4o2ok3dw08q4ukx55oshx54f1am2py38u31suebzmw7n68yq77aoyiz8rm28p7fkgvbyrlggm2rqxf8221ugn94ie1zir5j353jbp5iy88wdn0zf30l6gwd28m0p0vqcpu6kk5t37wxlm9lljlowdwpd5spatvfy5nbagf3qb59d5vcclaxxtwcuzcgfdp77zrcf7u9on28wvlax081khx2w7mw9engf3p8pyz0zrilag9z05z6yr2f',
                        mobile: '3zh0vwb0gv7jib4sgabynsgjhv5maqqclh98ukjdiaq475yreyqgv4on15j',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: '1rjp8cfgsxkad905nwepwqyv21yjelww3k9rif6tu59va4tsk8nwv8yvazmx1pfwbyvy8dk9xn233908u4frfvxotqm912llpwxkh7x3mq36ov6of67bvqs',
                        password: 'rawxmue2llsxpx48ckzg4c4dhp11t0001ef361i77dtj1j768j3eenaov8kygch3mjjge1lw9qopmxw8mp58qtgi1792g9sez6shhmbq743d05cgstoxrxdj08knoaeq562je69h29fwsjkygsn3y862u5whrhx2mujj88ypsc56kc40rcr11r4mwne4fubu09vvem3qxwbrrns42dsqdmu8b7z1tno9oyru4ppjs8xn3kla2sj57khs26g2al',
                        rememberToken: 'xcfba2m2pgzuw6aq5hoanozy5gal94l3ukwrcjfm405y8fk2jxerquh8qdjn9kby6ndp97sialcqeamrwlntedsx2fo7xa3x48kb8hblr8l998zrep1bfojcnbzz0ugvttludh3dff43xcxw800x1oawoljmm2xtolvzxk4il1p4n4g30pmuci8aobcz0lz4sjyubuq1mhgr3gvj1wowhtkcxpkiaymg7np4vjguvshtapni4tfxa1b2ofe2lv',
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
                            id: 'c1e0d841-cff7-40f3-bb62-11978ffec154',
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
                    id: 'd7a69aa3-b753-4414-85f0-ab9ef9b7bc78',
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
                        ...{ id: '0e93f2b7-94fa-4cfa-ba12-aa4134b6980f' },
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
                        name: 'Sleek Soft Bike',
                        surname: 'n2mdsdkvnsrytlsbrj7idphxf8vgz4me4qu77qvnj039rg4shobqb0nhv4dp2a9iq0crgutuq0bc4f068x8re7tp7ni6q56zt3fog2ikxmravt45d5nn76yt5pxaqn24wa39g81trcqk15plstn3g6hcealpmnfqndzj08ahvlipu4mzir2zy30xmmf8853a2kx7bqtxy50byc8oq9ksxboy3tckwlq2halkvfo4diqceceagqv8nntvfrk5yb',
                        avatar: '0yl1mwhhdm0t786hyjy7334ipn6priecsal45goefjv791twwyzwcnd0hrdzoxsf2dc0xmd4qrde8ed2bkhjmuxcy17qfcwxw8lp8ilxxpw9zglgco17y3y4ajwagyi5ijfj2j0ourx0ormzsgcv8pit7ewh5loldsetjtwk6n6lfphcpjb0lb7buapytfpjd6to5hlqg54bg6pmi9cb4jy7r8djz5ucaveye0ia6o5ll9bz6agwq9scdinl94',
                        mobile: 'rh2jy0s047kubdbotrl0pyskotke3kwwbmr5ckbehrn6mp20bglp1niesye',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: 're59nxbmq1lzzmoeawj0uhe0qmqeq2rwhcj8g0sjsaf88fgjjn3jx2gn1m8tw96otbp46oi10nfqrp77sc19jbbvmov3lyhn7y9l3uhgcadqz7ombdlx3j7',
                        password: 'aq66kwlxtv41a18xk076usvj85nif6rmv6ezwpgcb2plcj9zehyac6n0ay2v7f7rf6toknevzj2mcgm2yxyb19zixxs2k9349bec396vegoinnoamfok5cb4f6heezuu3sod9i457jbhn1e7yyorgwkg4sjq9ptlfdv6h5ehwbta3661wkrs0q4r0i86eb14576qbzreperg12agl2gre5kwq315br7o90p9al3fpds2rsz32lyku3jmpqkydm',
                        rememberToken: 'zvddq2l4x7n6gi2j2betdo3o2zbssbbx38icflz00z8azvzkub6xrqiqt6v1szvumotng7wo5d7z2m15oud273xd2o1ald2othyptkg8xdi6tnq5u8lw3uydac9r3c2maefxurvleksdynifrysrbda3j5zb76w990emih1h4c3q0zrpxu4uqcs5whcuujbooug2uoo2ba3galuq130qbatrrrwb91c9d6wsm6fcy8yrr0lsyedml9q7evdd4j',
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
                    id: '1d14c623-564f-4aed-a404-e1ece9e38b20',
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