/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '../../../src/@apps/iam/account/domain/account.repository';
import { MockAccountSeeder } from '../../../src/@apps/iam/account/infrastructure/mock/mock-account.seeder';
import { GraphQLConfigModule } from '../../../src/@aurora/graphql/graphql-config.module';
import { IamModule } from '../../../src/@api/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';


// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: IAccountRepository;
    let seeder: MockAccountSeeder;

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
                id: null,
                type: 'SERVICE',
                email: 'yuyuir8l9dl239t8pltd1pklb13yrs0g6p6xwa2vvzpmj5gapff08vnlub7inxybiz1fea4ga0te1p6sq93p61vtxqmq7ztz8hx0vuhzb1z90pf1pjbi51t',
                isActive: true,
                clientId: '032a2c19-46a8-441a-9e73-ebc19b59b073',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: 'd87639fd-19d0-45c4-b3ff-4e02be85df54',
                type: null,
                email: 'q4pk5nkyfz58tp6eeiri1mrvfutlhxuewikjwymah7bdqlmfkvy0sg5sdj41exoilvxu5jtiv9spfhxg1r9irxfzhhkkodihsq9ela6yuxuakn45w81bhqt',
                isActive: false,
                clientId: 'ef0ebe21-737f-461b-9657-326a453a2b41',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '6908a6b8-4a01-4035-afe4-557541a20c3c',
                type: 'USER',
                email: null,
                isActive: true,
                clientId: '45b219ed-e789-4f84-8486-e03416a35398',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '1f54151a-7847-47ba-a23f-8f8499cbf9e1',
                type: 'SERVICE',
                email: '08tfwg7zxofcdqw5xbmjhvxlzpkky550k708sm1uapeukj6e4rr84ell9agzyrrmruywjqlutnkrsqexkb3zd446a8ui6qh86guyhwlvz0qj8n2fnr4lycn',
                isActive: null,
                clientId: '0878688b-05f6-4c17-b8a7-f4505a513a3f',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '77bd1332-858e-43cf-a359-b407f1e8910b',
                type: 'USER',
                email: '7tnz7pc8a705eywmmks5u1z8rcc877td9jhkga1wpyqj06rewjd8s7ibk295qh58m1ht0yd2dstdd31vuu2fp07g499buz73f86re2nlr9at0g1ii3hz1ap',
                isActive: true,
                clientId: null,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '08d8d546-5cea-48be-8203-62a44228620d',
                type: 'USER',
                email: 'qftdf249sfufmseu72mbzl9tgz6mctk5cj4xegmwb7peeml3d69fjpmnh7lytqvgoii2kmgmjhn1rpq3gjp4o0moxhgnn3vcr3r6tocg85vj2obpfyzey8c',
                isActive: true,
                clientId: '8e47aaf2-731f-4521-a37b-0f1b826f67d7',
                dApplicationCodes: null,
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '124faab1-a368-45f7-9159-01707cc1f290',
                type: 'USER',
                email: 'zm5mnoojz7ibv4eydddi5fjs2o9sw53nwis82qhogbt59qdoo12py3ilfg520xdvtmleep17zcjc21w8e64spon1bhrfk404kzdlf77rwom57isbvhyhnhp',
                isActive: false,
                clientId: '0ea30e16-0a13-4c3c-9e15-fcfdfa0075ba',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: null,
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '1393b15f-7ecc-45a0-9f57-81a0f61deeac',
                type: 'SERVICE',
                email: 'dtccbq4smbtzkqv6iznzmcqpsowqdyscdi7psixr1grkydsdaa7x1jgykn3g62bqxwsqaun4qt240ylcc8377p20elj0l7izvo4y191kq3h1ov5b6yerpzi',
                isActive: false,
                clientId: '47bd94f3-dd68-456a-9dd8-8e4c1ae28cb8',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: null,
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                type: 'SERVICE',
                email: '645n4q992jwhjdjyek2lujlg1a6slg1wbh13cjy9aulzywbv37c03tipm3r1vcnowpaa5hv6s1gdbi2z46q6qsiju3yl8est1gyntervqcfgpgglg35swcm',
                isActive: true,
                clientId: 'f88c2ab0-b893-4067-9eef-89876cf43197',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '2db7b33b-4b74-422c-a3a5-84f8ec434b82',
                email: 'n82rsnop74t141gv4thkvpnyfr6uufbjj8ah01jtswsyj1natkt2yqqe0pyrb8hvbu235c0ljuwo9ulnznq1zut1cqlg6l57fizuu6xvzl5d0qe5rvhwv3a',
                isActive: false,
                clientId: '5bb2892f-a472-4b6d-a4b8-5e879a39f9d6',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '8b279075-8a35-4611-973b-027ec840a7b2',
                type: 'USER',
                isActive: true,
                clientId: 'aca7682a-b8bb-40de-be70-8e02e0092da1',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: 'c1f1436f-5a25-4011-ac0b-444f6cb2bff9',
                type: 'SERVICE',
                email: 'qtah0py5z2objxgvz6duv512pqswbdjduvo2d98usg0zj4x7di6o0lttfqtknglan4e76ccmevya1x1scmazscvj1i9ue7nqhwfv95vlkeoi21mbvogesq5',
                clientId: 'cfa25269-9211-4d26-93d3-1e87b882577b',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: 'a206631a-9177-4271-821f-dd5958dbb4b3',
                type: 'SERVICE',
                email: 'gt85gqnh2v5ex7ku5k5j1h8mwa140c5bqnub9am8z41vsihg05jog59jxngvaqaa0jfhz5xjzi7nmyyqkcsdxnsnzz79tdlukyeasz8cbajhewt3ec11bh5',
                isActive: false,
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: 'd24e2d06-d988-41e8-8098-256fc481f75c',
                type: 'USER',
                email: 'vsk9if4ic52ppt5px5j56uyk4nqk82ard44wklcm63rgyhxb6crrl86zxajroh5dkslbw9n14tn3jl6hb9cn9u59bruwsrbhm4amrp0v3vb3bb2fb2uyk67',
                isActive: false,
                clientId: '35243044-334e-4fbd-a057-29d11322721e',
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '4abba3ab-fa7c-404c-b673-4e311131c0fd',
                type: 'USER',
                email: 'vomwn4vkh8oo3wk7mulfhs565xu0ge19r00u42agtdfgd6533ifz2hypx1dqlhv1yl9mto5hjq1g1viq229mfzl4y0ywjxqb32k2hl435rq5234udsflmvd',
                isActive: true,
                clientId: 'a0a1bdf4-4033-4e54-8d82-85569f674287',
                dApplicationCodes: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '8c056d2e-7906-48f6-8c8b-3f4ec9877d52',
                type: 'USER',
                email: 'kygzqey9imurjei891byg5aioreqv5mxtu493d0uigfnlkzuf3ltbzvg5tkkyvbaoklgn1l5gforzl26g5a3vecao8dglrouphjpf42b3zhgcql1bt4ajd1',
                isActive: true,
                clientId: '386e7ce3-2467-49b9-a31f-e490f1b62c99',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '62hrcyjp00bd1swfr6rbssxgvsot6oqrailsq',
                type: 'USER',
                email: 'qte9uir9uy66n1sv46glcelyysxt0f2f3xcere8kiw3dn12rf6vwb6ipl8p4nqlj07cpjs8sxhycij0sghch7bna7mai61i983q5wowo9myug99m8m68o1a',
                isActive: true,
                clientId: '9e2111ab-c934-447e-b2b4-19f9fa53dc78',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '0ebeb48c-d588-4057-9c5f-9c6b8cbb3aad',
                type: 'USER',
                email: '1iuyutlpop7p9s2slwohw11k95x1fxc77dsuokscjucnrxbqeluo8vyk90nctru3uiv8c0pv6g0vovexqyksw985i2e0yh7z53jebrg54o8qmov33lvezb5',
                isActive: false,
                clientId: 'gv7g04n3rdu56h5jmgz4zopc3sy0lg2vvwijg',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '8b3564ee-c0d5-49d3-9673-11def7855af8',
                type: 'SERVICE',
                email: '2pmkhpuveodrt3k1t4q0o8qhojg1xis9r754mzvhuaufe7ooim2xqutjsp1l1nx2ubueyku8zk2uoxhihfanokmgzs968946ofc0t0ze5hd6u4ok5bsw8jcz1',
                isActive: false,
                clientId: 'e5177b84-da22-4e0b-a94b-5331a7ddbb45',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: 'b936b71f-16cd-4fbe-8f89-d57f7adfdb53',
                type: 'SERVICE',
                email: 'apdv0xhq3a2iz8yhlhbovrktcy7m45kivgddoj7hdhpshcykqgyocp72uf8t0kr1ajvdud40fd9pghzqm60dec8tgkabplyb0rjl4qdpac3jl1colgb2g3n',
                isActive: 'true',
                clientId: '8fa4f55b-c1ef-4781-9cf6-90657cb270c0',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                id: '8ab3f404-4b39-473a-b5be-268cdf318b94',
                type: 'XXXX',
                email: '7rk0kzwyyuyoynfd4rctkyg3mw8wfcyjp217qbkd6imyvjhk8w9oufmbwzcvmoe6mutx8c3249hkdh6trg1zsblreo3scgd9aotrm3wc1hfejon721e3sgd',
                isActive: false,
                clientId: '094897c5-dd72-4e1c-b320-e252f11f85e1',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
            .send(seeder.collectionResponse[0])
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
                        id: '3c9cd606-e843-4f20-ad0e-a572e60b4c30',
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
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                type: 'USER',
                email: '29mvwzmtlir2fzarmiu9bsxcvvfe7bj7m1pinkg75b2yry6h8hz2htveu3fti1qqzf7jw3lkxua5g4skryo501oqkxrjg51zv2bzyl8ucfmln9pnvxwfkxu',
                isActive: true,
                clientId: '12eb4ddd-77d5-4a02-af9d-99d8b26182a4',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
            .get('/iam/account/find/6b01b779-a2de-41be-b526-ccc6a654490a')
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
                id: 'f90ea300-a8cc-4974-830f-ca388f32e090',
                type: 'USER',
                email: 'c9qtslxcwwxiqcuhi9s9wphugx4rx9zuu8ibvbm3a39wswnoshwtoltl2tv49nv9tbtosjtowhga36wgli4nyf04fg36isrmbp54thxd33w3h2fl65ztzti',
                isActive: false,
                clientId: '3c40270d-457a-43d2-ba8d-1499052ec011',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
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
                type: 'USER',
                email: 'q2al9j2iwy40f9sfuk9pd2eopjsqygt1xk54ss5e3xa3g47htb00nh78rd1d2cdoyyo7ve9jj2877dcculbvksib89iilyowtqcf7bz2yyxzlkpaiaf64dm',
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
            .delete('/iam/account/delete/8ce64484-f80e-4c85-9762-70c2aba3193a')
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
                        type: 'USER',
                        email: 'dh1mn115k4v3eib47e0arvpgss448azw8tpdwttmky0fvkjce7wz812egboezqdejum5wxb63h0riohm1vrkp87ejs3mpzllrth130fcfccfnh9vd1gdxcq',
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
                            id: '3677e28e-e901-46b1-bc00-5ed97f135434',
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
                    id: '61b7277c-f940-46c4-983a-99828fce1f62',
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
                        id: 'f5ff7244-7a25-4453-a222-06d82739b571',
                        type: 'USER',
                        email: '8ja6moephzmky5gok2dg5alule7o7wo8k81kjb1qa7j3hbt51xatn7e6mg4nut3eflp5nyezdvjxus45tna5qwg23seq3mma26f90738r8d0241nft545z7',
                        isActive: false,
                        clientId: '6c40dc60-d91d-4996-8824-7a1a17d49c61',
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
                        type: 'USER',
                        email: 'ru94t08zxqv7ved4tpresjllkj1o8uk0708l9k74sxdxpw7t2lg9h0chlw1kb78buoj4i8vvt42hh53jlqpebjbogbmt0l42q98e1skqd6c3s17y3tpk2zs',
                        isActive: true,
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
                    id: '48dd9277-cac3-4c81-9631-1b5194c6c599',
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
        await app.close();
    });
});