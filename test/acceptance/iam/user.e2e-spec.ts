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
                        id: '3f33f09f-7e95-4a0c-8944-ddbe669c2e34',
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
            .get('/iam/user/find/4b340c13-0bf2-48f1-9dce-303a9069685d')
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
                ...{ id: 'afa9e27a-9349-4afe-9b1e-741b6f1a386b' },
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
                name: 'Awesome Frozen Pants',
                surname: '2s8qv281qbbdrwhz9vksg2qyubshnf796hquavdpudp7ix15q394dda51bf44oyk79u5ljpcm0pattt2uemhp9oe1b7qm5oiq83udtu5mv1t2c2frjo0fjq518pjt76fzfrp9xomw0qv6j0967vqf8iixa6s0qsnsatzokfyencqhj0j85pk99ltb8k67803ccnxdv53lf1mlar5qwyh7of5pp7a7ydvktm0hl2v6y2ktdmsq98jepf9z6g4mc',
                avatar: '1pf7p71p0ywxrmjq34l58cjk3wlvfgiyn5l45p6ib26jnouffm9gzhb6083ilokte1acbtc0s1eumywnnl7zw8ad3e0kn8ctp9s1xnezukfp535f73zdwoza7b5rjrbda6dwkicr09wi04nda0dp93wukk05f0ldnqmi5yj8ymkdb0kuvg4u81f4d2kfipl1p2ts1yjyzij1e098iis6lzeok7481n25f52o4dgvltghikgu86vz6ajgdwg0jc',
                mobile: '8nvtszmhghc5a1qrg8qsy4l4genxhz2wjaumb3xdm85q3pheyvitkiitjpb',
                langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                username: 'eino99mqz4ws72f7mfdo35dlgvkoxr4pt9fams5sqms8cytawr5ct8sccyznp7lrq28e1miocdpr9nk8igvpqzzlcjdsibj4m37vhyaf4hxang7volt0ekh',
                password: 'yrxjqhrj6mssmihf5rb60jfydcx3xi3gk6ilfa8rofo7jfn5xkvvtvof4x6y3gqn3cw867234cnpr7klhyvrmjlmhkqnh23wlcl1rimb5pkwdkulcg5rlsryfeluxt6ikcg8tnhj67l4rj23ypk6hwr4zgc0my5swp45cotpwdprlk72zbh6nnklpncqszxgr7ajp9t92kepziluixiw0r26rpwumooixth5v01sxfjhf5kya5nly09kcpp8d7',
                rememberToken: '5ag176rp9zua6v7istoa5bz0tdsa5tvd5mkwcvxjtrkl1w8qepqh4l36wkc77e0cybs3erx65flfar0x0recpxhl1wkngvvj86k0n3l3ri6kp5ekbjwib09gvs1ku6562ugg1ycwy8vn0rhgrwntfmf8ofgbhfvb5ba0fvf16k9avv1xv8baiy9ih50o7bqgzzy8ku1tu2ni78ceznsi3ckdgwx55u85qab5s5ojeo8hz9d17b4197o305go2l',
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
            .delete('/iam/user/delete/01bb4eae-e197-4410-8e0b-6df5ce82f320')
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
                        name: 'Fantastic Granite Bacon',
                        surname: '9bx2yx2mgo3idbn1dfb5nu141xeq3doi8xfk90reuvj7qygptc5v1mnzbr7whyz7uellwra7pe30frb6144zoophaf1i56h6yd041p11dcu1qpzk41jynvqjiohl04yxt0u9mfhym47fmxfdfdpvznstdl39zo7oidlf88k2a5r5y9peeroi0i0q23ow4ecgb1s6fuzni729mcntlep5q9o3gfoo9v4zvjop98mqmtyavg3e7d3yrhjnzv1nfq',
                        avatar: 'tan6fbt56x9fxylejwys43vxjks3ofeaa9m5g5bc8tc1obj68bbjldzemmz0z8aexcz4x6prp0xng2k8afrwxszpu7cusd5uig888ayinh0l29wkrsvji6jn7qxcu6rap0r1uiy1cunluv0gaegczusw5yatlakd46rfg0lw0x4yud95s9dkpk18zdmer6q2jn7mb1bhe491tj8dok0xplu5l7icyqsi3qdkj8rs2uy7pc2qouj2cyl720x05b',
                        mobile: 'w3yj629ol8eeg8ku4eqwvp3uov5zbsg2vrp8fdfmw53rjax3f7jmlbuc7t5',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: 'aqzadyrwxnogezk8vkzco78eliedck6wzdsi6ubplsyrvh0je57fldnj50hi58zsp0gtur0ex7gz6936aix3b705osfuy4k1ah0jio0lamhxumzfd2jy6d7',
                        password: '4edceugp7kxwlb6o2hm4kl7x15982glrkom61k0hot91f5qm66u3sx119dhulyyabjhbnco7d1sukwlf4rmvobumbxl6af5fpgnsazlenidoko12i9xyq1bjwr1nr6oznp3lbjkjhfdshd20hhga10mkj5imm76bf3xmq8025c33s0y89w9r32du54ewnvx9qzri6aig8bcuwx9v45ay76tms7zmuu7iuvnd44qr5v9wonyjep7eha2c59faps',
                        rememberToken: 'p5jy7er4vtek0wjf1maosl5kvk1mr9ywhjdn34ndswrsheqetk1apeijuw9hoy7p4rlrv19j5pz1f06mrrpvgmg66cbshntay4b4353n941z7gnkx0cg0i8yko8fiu8ta4ybjs13k127dhg2lckbb2lea3w7pqhwjnpchy57h0abo3t5iy8v3v5hfo9dpq85p7sireuxqhwcwy081dnea3wrdjxc68ihk1n4sxrv82son4u3nchpgo5gdephg4',
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
                            id: '1eb4bd80-8f81-4876-b7d8-5f6dd1957bda',
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
                    id: '3782eed0-b754-4a0c-998b-e845246ccd76',
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
                        ...{ id: '7638a017-26cc-4731-8d70-d9ee60506564' },
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
                        name: 'Practical Steel Hat',
                        surname: 'mjkjo2szwuixbtyk9cg9jniiopspe33yqawm9jzgcytavfeb817j0vnwdnlnbf4i2bjb8cwlkqntt4zbrs78qg4uz4yrgre6aea86x64fpypkflnc8fe0vdvm3017wnaky06eexh2kw6ryeklhwphitkvnqk7zimfv3513kzcg24oswhx71p5f9wqx6x9ew3ys2wwpvlgdn5gfbwwdv4n3kacreazfebsma6mze1e5msn902xlkylnxvhiqrfc',
                        avatar: '6pjlwboldoidppap1vlz2q6mpjvj0gq3pfuj6ajc8ckcajb2176266b221mazew07bfxbe9cxpxzwpymwthoke8iom5vc163e4p71j8h1jhmaxdj1nudhqdm5jxfxev0zjlar8xg153rmmedjxmtny2x88yawhstj0zwevf2qlq4cz1fkzlu8d8vbns19g6osz6c0xinv8ftff53vp0j70wmb2za5sh4zsh8biro3sb46rffsx0ezj6aigxks8',
                        mobile: 'gjfmwez2rm0jejam5s5nbf3htkui2i4l8758bh2s41ldt6j1tw7wlmfxwci',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: 'o1jyatzk07m7q0vys7gz80xy3lbbry714a06qci0ppu7ydbyh629vyv74yuuyb945c0bb6arayg7vslg4dgglzbickjcue876tc5o5wt0szt863samt7s25',
                        password: 'zmxfozryz14aptdjg92a9685za26rjcst5ok2oakhby1g9v84k8p3wk995mzvjnd95vyilsov71iqasbg3nk2soabpo586f8rj21pzqb8qy35sefd28a66a761d27d6g14req6rrfdrvfx3atq2v1xyaqs6m0m915x5ycd807a2qf3z0vic39co8xvvh2a5r98xmhptsue38uv8r12z3msby2apq83l589yin8jqmwdmmu44bdxruwwjfwk1rt',
                        rememberToken: 'shixtm8xsf9hyti09hern6lwq40qgvigjkf369vw6stkquvkadrrdgsp8rjo9tpjpp81b5z75cbhm492jkvs6u6prtbid8wm7prn70rmx0uidp5edw4wqjbptn041h5r6ziubr4fm6zqv6uwp8u14aqt364i3cc2gkua0juzfmuuuehogx9qvzo0lbjbb4g8r4iu8x3meu8mysu8fl3kdzkycvbyi7amkd3eb33kfljtr1rg2p2m2tafb5u1is',
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
                    id: 'bc270e09-02b4-4dba-97e8-2f9786500c21',
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