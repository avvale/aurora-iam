/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITenantRepository } from '../../../src/@apps/iam/tenant/domain/tenant.repository';
import { MockTenantSeeder } from '../../../src/@apps/iam/tenant/infrastructure/mock/mock-tenant.seeder';
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
                id: null,
                name: 'Licensed Steel Tuna',
                code: 'f2fh6t19plcpmf42bu2m8pg2yvzvmg9jm0ur1ddbys02eboso',
                logo: 's17yp0wu54w41c52dz0e0pga0nlqs4c45b2mf9w01by0l1pz4nvmrwkauib7fcxh9h8ss5jdkwm2y865niruq4wej59rjxyv3slb68bfllahgnweglkeq4h68ajue2s00tdxg1zg90b7hrxz5euqp3oajfremc0luoufh6dxet0clcnio45hq8kelsuz33cdxtgo091ub7lj9spjtorftwe5py0stevbbyo94cisggt57or3x6a1gsh1o0xamm',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '53c414d3-9fe4-4edc-a69b-42ebc0f7002b',
                name: null,
                code: 'rld9qkysbnwkvozcp8hs2w4o5t8j9x8kri0u0vl899miy6oe6',
                logo: 'q6tvodappg7tb0djp2i8ay45o0h86tyyrq444sak5di1morvlbiqt7b728aep2mircr2nka29f5ak355nw4ibtrp41nb6clxh5iuwj04irqnzmdnyktv3xg8zbp3l5rmy4vjkhllm65dvwdmiinfrxghkhaf1surt7saje4dh070p62qliqbf9ft06ydco3jkqyph0znsce63mrgauvbur381hs6r21bssaq61p7zjpebf7cqwmq3dgmewmokq',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '11bcf341-76d2-401b-9808-834ead2eb7ef',
                name: 'Tasty Cotton Computer',
                code: '6ev76q0vwsw3zw0g4dpma4b5tvgiagc463ghzexcmz02ehqgv',
                logo: 'vgfn3rj261m478qs3nmw04wc4iodj9tdqybmw5tf9whslbxu7ml464gzdjgz2toaisvhgfezz8zqt5pgdngkmm2ffgom8kyoryifj2oyheojvblymhdgqw6xbu05pfqpyy8tlty5mk46fwdoxcblhiy80vdmdxaqjztu43mnjgy1f2w6p69pdti3dm6aqejbam7wygz27soqctnbfffadwohw6giyrhkdy1xznv0ho4p3z44hs8fw0fxemv2am',
                isActive: null,
                data: { "foo" : "bar" },
                accountIds: [],
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
                name: 'Refined Frozen Computer',
                code: 'extg0btljkjz0ewy8r7dzismm88wf8wmwm9fjr9kp3e0bmxei',
                logo: '5tj2q73j0g4p2a7by1xst8svagkwo655lhdc5te4lperjszi7rgl79fy5w1w9klbqe73iyffl9ny5gi2fjxwm4dsoohooxbehtnh3limibu3k7r2zfi3jfayi5qnii5gmodltzpey7vkv8z700c42urr463nso297qozjrot3polk9aul9u3f953am77f3m4f8ifqfoycwkrjngej72d1fkhp1j2bd2hba35dq5qlkosvebd9nhte6eijnu4pt',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '26f34558-e841-42f0-b0a3-a13b87435545',
                code: 'sjprk28tczw4u85dy8wc5ovn748v5yk4jmguxvecal3260rqm',
                logo: '8pvd92m1xgtpfxcva9ecwd90elap56v529h1lw90macjajlh41dyk8155am2o6rwqfpcjob163at1ut35o8vw7w4su4ifav1yjj0sp85p21gku4an5ybx8v938j8wnrdyv7jpbnp7tr0mm2zhejv5pmf48eant3kbiwpw2qq5belf4r13hm0dezfv738svspotqsnn905m6uptz3gkshkjw1naxd831tuyk17bs3q01crvnrriphp98vyol4b8',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '776e5e4a-0630-48dd-a069-0bc14c17db3b',
                name: 'Refined Metal Towels',
                code: 'fw8kb1txxtd0maidvnkawups19tz4q26w3vv2ypqqz3k6qswa',
                logo: 'qtfvg0vhmfg5qvha4n6kah27yogq3c9e0vf2kq24jvnz6kgmgp67bzv5ugwkntwti68xjegm0syivb65s0bqlfe89gma7jkfg87hetxyvney4w2yzh7kjoobvrmg7wp1iekov7jpilbedj3l0f6qxi4ogft36v0dce3ta6w3wsta32qyc0ax5uh91ppjakesqjw5zxir1xmphdis9r9n61aubrf10rdghgvxmamk0uwdaauxufty8mzy8guuwz',
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '6ld8hr150vvphsfyfi65hqwi2f1aks3z73nlq',
                name: 'Small Wooden Bike',
                code: 'vourlj7jesb1mqo5pecccb8y5vlnbahlty44eemmscwmpabd5',
                logo: 'lvpekz2fkkfrx7qdtnri62zejuwh2a4kt8ixrnfpmqsuqrob84whsl49em7z460iflfbc3w5y8hizeytaonqjagoquba7hrsa94or3un3ks7dum3vb8v2qcop93j9dia6gajh8tnmor6zusx8yct509sp5mt8cmp8wxa7bbcu8mrdoeuwvcr3f9djjeo13z6w5oaadtjnhhpd85z4776vaoppa4dotxn879dgsbzh9yri50swysbvr3mpssgde',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: 'f4337fe5-c52e-4624-a8c6-5fb09505e747',
                name: 'nij2m9j6sm4sf3z7bnyzn99tx2lgdpcyedfcqkutopqp49fp7yeqaxaltwjymqwa51khr52luoxiugg5pp7gp641nw1kla786o4jgt3im7au5w4aelk5bqgyx664imloztfpc2b701134n84jgfahrxet22vu9tnly2csozhtttif7jw0kc35oh9ovl1cp184hdctda70scas6tb2pvxji9u5e5yk4oo6i7757y9lulirqa99tqpoqoz1z0qf5vs',
                code: 'd28812xih7m1pp3u2mkzzvfgdg8553wre25fgy8el5oc8u6lb',
                logo: '4vrz8itnzqmx8yj2ji8vleqstbbuvn69k0no7yec8rxxbh70bmuwunqiie5s1uux0fz4icf6zx6cunxb4vj3gc3aw7k2pg1riw357hu7blieqq6xty5zer3ts92g9kp9xo2oe3u0fs1lw0lf7x2h7bmkcwnusr0qdmmettyfip1flwfsgkbzrz5q8vek3jrmd41455owfd2yflst2t12ths8qhl3h66mpgxwou8ajyxk35yizwi0v8vbxe5vwb',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: 'b8c5e29c-c9b9-4f0f-83cf-1b96c8f3afbe',
                name: 'Fantastic Plastic Sausages',
                code: 'zzolqpoz38rxfuzdffw4mcg4q6alfm557cnp1xbrccno2gz9l3h',
                logo: 'yq7db6otn3spo2c9uuv5vbft4n6utxdeynj47wfkkckp7q1wh7z249w08nxhozqj65dyuh1r5ypa4j7zcycwvyydne5ew08v5h4b9v2xn0ym675wf9rr6aczr2dzse9hogyeipeusqd8rh29a1j6p9hhrjm9pse89orecmpgpmbg44nyifgqmk47l9cth8ogy8rn0qdbzbg98u0wqupilwbo3zdbd1lxmvw6httz5f3vjrcc0cgywl0oyzjo1e',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: 'eea238c1-ee5f-4b84-bc68-176d5a884df5',
                name: 'Ergonomic Metal Pants',
                code: 'tk5he7sww5xpws86etpz8d7d42c7eja5ovdcba8052zj9hky4',
                logo: 'hfzrmwha8bszrj55u1f5w1pq9j9lkybnv3vgfw4xwnplqtizq9dzmcc3gmctpwqzot8sxyfc10szf8bbqij9lf1hpsdm4a5c10k3h18yjja1sscxbesrogso6864clo00vc12imnrs5e4sdy4gkjkqmsnhiwpieuy0d1nj15b0u2wtm0oi3ot7v92k9byt1ef4nifg2c6r5qc3ey4ihb57lshhpc5d4rj4s9pz30lbgfx3xs9e74ihpv518l0hkw',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
                id: '5a49fe42-70e2-4625-853d-4e9346bb6105',
                name: 'Small Granite Chips',
                code: '105pfpftxognkz35feaqh76fy0vs61y01wzuyr1xr8sat0zzv',
                logo: 'd0018sf43x6609pbdjqa1vfzsvqgmxulfsoujlh3486b61tqr818l2jqey1bcbv20r7odzvqj8d1g61mkmwl105tp1z9z5n8jpa1zlk3y30sxrhdq81lhm6wzb0p86xemnly2juxgotcj1nebuvp7rq2y0mcwououf0zz51n9un092wh7vnhd2oascgapc2mbrwf4pt1bw8r00p8tdksbqolji9licm00mll2lp44ocdnyy3i30yyiozacsu6v',
                isActive: 'true',
                data: { "foo" : "bar" },
                accountIds: [],
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
            .send(seeder.collectionResponse[0])
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
                        id: '412c064a-54c8-42b4-a0af-d7496bbf57e0',
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
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Unbranded Steel Bacon',
                code: 'x7kqs2qbn105j1ufbpttb779q373csk4x55ctxd7xp929girf',
                logo: 'azumyrgikcuxjpj56tjzfjho1vzsr4fw0y96s1ep0gdv9f1dyz2npnbxt837mq79w86eg2lomb2wn32a6pnpyhvvajsk4d08t9250nu5igoveifjtdyo0iyu7nkx1hz6q3x2wbazlz7dnk81qzi8qd4lnoz2uqvsau2ukf6tya9v84slq2aco1q0kjcsp68p0tbkrdbpjbicv0jvkxyspbqhn3d0352fwx12syjwg7oqt608k2gtcbcptq0v28',
                isActive: true,
                data: { "foo" : "bar" },
                accountIds: [],
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
            .get('/iam/tenant/find/d09545e3-0c65-4734-aac7-8ef1efd52662')
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
                id: '08b6412c-e806-4198-be80-c8051d4d6392',
                name: 'Licensed Plastic Shoes',
                code: 'fkt2f60kgrfn3g3wbmd93o0henh2h7031ux0r6zpddj0pcmq2',
                logo: '00xdlp8d7rygqg7pwskx0vwy2i024k0ekkxbd9pmvob085vstm7bnsxjnra69uc3he1jg4jbjcthjqr5k7380juwo98skic89ns3g9dzy0pp5v0jfvlh3v740qohp5p41f5id3ih8ui3pby7xpyz6qqbesxmr1kfsxf2x1rfre730deftyapli3cteisof866v3x51jbjgh7pd2ciz83shqbvy7jegbhsn14nqsupkkvm9orm1pm1dngetn6ez',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
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
                name: 'Generic Frozen Shirt',
                code: 'r96rkeq5bzzu0aw9oalk829hd3sxhutthv6aculv0aveubppu',
                logo: 'jkphc8yi5gx9a7bx2eop4cnoa94a39y1ccus0r0bpf1khdmgjz0rehjxj9beb8evfxuqu2wg65u8964rqzgvjhswsl1jdgx1omey90g3q4eqv99vewqrfcsw16ro5mq8jd4v09ntl8h9m11endj36es9sk7mgj63n54nha94ukspvmkri7yasr5qqhcz2ia3ozvjqdw654bek38jvdn6r36zml0f48qiymvy295aupx606hqu6gsoid4wqb2ht',
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
            .delete('/iam/tenant/delete/033b71a0-32ee-40ed-9eeb-a7b4ff77d38e')
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
                        name: 'Generic Frozen Ball',
                        code: '0fpkfnvc9snlkyzslx2nsn3uu6zsbd0v9tv1663ablx2wkqf9',
                        logo: 'kovb1kgwibd9d9t9v9lmm1e1g06pbqbtisewnatxxsp1bklci85pnjaes607e5jhfgqts2bekknqn7b4ndnwnib0lhyjswget8vqun8s1tm17x4j95a7rglr1y7oybu9v1j0rm254i0mtg0xav1bksek1ajp4lqg6yla6gje8j1vd4dun7rynoyt1zetj73ly5opszebhwo3kzc5x4fv9noswd10sc0a42sp059ga79rj4b32qw75re6bie3c9',
                        isActive: false,
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
                            id: 'bec62d67-db61-4c5b-aefb-f23908fc132c',
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
                    id: '3b542c84-6ece-4f6a-9b65-2961091c836f',
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
                        id: '235f0f66-c95a-438b-9888-be99d83e6509',
                        name: 'Licensed Soft Pizza',
                        code: 'i9g0juw18mn2ux6ma4lqi87k2r0y9roxjnw9dio2hvajcrz4h',
                        logo: 'ses6pz9xqq0d7iacitin13xn5nden7xfglsymd364hwjyrt3v0upifr7xud8nux9skw0hogusr6h1r2iakd9jssp5ia08ds8vigpb5q8fpielxa08fgxjl0p80h90l177zxajo4w7lsxz3gsch1nxkqup7ildgqon5ia8kdc1y9e98eyksggrsp0woxcsp6i9nw2udsorfq68im44mw788blt77otxfz6btu7fcbj5td9fo90mw5t2mclp6jk6',
                        isActive: false,
                        data: { "foo" : "bar" },
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
                        name: 'Unbranded Frozen Mouse',
                        code: '99rimcotfx9464rf6wlxi1w3h0ssfqfu3ixvbl927di7salty',
                        logo: '0splcl8xns5lkelz8didi2ff4zlfu5sax2umng0hnmxe5qmehtbmkq0rzbsh7lqbwnj1r11kj1q6nvitlnbfc9k9rj75rd3d2g9icks8eia0tlgn9n9i4tcvshdh278mo76oo0iwnndrk3ge566suddkb0hz0ie0r9r067c8vqv5baaf3s0ia27ulltktpvkge1dnpj9tsc9gsoewlzh6z4bsdml6us74os4ev3xrimck838cnn4i2u8b88fqa',
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
                    id: '9b8a6f45-1a1f-4c76-8814-bca816cf8174',
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
        await app.close();
    });
});