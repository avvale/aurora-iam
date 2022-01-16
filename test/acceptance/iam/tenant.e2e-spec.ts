/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
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
                SequelizeModule.forRoot({
                    dialect       : 'sqlite',
                    storage       : ':memory:',
                    logging       : false,
                    autoLoadModels: true,
                    models        : [],
                }),
            ],
            providers: [
                MockTenantSeeder,
            ]
        })
            .compile();

        app             = module.createNestApplication();
        repository      = module.get<ITenantRepository>(ITenantRepository);
        seeder          = module.get<MockTenantSeeder>(MockTenantSeeder);

        // seed mock data in memory database
        await repository.insert(seeder.collectionSource);

        await app.init();
    });

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'Generic Frozen Salad',
                code: '2k995vqxsej6by9cfyp4tage7nlogg03giwzync07szm4kx5mc',
                logo: 'fil06pfwxexi09ls7h1oom360vae39z7ykb72d1t8b0yqd1otpppt0o12pvkhwqgdqh1xmaqna1wj7brmr64iq9cxngfvgch05nv3mdp6z56xvy6wilnkfb2kil8ws65ha9xi3mo66j5l9hiernq2rr9eba3qf4blzaxk7nshfxqw30kxne41v8hsk7emcuss1d6nymy2d4lfzxc10rlvb98to5q9b521cry8xrgc176uiu73ul7aez0ycee0x1',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'feaa251c-cfc1-4a98-a6a7-7c79145eeb0f',
                name: null,
                code: '1zru2h9ljo1nv6x26aumvmoulbtq13poojb6otw3xk9g6fjtts',
                logo: 'm03gqr2qki3ciad1o23xeuqqacxenkpp26hppkxkq91oalkhvcir44w1egxvnerjyr34k4598odco6kg5bb3hkije9wqu3d1jmprcc8fymqvqlg8w17wm0dq0szo1wltrbai1vnntx5i4pj3kca37kea5c2j7vxzhzfs3whs42l2ctek85j20snu16tall4fl2h137cnx7klq573648lldxfo1vler72ga274ga6k36zefeifmsokg4fwmg75pe',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be null');
            });
    });

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '53f35605-45ce-4774-98ac-ebb327813843',
                name: 'Handmade Rubber Chair',
                code: 'b4ripi7z6sm3mewz1vkwj58uft9qhvwln9genj79u3tpbmpdoo',
                logo: 'j6d2lm4myaskqv62il552n3xlet1f3lbmuvkr2v1webabqpw0tvgnkikzgvxk162bt9y6u3jlptxfynebe3s4s3i9w2em04cf3j8b2jgezwxhhzp206kyus6sp2o2urc4jkaptilwotxzz3wofafcbaxf4r1fvaejf3dsgqfo0sww2cnf3oi0q467igbjv6hia6xl4dncrztvx1yhog3byc3tammdd58tjfakgttagxa6nocibayfzlr5al5o26',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                name: 'Ergonomic Fresh Table',
                code: 'u5b267k5pscv66xa9oxllx3b5z4tbtfk21dstegcyb2m01txuf',
                logo: '1mt9xy9n6m3ano6ra4vou9ygiru3u48hrfqjh9kou45mow74qz3h8kq25w2iu7u4ujj2qiflgocjq88gju8hhhesslm1fhc1yghj83k4jxtwlmwjf89tq1h1ehd4xdyhukc0j0mvnyhl3izhf39wdmcuea3ch5bkcf2oftgemsj0ifnsnr453f5mf2hpo7sbl39sm45f4n59w7zwxlsdnci1kdwm7jazdn4apqyk670c79cvj09lxrwctto2dkr',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '84e10144-7668-4925-a2df-f315bb6989a9',
                code: '6jhos36az26jnw3e9tijnd5b17zo0uip8mb4tvsvjngzunhvmb',
                logo: 'je2mrtbbcf6ecd7smykr99d9xixkh21swlgagvynho8e7mhwafz8altc0pi0uql3tqzsp07xsjl29jcnuzn2x9rsgmg73xwv7pxjuhwxhnwdb2nv6copvp4pevlo1kypufqx8ufbni0oo4fnx35xe4226wb1c4r2jvbmu63jcginy0hmwvys8kow31rdwsgdd3e1frkf5e8440g6czlgyzl96532uaph7cjemm2ef1d1lyy5cwxr2p2nkdn3wik',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantName must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'da738f02-443a-4612-b543-faf8f4bffbb7',
                name: 'Refined Granite Tuna',
                code: 'usm1eui5clfecmz7p8jcrtjpdp1f1s9bjeuzwpljn2hu6o3zrv',
                logo: 'rdy4qvxxgm93tbu9azkxsvfibmxu8ypdgypezb4k5q88dcjax68nqouxxj6rxvycodz801u9jiddakyqmazhc4tykejcwgu5r5m3dr1ycsjssw33emr2w5y0j3aolget1ho5962vwh6ifki230scrvab0y9c62kmhh0jzw2zczmdtevto5hdhr89kt3zqvkwyzhgt7mzn2tm82k1knr0sdyz0gw2g21fy889kftfzekj0pmgxp2kc4xxj9hajaw',
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantIsActive must be defined, can not be undefined');
            });
    });

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'k6ggia9227uz07ro26x3deqmb7dioqqm96efb',
                name: 'Small Metal Table',
                code: '6zflhhzk29fpk7w0wsi8ab9a61y2zcih0evm97k7n2czdon92t',
                logo: 'zjk4oy5j2ckmjet29ksp5qsr8n8gghxxkbbzqpvmudsdnfbi357nanbicm7a5cgwt2dpc2ucorybzgseyeypvt346g6f24xlbyottklptjm6ce9ahdmwjg2i0h9k5mt2pcgrrzi94npwi9lh5b4mz1mt1wtkdzc1yh3h6rxk6cttzkfl0rd1o6v685veym8f1vdpeh112ul0pu2rixelajqb93v98mnv1zdydyeyq90lwbgpnaqum27bx4hlh2a',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for TenantId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '0a43b7d0-5d64-4e43-aeb7-d2991060a7a1',
                name: 'e6grnmnztxbr2hpo9ljl396les3dee9z4bx1uak1n18bloujc0v69n2tcx844t0xlswlss1i8ka1d9g1ueyehiqd3b0dq0adas2xmze9jcytjqsa24undsh9wz67vlcqqdraankwbgbzwii4byyjhahoiya7m419ed3cwvbyfplwhlmoarcshnr32ywcgdoack6s10lqgwzg265a8qht5brdeqvpthjfk3tc59nl4q3k2ri4md9oz88by7512nzc',
                code: '5s5x0fir8niov1sbabh1wbmlhureit3znevey5mz1crbpzymqr',
                logo: '465ma1b8f0hrs4uued2uqb0k3hg588h9s9vqzubbmoq7tlo4tnyso9xf2kg9nk30vv0zq85y7k54mbkuwxbckee367vblnn7tphkq88ztwp07w6zjizo34vh527x7f9siium669un9lf3g0zwe4yk9wlqoda5b0bc0lsus4vuh6fnxdlccizyqpuzs92q7c692tb19m7vlvt2f89xoxsohmd3g1gem6ytrsiu45wz4r83fy64wjxrdsg9yarbkl',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantCode is too large, has a maximum length of 50', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '510a60a2-dc82-4bf4-8231-49da7a6de8da',
                name: 'Rustic Granite Tuna',
                code: 'mdb9zrga930hd79qk7n50c7vkansf3hm81gvqqyrfszbva8vgs0',
                logo: 'oj2csg4nyezo2hecoy20fvhxs48hqnrs5ngsqxi1g1cwy0qprozd8ykvg6nufmdj129iro0hyxxnmg31hgzoq6k817c1wc4bhrf1eh8ucer6mt5f5tq3wmg76prtuu2ysasjfd57qcgeqxp5zgeptqqn20ldswm5ueuedp9toh702m361gq9j8eua3kabdfac556ccrhblrek8g5bvr1p5y1p24lxyvrb8ru6oqm8nnzwvml2n3eu6gbsgj89er',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantLogo is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '49894f09-a376-4a4a-b3b4-745a365797c5',
                name: 'Fantastic Wooden Mouse',
                code: 'jun6de9q1h9a2qfb08du3ipb368ppt1ceg7wvjp0a394y33m86',
                logo: '3bn1umw2164o44z8swvlgh7c12kuylo8hlkiupd35xbd3bbbq5i1o8zkavwju2thdxu8pphz943eumbv9mc6z0g4hv0fag8fagp0q6rxv3b71lvyxv1no0p0vpuhcnwtg6m52ww3r8tiglm0sgv1y7sfdgbxtjc6nhm6lpzuemzhte2mrdhlc58bx1wvpixxnchv6ocbwq4zne4phxl82edglg5864wu3h0kqoutuaq0lupb7azgyncjhduhgs3p',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive has to be a boolean value', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: 'c3584477-01d0-4e90-85cc-9632d1bdad04',
                name: 'Licensed Fresh Towels',
                code: 'v44j0m5w9yk3sipxvl23w4rs12axw2om5y07ykp5se17b6w4si',
                logo: 'seryo076mj6uw5frhvbys5edbdsd15zbxov3yoat5kwvov5andznqklpnltyg4hy5464z1wbhl7p096j6gtc9crnfm388osf1cz3glp1bxx6zxao06nm32zu11ee9duzkaabr8ls02ta1up2nx6ielqltt58rao04t7hrv86j0t8s3ab4ezva8jf7a9lwcj7s9de1qcbohkvwjefbzp5jbp7in8qe5dkk71fghy9cj4b1spmghheyx8mu5sh7gg',
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

    test('/REST:POST iam/tenant - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
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
                    limit: 5
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5)
                });
            });
    });

    test('/REST:GET iam/tenants', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenants')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds'])))
                );
            });
    });

    test('/REST:GET iam/tenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'e0d536ed-0787-417e-95b2-6737c899f9a9'
                    }
                }
            })
            .expect(404);
    });

    test('/REST:POST iam/tenant', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Fantastic Fresh Chicken',
                code: 'vcu019cws2w947tby7xucgi0q0abjp4w4pcjc6ydpt5u67ibet',
                logo: '1ei6by9qpyjn5mt9cgt3uj257htqhl0tp6qbozzsq01yw55abh43x6h30mrczutaf3zro50hs5jxwel2otkd40gf8a91usk2la251lgk2ayh9ihjxswrmgnm0osik1lnb3zli03mpxt5ay6m5bpl3c1p7ty469v9h7ie7538up7axxo2tafojeyuapyj5vcsnqmhdxxin1nlwkfzn4pf3pjwzrb9c45rlyamwjny1lgc18g91wdtx3sysc7gu61',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(201);
    });

    test('/REST:GET iam/tenant', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant')
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

    test('/REST:GET iam/tenant/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/f433f496-7e91-4d6a-909d-033824454c66')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:GET iam/tenant/{id}', () =>
    {
        return request(app.getHttpServer())
            .get('/iam/tenant/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT iam/tenant - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '15ae9d5f-91da-4819-9c1b-d11e6b2d4d8d',
                name: 'Tasty Metal Chicken',
                code: '50o100o8bdujepe8g7fgr93l3qls8o9xw9v1xaau62bqwncvcl',
                logo: 'trt1ve3ig8k3l5ki0w21rg9j3x3mq9ji016ii46v1jhmfz1nrpjk4yl5hou5ae97q18oh0nd6ii6stm6k1ycx1hf3toh39hbionduqi0q268mwdea7f96ler6lixaoqfopyz83cio2mfowudnprz6604qiyerh986nm6r0k9ztw9okhhsr3wfr2f70or3my4cs3soh6nensndx0n14jbemquu90hfmhh0j63cybz5nqorlaglmtjg6n7sqfmtku',
                isActive: false,
                data: { "foo" : "bar" },
                accountIds: [],
            })
            .expect(404);
    });

    test('/REST:PUT iam/tenant', () =>
    {
        return request(app.getHttpServer())
            .put('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                name: 'Incredible Fresh Pizza',
                code: 'e9ovl2qwp35auxltque5o0bzhsnwoc60hkshdl0wc3iw5hqajp',
                logo: 'fnmwmaz1dp2wzzvx8kg78qyf9nam8cqdnjw2bbexfb602duq6g3oo70l1p562108jxwypb6q519nmh8zd5kag0poldfwm4lgmfwf4q36fye34hzd64mfdj6q6nogivdh67shvba6j127j2azvprwd9xbfihxaul94p9knnt9tq8i3f5xzmv9t613e86zuhmdyxv8jscdfu4ecvsdvac0ov1dy9ef248vlf88gogk13m5jq5hfn5wkv45qk5g8ex',
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

    test('/REST:DELETE iam/tenant/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/bee71e1a-1685-4cf0-ad46-195cd5cce4c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE iam/tenant/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/tenant/5b19d6ac-4081-573b-96b3-56964d5326a8')
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
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.iamPaginateTenants).toEqual({
                    total: seeder.collectionResponse.length,
                    count: seeder.collectionResponse.length,
                    rows : seeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt', 'accountIds']))).slice(0, 5)
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
                variables: {}
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
                        name: 'Ergonomic Wooden Tuna',
                        code: '8nug94e0kbr0t94fsotg98nhhjkq43en0dtqwli6ofulcmmq9m',
                        logo: 'g3fxkchyj628nznhv5njfbn5qeri40b1of5y7n3gvj5kiksj6bka1dv9dxh1cohqerpgbh89w0ivxlct3azx4m70hcig4gxs16dl3nihm15v0fjp8zotd10n4hncqcdwabarvcgo34y4s4hosr2x99fkvt0m5cxf2g1bp241dhflapn758csuht9duensm6m0u5ij5qc66768hte9981ecwfg64a9qjssochtcbx6abgv2cs9s9xkv6qg0fum0i',
                        isActive: true,
                        data: { "foo" : "bar" },
                    }
                }
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
                            id: '982741a5-a7ef-4d29-ba9b-b14de105c956'
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
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                        }
                    }
                }
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
                    id: '8b19e41f-6626-4cd0-bf0f-98d320108508'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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
                        id: '0308f86a-823a-42cf-84fb-6d22503bfea4',
                        name: 'Intelligent Steel Towels',
                        code: 'b0g0tdsr4gqmlmt0h02t8719japs6i14weijlalfncre5nwg77',
                        logo: 'pi5kl81tmcgp1c1gwwvwyogwyu40zh0wslbdnh0jfakqbhima8q3euot65wb1mdzmpa72crrl3uo87qrq43noqjq8orrgg8y3qavft8n20pa76zdpg70zte81295014m7q59ns3ffk3wrn7ttnaotbo9g2of01pgau7ij49sdj91hh7nkty4xos7gcbnc401qumss77po9b6evu9zxqt4pzq8quormfz46shga635r8ltt02tewk71mibs99beg',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
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
                        name: 'Practical Metal Hat',
                        code: '0bwml22e8hfc63ael5s98gtkq4risolngq9ao8lfw6nz57en35',
                        logo: 'bcn75iwge8c55qysz9jrb8umq9wkzynz8yjlo01wighfyb67ehe3e76c5n1det8qbmdajpo7mou6wvpyr1nec5oke164o8etv6mnp9j4qaqmnw97a4kxibwb10lse4pl8ykt7db235d5nuf8n0l5ugni6b3qcdkewoz6o5evyr0gjde3swltql07c8q0rhuhbnh50e3e00zx7awyvenb4j78h6z9d03fdumaknaq37zbxf41goswfr07fdoqfwx',
                        isActive: false,
                        data: { "foo" : "bar" },
                        accountIds: [],
                    }
                }
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
                    id: '63788c1c-27a3-4107-9ede-a3d9338a23d7'
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
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8'
                }
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