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
                email: 'tdld7efuemubh8tpaqo57ktfwmo7d1e77ay4t982w9q9525bdzbe1hh4qrd1n87n6ihdhayh6r193oh1eybb9te8q9tw2tw91u700ozl8b5qi73ey8l87hz8',
                isActive: true,
                clientId: '9a67ca50-0b74-4da0-ba06-a324fea62eb2',
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
                id: '550f2108-f8d7-4b6c-b03d-ca91a27e79ee',
                type: null,
                email: 'h2i2ks7au7bjkqzbcln5sii413kvb1v0plti6l3f8gnbqphujmxmktfqqmgnw8bey3h7x8iktax69mw8hs091qwjm81o4anaxrztu3ug6zoszlp9erroyuky',
                isActive: true,
                clientId: '82e0fa21-a6ce-4648-87ab-4579b8a54ee2',
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
                id: '329e9591-0f1e-498d-ad39-a71ae50e9868',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '034156c7-8498-4c54-8852-f9c8b74b0c54',
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
                id: 'f83f5205-13c9-420c-ab77-e39aec255e2e',
                type: 'USER',
                email: 's60g6g3ehrb9k1n045jenr7vlh3xkkt84j9ouhmrzb2skiskgv5h35tvkntlzipdyk36wb4itr0svcwtvncq96se37oywl3iasmr5rcnjzigvnyw7w14jhro',
                isActive: null,
                clientId: '59f11f6f-aabd-49af-9671-99feb7bc2dc6',
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
                id: 'd1f84884-0fde-4c61-9403-f881b1528b7f',
                type: 'USER',
                email: 'tw0mdlqflc2y8juczyp2chh5y5lcdkjlh23prbfxignlrxdd4thrxaegvt3k6j5khvmy2t0n4p64gdex5cbyt62ikx6p6v380wpy4fo7iuywu1ydcl2vje4v',
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
                id: '8c6f0164-01a7-4a34-8c72-1c54db418820',
                type: 'SERVICE',
                email: 'q7csxia23x95mg4tnhbzy2hwj16565nwdwn5j2yp8b2wgjtpqv62x97asdgadx7s2fz1q93yby0uwijre4f6vy6hfuei9up77evx00459g72vxrm3yoseqay',
                isActive: true,
                clientId: 'd51585b1-016c-491b-b3c8-c99b62dee2cd',
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
                id: 'e8e53361-9127-4f15-b01b-fa2627885541',
                type: 'SERVICE',
                email: 'n229lp0p1m4ohm2mbvcs29l1ktp8xjif5daddzcgc6p2j3pq9ex30sdkvlo11f176vllnfa7btk5ola0cfz4jf24el8sypakvkip0qmih58p0jdj3cfdvq0s',
                isActive: true,
                clientId: '96650b73-0160-4353-9336-875fd54034f8',
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
                id: '2aabf8ce-be6d-49be-bcf5-66cc020f7755',
                type: 'USER',
                email: 'l95yysxhwpnc086g3swcibm8aoluz885xyart7n6u5xztngw9ldm1c34cvjqgmyp1kuliggeftdik3sljo7kf0bhhb3srrti9ix31ovwq4rlsw4ylwpfye3a',
                isActive: true,
                clientId: '1f8a24b2-96b9-4aa0-beaa-8aa3d7f2430f',
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
                type: 'SERVICE',
                email: 'jcbpoa3nadzah1r5wsftak1rfw3381866jnspkqo1d8scr4c775lzwhjlclfqk9j0kjhwlhch92xtuusafa2f4xbg0db44abfkne8746nyyhwl5ccqaqyff8',
                isActive: true,
                clientId: 'bd225c08-a03d-4c6f-a5fa-ef22cc6e7e75',
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
                id: 'a948ef8a-b289-4f01-a373-e825e517bd15',
                email: '2b2jsmt26fzdzz0mt2lktq7ioa4krr5s9qp5dydye9synim87i1mo20y0lprh0wzzmtkio18bblzkc3v6q2p5xzriop2xg9uq69tfv8rpyggb0dm9pe5ouyd',
                isActive: true,
                clientId: 'a40f9c29-a03a-483e-aa10-3583c210fd2d',
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
                id: '48c65012-5854-40fb-9283-75ed13f7d4f8',
                type: 'USER',
                isActive: false,
                clientId: '2f51c620-7547-4f9c-92ae-91c21d5f81ad',
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
                id: '6b51015e-38cd-4afb-90d9-9c868d954fa6',
                type: 'SERVICE',
                email: 'dxp8uh490trfc1ayqwtk6hhybh8aqpws7xjl4w9pzn06s7jsux9psqj8fmrfxu97w9t6k1yxybkzvu8yqebrs9c1s5mcf8iidm3t8zawobkjahstoqjpk1z7',
                clientId: '590ae410-1e0a-4cbb-81cd-86ee62147fc7',
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
                id: '42815230-6d89-488f-8cbe-abb24a4c4623',
                type: 'SERVICE',
                email: 'hxpn7y7rvb87vhqqzwc2zm2scfhn5ubu780jnukp5hktsmnvywq7hpv9bofoivnwik7znz7adr94yf50abvqpi0edtbzhqhy6gkm4kxxwaqjxnybgdq4kvw0',
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
                id: '9ecd7c91-da42-4063-b8bc-ad3cc4c490f6',
                type: 'USER',
                email: 'zbd8fniv4pnuwkbb2i38vqbm58bdrjppvgoph4nn28v2df2r2qstrmbb0epcy5ruxcma5kb9kqnhz30cxuwhs1vtk7ojt49ovgpodyxshfiqxo8gmqr2diy8',
                isActive: false,
                clientId: '3533a57f-bf3a-4a7b-af02-49f163d20437',
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
                id: '543e14bf-4fab-4be5-9277-33691910c486',
                type: 'USER',
                email: 'z8sechchkyjzccex30bkr3k4h3i589afb31agl63tjkl7lyd5jnxmbtdq3cxyrywtdexc87ui9s5z7gs395jl2kh8a10qmlimtb31lw4o6wveimagrqdtjys',
                isActive: false,
                clientId: 'dc54f093-d6dc-44a1-96cb-84c7ced7482b',
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
                id: '11054f61-6bc1-453c-8bf1-cffcbf328f61',
                type: 'SERVICE',
                email: 'dbqb14tj51l8crgwz5nky2eja2fdmrmuc6b1gvimuwghf8jvq7id4kyr57xbdf4xho9oh1jfhaqp5ql0bha6zld5ekqq7vllu2lwklozbp3s0vejptjdlwfd',
                isActive: true,
                clientId: 'de8afcd6-547e-44d6-9dc1-f777c5e8abd9',
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
                id: 'kc0uoj8k8q1rymj7u3jzbx41yu9wfz5dz4e9h',
                type: 'SERVICE',
                email: 'wsx7jm61z0svslh412t4ivmwnlp2vppwrgsfm8ks4jmdmdx710jmlm6jvgu0xwx5vr5ifzs2o8ujz9o188hyjkppa1fue2rjufk700ajzwuzaa7t39z1ljmd',
                isActive: true,
                clientId: 'b5fdbc1c-7062-4b43-9d1b-3b852c1e0eca',
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
                id: '274fc25b-a981-4cb5-9829-915544293a21',
                type: 'USER',
                email: '829sl0bs8l6t958ddw80s8e9a581lsvstdi5b0mwtdlr6je8hz471bj20ufiw9u03h0siqqeamkkc7e85wujiytvajsvhwlyiy312zwblrfc4vtfjrl3gdc5',
                isActive: true,
                clientId: 'udvua7vp9ohp6pj6nhlvuzr4qdpyrcp2aprck',
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
                id: '8c11430d-1309-4a07-9024-4ab3fa69f331',
                type: 'SERVICE',
                email: 'mu031r984kr2lh4wtf71omh2fmwn0u4zee2xlnqvguet3sco6dbajo3occ1megmn2pupx37kii8tyzrr503ej4m71dburzewfj0ru33cz4uil4brck1oldai0',
                isActive: true,
                clientId: '1f299648-a4b2-45d1-91a3-0273c5e29b63',
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
                id: 'f2c63ae0-7ab9-4399-b3a8-87391d9a10aa',
                type: 'USER',
                email: 'fiyddnttrbpjod4crqt4yokbzlcqb9lyb3wn7mdm48d1h2sohtks8fjgylam8f0fkav5n11tyuf4bg6qngtr62v9d9pj2h34m8bas4d1r88v1wdgx86dnaqb',
                isActive: 'true',
                clientId: '8c7c32a1-8040-4bab-87ab-5bf0c9e8dc92',
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
                id: 'dc01939a-6a7c-4689-9b74-33da576784a6',
                type: 'XXXX',
                email: 'qg0t5iavsiveef0ujyvknjjzwlm743ftgq020zcyga9ehsj04mxf5fyigpfzs1qw140lhv44tx1qupxf8s2c33c03jbbbjzytm7a04dnf8u3mxfjkcgeju82',
                isActive: false,
                clientId: '211d9c28-40cf-4e3d-8b47-d526a553f4b4',
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
                        id: 'b1709313-6ced-4171-928c-ea900d810d99'
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
                email: '6kzoudjofd8sz3gpf3c3pjd4o0ac0qvj9dd94qy3g37m4tizrhlrms2kzs80ha559rgerpsk75amz500hse8t8tlzjs5d5kow47rf8wll0n6vk57gbuhixfn',
                isActive: true,
                clientId: '7a998317-5f4b-40b5-8a89-4b1941da6af2',
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
            .get('/iam/account/47026c6e-bcbb-4ea3-b115-abaa5d3e4fe9')
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
                id: '418adfa5-1b85-4d96-81d1-e363bb982e6b',
                type: 'USER',
                email: 'sypvs87t9y1myr96c0y0uytztdpt3sbjb8dtzvhr1rqjlqvykufakxtgygeown4jvzdf9j7fj0vraj1jeybo81waiw3rz13t3tmm8b2fv5e4bk9jugqvmll7',
                isActive: true,
                clientId: '26bd6a11-e74e-4db2-97e9-eb3d9b3cc2d4',
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
                email: 'zaqw6j8s7g9y57m7orz0w54xg8n0pc5zivwwrto6y0otueg1cdpwdaalt6pghmtfh7t7s1p2kp6nv55ud0dy6p455g34lvww6k6z5dnp34p78xvmx04s3v4n',
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
            .delete('/iam/account/c517c3bd-6a23-4c9a-b4bf-b25ed7bed67a')
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
                        type: 'USER',
                        email: 'axfo8huq4fhghktmws5ud8doapsou1h6jl3evkdp9mkgmwmpurhchgt33qyvfoayuek80kvuztj5z0ztme3hn9u4htiumyqro9knfe6icg8xe7c06hi0umbv',
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
                            id: 'e4d7e155-e364-408b-bcac-ca4ea3eae0fb'
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
                    id: 'fe12363e-ed38-42b4-87eb-9c5e93dee337'
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
                        id: 'b2f1ea32-40d6-491c-86d3-7f7c811bdf4e',
                        type: 'USER',
                        email: '884dvhq3e38vfmjjbct2cipa2dm70j5jsql9e1cadb2vocsxts4rdsuoyrhqf1k9698p3p6ej3jrlohlku02bzymxk6s8k1jil2cqwpt8glqdxfnclpr6u4u',
                        isActive: true,
                        clientId: '22f61c63-4633-44bc-843a-2517e61785d7',
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
                        email: '2e74inavlvx6phssu8iky9bh4pl9qwj40yw2c0q2jnjiwgru42rlxnqpqiee9cbtls5mtbvojiwdfsza7zmtvdwoqtcfgkmi945nx2v8p0dxirjkx9ywlf93',
                        isActive: true,
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
                    id: 'aabe2d78-a8e4-4070-9cce-1f6e9409f8b2'
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