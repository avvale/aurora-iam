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
                name: 'Unbranded Rubber Tuna',
                code: '64ha3o7kxl7w8975zz7up3kj6a51pfer2p9tlo8lr7kasrcrjf',
                logo: '9k4326u31ldpe2ee1pnt1ywod31hcyyfvba4uxaf6w3vlpz6qm7zdvkr77pq3p8vusg3kfe6lqiuhx9md4kdbfua2eypz5elqjwr3o83kfje3pttxrpvxa8hivvbdoaai864rxaj21g8vslannv5gyg0k7gi39iwdyea1peiqrf1lota4zyqp7uoa633rdab4gsdl7vfpzt9sw479bzce6dqbnp5tunmaguuuqmu1yg0zkdjs1ho4kqqds0qwuu',
                isActive: true,
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
                id: '4d24ac37-15f6-457b-974d-806531dc87a0',
                name: null,
                code: 'x4ml202juqbc88bzwsiusvomcgrqyfv4y62a7zh7k8fa5n6jgx',
                logo: '1ktutsqa2qdoh9weqzqtz9dxw3zjffk9b9lev4p28i15b7dgl0jyq4qxweif4bygsudmbt5i5gblbys4ew9mj9mtzwhankb211ip2798iqd9dv7gjfpj42exeb6a764qkvs45m0c0psq6fz1ip2k1veqxdhiez7rtzj08ehpgqckm87xbruist552b1psq7kzlxdr0mtfy2mgnylozfxkn8rdcnkgipwobgcrwe009d9u1l0vibt1repcifymlx',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '2e04a2ad-1dbf-40ea-a57d-bcb5d0f68f30',
                name: 'Tasty Rubber Pants',
                code: 'aymumdfsve4iaejupjx5ngg4i8guz6pct8olsy24ik0o3eze7l',
                logo: 'kustp6ut843h0o61a91m0blbeqipkacwr7e20xd82wvh80fg3immuz8iloqbfwbvli88g2ygt5bb2q6tooxq0koeofqkwu6el9qygwjxgg5jf8s81kvm1m2wj30j3zxlszak97xrnfkvgagoejah9u0a1hxzpkasinnup6ghg48qjquvh4t13baqagxqnoaey8lyartf7afsj08vr2hceyz8bbvdrlx2brryvciudrbxa2d7frpemm6etjsu8dh',
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
                name: 'Fantastic Cotton Shoes',
                code: 'rxe0y38flg1kayw5qygl6toiytp5um3pi4zmjdu0j5qicep3pv',
                logo: 'ir3kyk3ecrw3qdwf441s8foku29vhy4cetc8313wf5zjr63ca5pxsc16cl423sydicwgpl8btzi6ydaod6fur9ql6sg7qtbc9pickeymm0nmeg7qoikqic319bngmb24drr9f2gfu6fv12oxa7q4i8egt73lfnsqcz6siwn1f738gdjfhumnh51ipnunqk34gsipf6kdqkq93fcjcg7031pld8h536sc3fdoi174npl5n7xie6s2krqv4gm5asi',
                isActive: true,
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
                id: 'e9aff139-d1c2-4035-8f01-24842945887b',
                code: 'c8jqciesnelzjxyem8l3pn6fxbkqvvooffwiw4hcrud6309fsm',
                logo: 'orei2ofkucb6dz27elxagosei4adyrb311tchpakhpj6jhesszjoss7mrdj68o68sc8zi7d3xdt4auw95jwu5anv5cxbboegg9k2dhutpcadguupkw6xek16i3uojzx86703bqrtgew8x66lgoqucyc4t207splsm7imr1fqhuyf8fa2nyh0iu4p9p8nkdyy9ojpfw17r6axask24qp0uesfj512lzz5i8aie2fyyr1ggb2rgh5e924k5tdrj0u',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantIsActive property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '83d65fc3-1f96-4256-86ba-f15f0d5ad0a7',
                name: 'Small Frozen Bacon',
                code: 'o5khdfl7ssrhq3nickzp3heumrzmx65l2rzqe1w5mrxtl7gejh',
                logo: 'w6zm2ieaogg96mfo3ggzj7n1ymh0foj5wejtfig61qguiewh8fp6icwhr0ez8ksxgwza15q69awbe3nzczshb3plb57jx7l79rhlti01p7xpwf6wm3rvr8xqjdlueuo9kp1u82r1uzhteh61ipl4k88hdygoguper3orbo1x91ohgkdyrnxj5u4qyzwf63zbbdwl6g6y3gn488q5znan5ctm91e50bd2lw9fuct2pv3fpsjqc3jvueijytew35s',
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
                id: 'owryd4fvoht39yl4wxixbmh36a35gokhbe0fp',
                name: 'Refined Plastic Pizza',
                code: 'u5vy8lzzyfofskjc947dpat9njsbm3zzzqsjfy6kfzfcfw0eh4',
                logo: 'mpa65f3uvg07rkufo3jsflnpxyrbnburmf3cehxw8tf1k8ex5rex9bfpckw2p0qtpya25zf0tatbn315l1o0cqkkxmnc81aucbason5bn86wpikgjcgj7jyjbypiqdeh9xz79vr7u8uke7vsrzl2finot9woixiq6be0pmqmndwncff1ksbw4v89t8613byixc6bchyiiluswy7sx16004kp2hwez9xrt5n12mjy3x6a8lintx72f5xspkebdz2',
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

    test('/REST:POST iam/tenant - Got 400 Conflict, TenantName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/iam/tenant')
            .set('Accept', 'application/json')
            .send({
                id: '7f706630-a240-4ab4-b266-26ec4ea084a6',
                name: 'ul83dwoiy46ko3ezybvq8oc9ngr8dpsi2g9vh3wm99ol4plzjch33168v5vt1xjwe9y4xpohvtby1aa62ula9xsb3mpmqms99lr47hb8ecwf7bi56jcyoowl3jrflwqikdqiu4dty179rzumpzs0rhwd6qj04ecpb5f7fmhwihlcbfar00g50u40zvedvkd2ygpzl9ap1o196bwt3l0nbi5tce4kwc81lvrewj3kwt9blkr9ew6nssggfv6q9sv7',
                code: 'gw69caq356h6ynfr5q0gai231kg2x0yynlzbjclxi5mkp7fmad',
                logo: 'sfoiwg52xg8j3dsmfuq6w89x9tks5qp9yfcoq8zpyz0954b1y3ougvrpwb13wl54i85v831eddhcynxe2zf6dsfaj506bumsn7z5qsrfbhvclc6s8083vphgl2686nwbaashqgxmpxpu7z6kia4nmi8w6d1orsaeki6tfish07kzgkq39sb2vx9l8jqu7o888abt7t5ymdkbz7uqqqy1miij419d4xlsbe6xlamrce6ckjgl2tjx7s06i5f5y84',
                isActive: true,
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
                id: 'c293ed58-4809-486e-a070-6492358f5d06',
                name: 'Fantastic Steel Salad',
                code: '0eoo7mbva55z1rmxmpwzyirnwahtrvbcbli6tin10zzm3juzyr2',
                logo: 'dau42jb2hmewlzjcwt8hi50uyojtv6t791hu26emcdis4wy1tlartr8utk3ij874zxj1j88x122ogvyldeno7eci6fxsuxxjnfoxueov5um1vr3cvl52cxkj38nvkccniwkjkdj4zn6ir86hbjjgrsb16zjulc2bsd7j6cv4uzznhhcw6l1053hsbzbsekr120dl7oe0ro9aji8pp3cyssivd4hbehdohek40shii4uetd6ftgdkzqa7m5618wz',
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
                id: '4f5b4154-0d37-4cb0-b16a-73905ac6db55',
                name: 'Licensed Soft Salad',
                code: 'nl88egu2ad2vyv28ljgisjc8tcf4tkhpzm385hsqsmq8hgfbmz',
                logo: 'dqkhw6l09o8ulal7nihs48cgti7e7e02z7mn5mgjne09y73d4p8lckrgigogabavk2250rc7zds52yf3ktwn3q2gopt6zdqx7egrko9ix3kwlog30e3dsc7e74kevaxdc2i1212s077ovswmgybluywc2drvcfsup0xvw67xcmp2xl9w3s002slafyjn8i4c5ax67kwnfv4ohyvkomy1kozypwibow0ysu1a0w3uxoqcsvm20ae2ivo6r2ct2iay',
                isActive: false,
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
                id: '17325d12-614e-401d-8829-47b1d8339b0d',
                name: 'Fantastic Plastic Shirt',
                code: 'fsv3t5nqqyadbx9rqcrttt7ul76a6lemviqds9i7q9vseq3wro',
                logo: 'rwhe4b6qv7llbs6twzykzvsodv60r11wcozn9z4ijundlll1zmxqjp54jbxomf6oo31tbvg5jin70gaesuspjykuy1jfad9jxjqyhdsegcmasfcotlxizcyplelmxeij57r7jdx9bn7s9i4l6x6va3bdmq7naywgwtr8jvswwzbolb7rcm7zbsnc7ovn0gsxj8qz25u6hzeslrv6i0gh895yjz9zw3f4b162k6ie8qc9f1tn66iy9eowm0s68au',
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
                        id: 'fb1b0a43-c04d-4a2e-be59-46db88d2517e'
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
                name: 'Incredible Cotton Keyboard',
                code: 'xmborwrb8h0d26xxveiw1iqvedcj31pfhu0a1sk7q0uvcxhenz',
                logo: 's1hc5j6sutc94j4gaqo92ccqvnk0qvz8755j6fz9q292xrlyxhxwtd9pbcutgkzz4d0x2y5b8gi7sfzfjmsxwa2kmnd1tppaq64dcmqyw8w3oed0do11ybgz3hr51l0pcrg901m35k8q21nvedwjou3rah16fx69s37h8fgfj8zzcwczeptx27g434y6lqyow2lwnoge0tp9z8i0aml3dm9sz9pulqmge3od71034h7kuch61kjzu3vdiu817g7',
                isActive: true,
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
            .get('/iam/tenant/68ee8949-5503-4521-ad0f-8262fbc79bb6')
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
                id: '92ddb7b1-bcbf-4605-814d-a98d2cba70c9',
                name: 'Licensed Cotton Chair',
                code: 'e9pee97wxq730di0zllelobjqds2df74l3zqftktmw63yzh1v1',
                logo: 'la3aw2qblg3luxh5vzu2stee8o5weo44q6aygvggjjg7iobcifw2dk5ys7njhl1cpg2def6hxi5lw49aowa3ab8h7tgwmjhrtjzxmz6brdkd51xztyjdk2pwzj3zopiwkn69ar2ns2h4cem50umhm6xh3q70zihx9wsmzvuzphjf3589pkl1bgc4j4nt3bgwxeyag8eglyl3hps7fvuwzubk1bmrykt72t1nxkg71lyvt2t2z3tmy5pke6myaqg',
                isActive: true,
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
                name: 'Refined Plastic Bacon',
                code: 't2wmnax9ls4hr8g3xeltc4fzwsvruf23paz210vr2sq05sp6in',
                logo: 'be7yosfukeey5oilng1b5wbgex7yzjo2y7vlpcxf8szlmneqco8y1w07eq0td7wspx17ffixl19ex4ii4wjlbygg6xpdw3hr5d4ch2upth9k0g18a48plrgrg1qt50njw5hjwykrm4spjgooicz859riuaunv34pc0j6fxj3bfncv9sqkk18ndql3753dm0vkksz1uh9v6ihz4pf43t384oc2s4ljzup9i7atfi83ujxfkiht5tb74j76acpem6',
                isActive: false,
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
            .delete('/iam/tenant/cb393df1-f7b0-4712-a529-c0a35dbc53e8')
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
                        name: 'Sleek Plastic Hat',
                        code: 'c09pewq0ihx90gypyjb9i6fz6lecpdpzk5b7jhwo5r1lh56fjn',
                        logo: 'xtp6tjt614ezpp4bq2mn8dyouz964rm9wh1jm8d48vyw3ugpql0uy7csldr6c6zbqdlv91ldei9xv1jt9xoii1lyl17hlv87vvqfj6k7p8zxfs2qgz1253p3l5g1bdcn8zhcqvdcv22txr3q6849l6214cmpc7h5x65jupm9vt1bios2g7a5adc03upqa9l4vvdc6r37eo5qeml7bj3kp241i9xal666durmsamz7nrvh4vk4pea6l6mingzw8s',
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
                            id: 'b40a405c-1973-4c4d-8ec6-571c2756682f'
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
                    id: 'c9eb8304-d106-4ccf-93db-03e32e71a790'
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
                        id: 'd3008e78-1b14-4ba1-bcc1-cc8af6f38466',
                        name: 'Awesome Soft Chair',
                        code: '64nxx0t4td002sb9950f0tpt1dfnaevg4zam11fzpcfuxkxsxm',
                        logo: 'rrgauq37hgexabj771v170y6ktd29vcihsrjild0aqrieu9a34rkuo46ukwxd1ra941f0jfe8lf6y1qx49aesrbz3fnjxlpey4lntffpx9tpshe0h963uqco1vyvwmeh91sk7ihx7asjn0kf4b6up99mkk5u8l5lq5g7m8k7f5wxdw04lv9r8fi0hg48p2oi2l0gixf9w305y58ehqepp11zgx510spmlfpc50c8soi5euge29u6vi678q4xis2',
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
                        name: 'Gorgeous Wooden Cheese',
                        code: 'wv35wab2q2hflgw3wugkzt3cl04za5wdoqc0p5d6viggg9wtg7',
                        logo: '57zfdkcyzlcb2afm8qgx1jyeeemve2t4g8l5wyjo9i88ajquxjgvn2gdh291moe4tnusszfug8zafidmwow40va4i21s2zsxx7ltuvlf0lodr7ldc7ycg2i33jz8ngesyyj5qeadh0oof7pmr6oml24fotp5sj681uf7st1b9t29fl2fk2n5eal9ev5uxrtibtt10j92rcspzd6mz6sks2ygtla4igw0osgp86a45q064n7xmytik306lhemv8q',
                        isActive: true,
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
                    id: '41938f97-cd3a-4354-bcf0-f079428c06fc'
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