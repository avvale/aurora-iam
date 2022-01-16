/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
                SequelizeModule.forRoot({
                    dialect       : 'sqlite',
                    storage       : ':memory:',
                    logging       : false,
                    autoLoadModels: true,
                    models        : [],
                }),
            ],
            providers: [
                MockAccountSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<IAccountRepository>(IAccountRepository);
        seeder          = module.get<MockAccountSeeder>(MockAccountSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: null,
                type: 'SERVICE',
                email: 'c7w5sqm16edqzhhwe8wgb6uw3r0cm5nfqetetlxvt7qr7g8rhovfwvzfqu1yjwzt8pa1c5txote3m64t9d8znhvohmgfx8dgtz1x1bvj70u5rmqm3w6up5pv',
                isActive: false,
                clientId: '07f1e794-bb74-488d-b2c2-719ed4d800b1',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'ba805ac1-3092-417e-9fb8-101a0ddd34ac',
                type: null,
                email: 'db9cty3efpwr24bz876rywwr33s5n0p6flvvt75uuor7jaawhnhgoc4wmgm30vgy4g0fjk2o2h8bxsp5gkxw9496iw2825h9nicyv2udp61gvdce92v0jtz8',
                isActive: true,
                clientId: '6329623d-712a-4757-80df-d6d8c8c5a90c',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '8c9c37f2-9dd1-48c0-8e26-a4f48f2e6301',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '7c3d9b3b-1e0b-4798-b196-986740e94aa0',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'cb9e3afe-fe04-4c53-b9ed-78ea6de1edd5',
                type: 'SERVICE',
                email: 'z53zjhn1ysb3c8hi2pqpe73dv3vfkz159kzyasae8a3toifvhuqbluj25lwp9aevkk7fzrvlpbuv2g33xq2e8t9mpson7i7ydlje7ldpdxusgvnfwl96s5ew',
                isActive: null,
                clientId: '9897db6d-da8c-4040-94ce-689cfef3543b',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '59afbead-c0db-4e1d-96ea-abe3f354b851',
                type: 'SERVICE',
                email: 'bpjgd94nvr62xxvmhju7fawa761ovd3f92cthn1ao7xkqao2dm9dxzt3wtu2aqhmnr3opc9izwv7sqyjpuv0glqrfjz1vaiix2b2olvmywkh5vav17m2cfyf',
                isActive: false,
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '0594e8e6-390d-4f2d-80bf-9cebda780a5a',
                type: 'SERVICE',
                email: '8ir6ie3cavtj7n1rbrx2oib1k809mcuex7g6bror1c0uu040xdcg4qcv3vbsmswx65sby8jexngh8e2m3cq2qph11yh7rrj8yrzqt3wdg964xr5cg8qzz715',
                isActive: true,
                clientId: '1d796516-218e-4f81-8352-f93d40286ce4',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '616be9a4-668e-4925-bf27-62bdc23f6646',
                type: 'SERVICE',
                email: 'x6sdwpbxjtio8y9f039iwkyaj9uh0fm6glgs5ie37nm1f3nfmcqsok254aq5nb28jyoa9w4x0l7ckqrxbs9joi6qt84vem99pyxsycahbks4f5x8qppyyrrq',
                isActive: false,
                clientId: '92a3d2dc-12db-4757-afb2-64eff5cc925d',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '1ea4a80f-2815-4d41-85b5-921f68629519',
                type: 'USER',
                email: '3mrqx9lamnv5khystyofy63jd52foe5fwtm7tj1japdh0avdoh9y0smigy8kkf0xz5amawi24q8ma93bt4a4sljwo0f4r5cdr1lx5baoekf9eeygj1q7ulrg',
                isActive: true,
                clientId: 'c9bd2895-6ba2-4da8-b391-4a36b0c9ce0f',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                type: 'USER',
                email: 'vwxyqwvuc42tvbcmi2m1cb252ih79lut51nrnrmh15l8htitjqj82l3k6stmqc6v2v4j3cv86w4x1zby8vt5uqi7qe34l9fmlo4oa2uy4g7t43sp58rhcv6w',
                isActive: false,
                clientId: '74746f1c-5c0a-45de-8190-1f0ae5b9beb5',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'aefe05ae-0cad-45ba-bb64-d2577c9aa62c',
                email: 'ibbqco3wt2gfo04fmhra8qwul0ryvr6shk2y00qu4r81ekf3bxrs7q0kmrcl7wa4pf4v2889zo6ti2zqkiybgpt91fpgqugtrjn8svtxmgkfhsmah8isqsff',
                isActive: true,
                clientId: 'e7ca598b-15b6-4286-b811-66586b5d37a1',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'f507ac27-01d5-44b9-9fd6-90a4a787c578',
                type: 'SERVICE',
                isActive: true,
                clientId: '4d43c29e-4ed7-44e1-9807-1494a00f247c',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '46c04ed9-0a1b-492f-81e9-7bf4b12c74b7',
                type: 'SERVICE',
                email: 'b3lmmvih2f2bu9721kzr7337w372nr4i5zay7xxlg9ra681pu8gnm4xvhmi5hnu5l48bnsrkkq3p8up8o6j3kd4e1ei7p5fipidqakua3z39cuqw1kmlppfi',
                clientId: 'aea8e6d2-b60f-4e15-a351-4c5f6d2ee349',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '195b128b-bfb1-4e93-a83b-649e61acb16c',
                type: 'SERVICE',
                email: '4qkrojwo2vehz5re9fti8a2agmvr6eo7lf378zj6za305k88zz0nbg1x050f71dq34ke0b8o5ti3k6pu9lq0iphckudn78qqj6sezdv9q7xu9bes96wakauw',
                isActive: true,
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '1b5b3636-f300-4739-9d35-ef2df2b1e191',
                type: 'SERVICE',
                email: '09glkrgmqn2kpp4a9whn7qm162bt6la20gh6apku8jvp241t2zko9g5wouzfg89k1he93kaa8fjjfy6f2otnnc6mogcqsxriruw69z4poy02w68cql4fy9ao',
                isActive: true,
                clientId: '76e53357-75bd-4207-bcae-f26b0e0012c4',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'befed5ff-6090-4164-ae20-033b4c7d31f7',
                type: 'USER',
                email: 'nvnyh056hlkvy2lsp2n7bf15elwcrzzt18xi5b4m5sqihe4a6q9vthwffhyunr9ice3owinbb5krgaqam07g549fm5zbeebjyoxbj42zik9tl16q8of1be65',
                isActive: false,
                clientId: '00b95b45-7a8e-40aa-9574-99d2b618fc44',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '36318786-f363-48b1-99ef-c3dd8eabd6d3',
                type: 'SERVICE',
                email: 'hwut959zv9nybmxvantrku7963o2ie8oeeqdrwgpyhb1m1uss89rtdm6c49c5q3lxw01ie6dkmytrdkuujkfjplkpd0k12utthmhvw4moprp8lm7v2btrvj9',
                isActive: false,
                clientId: 'd4dc2182-1265-4249-8fcd-980121de1c10',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '6tdrrayj7mwjuii5jl8wlbooyjv08tjglj7tw',
                type: 'USER',
                email: '684uxgg6pqcdsm6mw3au7rnzsj94rfo4vlv5yz4xaav78j970pe720upzr09pztpvzhmoqusbn3iuaeepmimov5zp19d53aho5bqryncdftaeq8n8jl7z027',
                isActive: true,
                clientId: 'cbe27b11-499a-4043-9c9c-04be25ff0fd1',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '17b72d74-b3dc-4296-a516-4a7241eb69a3',
                type: 'SERVICE',
                email: '3687s0pwboc9co44t0pogwlnue6gp353ng22hrrjocuesn9xcxp07heylrkvbv61jpxny6uyt3au2vkkdokrmut6g23ne9a55p2npno28a9a1y0e3xgcuu76',
                isActive: false,
                clientId: 'cegkl2ct1ktkw6rtwjnih2gaxtq8rec860hx8',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: 'c9af11d7-44ba-443e-8021-7907fae9ee22',
                type: 'USER',
                email: 'gg6mkm5f8z4n1i3bmxlooyhel646aaizfrj9tfkk5ph8vktrs0z2qbrj3ykh7xx46q38bwqoo2ddngtgyhkpv23zr8f5cblanlor7zihwy91o95x65s31axic',
                isActive: true,
                clientId: '01155454-495b-4a31-9f42-5736c42a2f53',
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

    test('/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '94e8a43e-7cad-4009-938d-d8fd627e6d66',
                type: 'USER',
                email: '1a70tnjg0qgdg4pnkcmkfbe7cjrut3d55sas5wna04mli549tkg6lc3pne3tjz55jhy9jhzfj3p9lftc5b9xzx9qsg54altsu4yvr4galv82n3oxka46dpz6',
                isActive: 'true',
                clientId: '045bf562-676c-4452-ad54-8881d5c7fa13',
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
    test('/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '2acd6230-7a41-4327-bdce-1127a47c4eff',
                type: 'XXXX',
                email: 'yns674zsmkeu4x5up8q0kohhoi7189mjfnh5xqej6fma1zr0xjb1z8a1h8xmavkb6b16k4rkkykk3byuqrgwo146ey3z8moy18t58c0yskgtodu5phvxhf80',
                isActive: true,
                clientId: '4b80c37d-0752-47e5-871e-3af625ba350b',
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

    test('/REST:POST iam/account - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
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
                    limit: 5
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET iam/accounts', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds'])))
                );
            });
    });

    test('/REST:GET iam/account - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '9c8e67c8-70aa-44fc-9aee-c749885d19f6'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST iam/account', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                type: 'SERVICE',
                email: '5zl9bcxonp3kt7c39qnedqcxoaz1pumkch59iewz7l6e1j7nhchxm6twtucp4ph4o54q8d4jy9koisqcp9kipvcduckmn2xouw1h967tn6lpi28wevg0pg6u',
                isActive: false,
                clientId: '5505c6c2-435a-49d2-8e21-b45754dcb76e',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test('/REST:GET iam/account', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
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

    test('/REST:GET iam/account/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/756eb673-b525-4d87-a66c-1fa36c314552')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/account/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/account - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '5e78ad2b-cb4b-4172-8365-a1a24726f6d7',
                type: 'SERVICE',
                email: '32od3lnwxopi18spmri65k5018w6ahl4tyv1u029h8uarviy7ual24c8h6xw0shezrht5e31ibvue2cyk9xneq9zv4jhymk41woz9ydcr3ur4u6mj2ra5h24',
                isActive: false,
                clientId: '1856f486-538e-4a42-a0bf-477736cf7e65',
                dApplicationCodes: { "foo" : "bar" },
                dPermissions: { "foo" : "bar" },
                dTenants: { "foo" : "bar" },
                data: { "foo" : "bar" },
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/account', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                type: 'USER',
                email: 'kfquwe4gjn5mbxnzmg83sk55h2zkozry2dfn149jxjw9ob8raxe4mnhjposjnx7frwab8hpk2nvf9xy0gfjymcm4lk9sa2201ky318hpvvsl0svc1971y1mp',
                isActive: false,
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

    test('/REST:DELETE iam/account/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/266566c4-a14f-4fb5-9be6-85f6f87516e3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/account/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginateAccounts).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'roleIds', 'tenantIds']))).slice(0, 5)
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
                variables: {}
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
                        type: 'SERVICE',
                        email: '9mfcizmqvbfegzrajm7lvf0tcvflsx33ruw909zjhjr54vp2dapxmpf2zz9qxihnwgfrbgpq1x8zyehi2eoec9g1eavjs6l74flvciih6pwvn88w9ipibgp7',
                        isActive: true,
                        clientId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                    }
                }
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
                            id: '5ad77b47-60cb-4208-8963-dc85982522cc'
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                    id: '30907283-a224-4424-b8d3-28cbd3445d7c'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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
                        id: '614c5c37-73a2-4315-b2c2-1ded39619d0b',
                        type: 'SERVICE',
                        email: 'ggbilii2sgc82c64ikm29fi5xud4eynzre7h8mf9e3fushomeydnf0hwapbz02i744etlerwxs9cui0u3t6mvb5rgneiqi2y8lezb0m0s2pzbks3ikxxlmrl',
                        isActive: false,
                        clientId: '4668108e-1201-4c88-9dfb-64d7beee3271',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
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
                        email: 'eknwqd8b367t8ms1s1cgnqgxgqasiqyyozaajicoxyqmiutkyuij43tiiek3m3hb6bhbvla1q41bckqpm6oddh3qlaqrp7pzygukq8vcijb0f4g5pq3wva3c',
                        isActive: false,
                        clientId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        dApplicationCodes: { "foo" : "bar" },
                        dPermissions: { "foo" : "bar" },
                        dTenants: { "foo" : "bar" },
                        data: { "foo" : "bar" },
                        roleIds: [],
                        tenantIds: [],
                    }
                }
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
                    id: '85ffbe2e-3399-45f1-a640-31dd691a96d8'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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