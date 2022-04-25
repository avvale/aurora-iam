/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '../../../src/@apps/iam/user/domain/user.repository';
import { MockUserSeeder } from '../../../src/@apps/iam/user/infrastructure/mock/mock-user.seeder';
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
                id: null,
                accountId: '699e3c65-7c90-4145-9bd6-2c654196ba7e',
                name: 'Awesome Soft Cheese',
                surname: 'ripyjaw60yikylj3wbisqo78c8zf0dvasxljs5bguzs18xiqmc6udmdp6pyqs4ebfejlm3g9u8ok2nk848xv9jloi0dw65u4pupt1ed7w7o7jtceo0hvrzgq313urxfhus67f05yumpn57h1pcc96ymttx4pgvmn44dpv5sv9yondfn39cf80z0hsukzb96oc7qaitfrowpf55opyj1tkgx70fjakrwpz64voc2vcdd198emormr66om9e7yv0',
                avatar: '704x3ncj9vwyqqvndhyg2ycel1w8z4jbvfaq6kswibwinwabslz8voz6xdapb8j4rt2x8p21nasapin0a4def4w8n7sra4fdmwmx6rc80owmmokyu62tn9xkakj2j47qndpng8dy26nqtn0hq3jrvfqfdt0ylomczdtmb1mcjj31acp88vevha6dqqfgi52o3gj1b1vrm7762ew2l5rnfqvsi3ygutmj2knr3wzhkfd9so7kc9k6pysmu1gqyk',
                mobile: 'kgrzmfwdszzkrzrj9uze745g42ri2q7nbmoklhix30hgnzv0j2cikqt38lq',
                langId: 'cfaaab37-bfe6-4c93-8c4c-a8af2665c267',
                username: 'kvu57j693dtwwrhekfbh24y7y4343om2ncgey2ankm74gb89ryn49hy9pngkrqpmg4bzaknpf76hwnatvwie1sld59dk6v3yhue2depg4fbfase38qinfvy',
                password: 'pzzwo7zg56a3ckh1hqqb8gvvod05vr2i28ex73eecw8rx7j2zg5uhapwvi0pvktg8hnipfl589c21feg65gma7ef9nlfqm8v78nf72ocokfepkha40wjr907lpl173dw9yuxt5l8uef9ecy569l0ke5g7o7esrdsybrwaq3khdzmg2vtlanep3th3b9k9b08ewvbidee3tmdpqmcwmmbuxeuzb48npmmyc1gg151bnzu1yjpf26g1sc6p8jojr',
                rememberToken: 'ae1ai55mtdydew8e8b8ndjc787lpjx0zepgiwrf210iz64s74ulqb96ucrx70jcabqqycyh8hw2w3250u60l4xhrmbqr3dvofnx1iybfbnqiglxedp0jitghnf6djun20uwwhnfoggwriij19rph03xm326hj80pzq8092dp6x280ffhd1i9l5x5606nnohria4ivi9q03keji3d2fjdxspld931fmkzf27f55f4umk3edpxfrv79z7stdsswl',
                data: { "foo" : "bar" },
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
                id: 'b9bc7a92-bf9e-4f89-a168-b0f4af64d4bf',
                accountId: null,
                name: 'Awesome Steel Mouse',
                surname: 'sd698ne9me1ddxm0bkhawxqddcnequq45kg118z0qzdqqjloqpepa4l2av9yby02c0e0wqf4yiqlqmeetntaamcrodh6jrs92dmcmghygjpren1pvmtuvr15xudq4y6erz3wm0of0yz6gyihphnfsiz2dqz1bei7qzjurk88sint2hsr0sdqbbz69krtf82z6cfyzlzrzynazckwtzbymjr267u2u82t86nryh8soyj2bravaozati18aegwny',
                avatar: '7ti0v71i001r1yjzji2q728bnouoqh4wcm5yjrx45tcfre6grhswiy2n9xjhxevine0lkf580c06yx1ffk2tjgup6ynzj8ff0ucxxd7wtey6ovv2kvf650u4oysndqilt10fm1idqo0a6axf9uihvulx99afigm89a5fr0ygo8t4ztrrwxpmxw7bget8ocllqie70gyzldo8zp2uoer9ij44wka2irid63zorbgshs1c4xufmvewyf41ioyxkv',
                mobile: 'bhl5qyqni1cy24dbu9kvtm6p0hatqkessv5p31d8313otc4ro7p31v4ka58',
                langId: 'b37466b7-e876-4f2d-ba3d-21686b2e149a',
                username: 'b73d67ur97av3qs5gdm31imswbedcimwo72zpr8ztjf0lx3ftnkewxt7wpkq1axv4lubwriepwmicrrgpgmnvw13iwmj7nsp13rfil9kqjm9gmydyk6ptmd',
                password: 'ly64hixaz1ejv6eprmwuxykuzr4c3r9mpk0usc74z0q5qckte4c25p0mq2uyrl5vpapxqjtjf1qps4gdbk8cjqngtbbtxaf5y6p6dp7vke3e9nsmacw23xmdc4cyugsrfab3y2yzlntyx1z7kib1e2pl34vs76n51wwkcb4dtu0f9j62cylr6tx3axspxvh49v2q49wtx7avb9r0bjqujdyx4ammbehbx64rftqneiwkooisi6b7h9ghri56lz',
                rememberToken: 'arx20cf7tdgiy1qhtm7eu98l7d1wnq43c1xyhut6jl4yakvq56gvjvhv0vqo01q6d3m8t7z5stywk5t52fh8wwkwjpfhykerfo95tdrbgucmcouuybmax1n3qd6rl4bzkfriphqlc1hqj4soaw64z91pco1hrn3o2i2w5qfrqrl0f5fatetjtj91ivyma4ydm2gh7sk5msoqzr8umxzxmum06zir2t7muncrrzzarkejxcwzpux010xadteqn0',
                data: { "foo" : "bar" },
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
                id: '5cbd06a6-0d61-41b8-8f4e-6fed438c663d',
                accountId: 'ade1c042-8dca-4046-a413-f603f643de93',
                name: null,
                surname: 'l7f9vgnyny1i9z71g38z4xah2xvdqdtr90rxuh75g2qtmjmnzin6x84tzly081pfh2d3cy5af6pi8huftij9kjbxayysp5agdcltdpbnf287pdlzp6s9q420ml9dud4misgzesmyipkpqxa5fmrz3gaec6dxxy8aom2vd7y9d11wx18y78vc4r0jxi6syj3tgy3jrjizziqso1lni373fyik8hxcp470apqb9xrgzf0fio31x5xfzrhswuv9ql',
                avatar: 'z94ongaut4ultui035wbmmtphnjdxqbffvx20wicpbbnu56bqnl7xeqzp3mmbm1elaj1xt4v6ov1va3mru7dz3urbk87f55tmyvztih17zutjd08ck2zhn5dhxpovcp6p7u7velznwpbrg763revqdtwl55ehomlad479hdl43xgfthqbi0fqidyp6i304jgiuzwxlya2gjy1zuz9enmo9v2uzxrmo6ii178t4iq1inkjuywjwyp0tddyep02i',
                mobile: 'sntxv2tbi48n8d7oxymvrjxuda6u2f5piadnva80ru9qa10871bv5sl74su',
                langId: 'c497d401-19de-4174-a563-c7c7b110e0e3',
                username: 'dq1dp86e9xgz6dg1iz35s627zkkomjzskfonmrv3sfucfbuecq0wukay8cr6nie0ec0iqdfggvsvisd2a1utgwkhfq54rh8jw1z2w815wfrafihb7ofzzkn',
                password: 'w4h629ex8etqm6pl7h30athoy7481uqwkfpq6t8ljc09x09wbk2zwwf0svvj8iktnwon06vj6ohvsa15rqs8lgn7gkvacvczggx9ybm0tx9si2x4nyv5wlg0bmxhftpf2onl0hqu1c7qqzqool1eksgss7c2lkho2kccx4kp8l5gu7wkbmla4n5ypjmssnf7rgnf1zf5rk8qeu5acdjwwlco3g522zzksbflkwfvyzp8fsvalwevzdv544h8vf',
                rememberToken: '9aaxs066krf54b8uhwcg8fruf70zbxpsdn94amg6h0hrn8e3d8vinpgymvabtoh1hrfcaz43v747yso4t7dvqyujus8x6tnjbx8j914vq07adzgw0qwcou6hp7caemyrmre1vqayl7m5yo0ommhpk9lgnuz5ibplzskdrq49iikm7aj1t92otn12yp6rqlm5rg8gtacqkdhritq0u5uijmj21pgg6ekmwcjpl3xlm6c8gagoufoolarmvwih4r',
                data: { "foo" : "bar" },
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
                id: '327918b9-c66c-424f-9fbf-368382beffd9',
                accountId: 'b2225c91-5d5b-4010-92d4-867d8a60e2e7',
                name: 'Tasty Wooden Fish',
                surname: 'xf8s0g4sdzhx6uw7madp74cix0sgsau849z3vtzr5l1rzk6ctpk5t59clelbgtsike023mpl49kfdo0356cqgy3xlckbjkx7epil9mwo045dymi4z9uo4ry2ymleowsdczsywfkboeqyin14jxeu96ccjhfumkvue6597scckm0aprrurn9lnn2ymzx6zve65iao6gtdfadz5wygz1qt3xtqu6mwet1o2djusdlrjnlm70kvtvlfjcocv13igh',
                avatar: 'lrtqoae1lx3pm04pzyb3zweohutf5wl5wemg9vrxz6fgx7gbqajd42z040migctehfyt8zvrv2cxrek16aich94larj9qljm5p2jfoky87uacb1mu6oh8b6fmjuy8trq0pk4eazamkdizyosuksay9fyug1ys50n25dzka2d882u4aycjy3oli8sexrseu1n3snmj2iqsoket1xxdwas05hug0gzp6ru4j83el3g57rgt35tbv4cd77cib9c9b',
                mobile: 'tlvdvp950shkcfifdawpz4ex05gzg45dyz11n5dwljz9wiliy15u2oo4a9h',
                langId: 'd013cc14-1839-46e1-80fa-b785fd354701',
                username: null,
                password: '8y1z5zaa3ej8h2na9rsopeutx87fc73jrj2f016n9l8m3g82x4gcjz1bwn65r5xkqsx6lsve7m9020rywkb164dsb6h3ftcqt1bnskkd9vxv6s1hv9aq1ykgtd49f6dqkwmhofovbeoj3du207jceqo4jk0ln210atezccexv8tr7i0g2z0djttt24ooketpnghovki9rvjl60afti5rseyq17wyb2xfihlt8fbh0p8n80m3txs1oqkdpzh1i9',
                rememberToken: 'izp3gn1i02ymuc1r20tmh4idrht8tv2xf472mrhko405ixn4zuhl97sxtph5re0r41q04mp6y875x5nfd1847qgww2cgsdx781t9l2xeperf1ze9dzybvzyrnyxit7cm49bye77f66nt60q3efysehwx4i3654x9entq534yrexjiurxvkg5oxvn9srmw68vzff4ez9eivjr4m37mwo91z8eyn2duyadyc6a5agaxj6ihtgdiip4zw6oq6d9mu',
                data: { "foo" : "bar" },
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
                id: '935acb06-f3fa-4087-a371-81ae9e40afd9',
                accountId: '53d06c46-1896-4c1d-b3ff-66208e2405a4',
                name: 'Ergonomic Rubber Gloves',
                surname: 'dibc2ehlplv8pu65twrc8vfjg49f8jkesnnp2gifjxl0lmq1zdwj9y5f6vq0axkjx1x0l731zvjs9se59xqj829qwf0koeql5jz8uvoh0h4hvwnje3ttutge6lakuadbc0jz7oa120gj38luteawxmjndyhpag8xd4yiqla2sr4rny1ellpgrjgl3dxvdapkpo7z5xpch6vuv4ucyobub5s4tmoihxof71ljh6cev679a8dwo4fieb433uvg33',
                avatar: 'yry7ytd9hbxprvl3xwhwylwdz00cwhzypmdwzeokk8fk0o9slkezb3n0aw4pwwe9tja89ih89bvowlyftb5o2ppjy7l1mpvomfd4c4pqkclfh124i3u90bn6z856abd5xpqadosqn9mvi1e36rd0fwurkgxqsz8hc2efsdayhsneadxrik17sjqd53u6z71y4504ai10f0o221gq6rijr0uczvgwt2elbaovll3fl4hw80suynkh0b9rcqrag4',
                mobile: 'i578q5ecef4zvas4xmh2xkmqfienxzop1o1g2kkx4m6lmzyw7aa6uiaw4tm',
                langId: '823678e5-c683-43a3-a3d4-20282a93976d',
                username: 'kqjxc7e27ba4heu11o5db3h2845ehksf2y2of06dzjx7ttxasassjt7lgkpgkblr0mb9aewyfpz67niodajdtlkn4d3eurr508ox7g3887cmo6wpwd8i75j',
                password: null,
                rememberToken: '39ik5wipctbx7nkl5d9dlmtze541ol7l6w5xhjfwwo4y4hihbaj0rgbxf34syx3kgfva1li15w79la270uy6ezb7bv86p5r48yt48q11vj7wddj1j07phoxg06tqvk193lmyjra6jz7znk6ncbczkn5p9qaulrgne4zvhrkwwgtop828dutn407hzqqb8m7mh4zcaslzn59hgoxq89geguwhxihjryj09zr8be734tdbqbfmboppn4o83x4hqw',
                data: { "foo" : "bar" },
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
                accountId: '87d70524-10c2-468a-9783-1a30aa46b796',
                name: 'Handcrafted Wooden Hat',
                surname: '2qtnfsm2lpuvk6rs09d5i0qyj44rvfazoh4g0z3b0t08dgx4ux0khqo8vlnetdx9mwjvn1ncghmksyckwfnau1uod14jp6o8xqlgp68xxol0g68rxd8pfd0xwtsjpnw4w7esohls3mz0spw8pz460ns1qsc4j9lz003oqb6b4r3qqwrc1le52vj12nizc7ofgbd2i2j627kkfnrj2wz9bo4hsmkj6wbkupqlddqyrjvbf0hqyjl4rbqkp5ryhm',
                avatar: 'dvqonzrgak2x8lihlrpllirkw4ctmeqoegbapcyx4i2atewvu47p6waty3vj0b4q145c8visfrlgthrekuypotnb8tr1tqrjqm33mrxpny40mcfvb6qqx1v030o60sdc6m2dp0n704plbh6cff94d562eljxn2y3r4vy3j5m3ozdzr6a8hhmkqkcryoy7gnw1tafdn7erw4tiwqvoom9kq55ur7b1gj39a0m1d7r72ej719h2977qdrzhx3puh',
                mobile: '6t7w2r2zsqpunn5nbc4gmaahlbbeeknlfu5k7q3atwt97xzpd9y8nkhk4gs',
                langId: '08cce0b0-99e4-416c-9694-cd2cd7ff514f',
                username: 'kwngx7x9ycznxmjhq4r04mohlysrkp3o32bsine0t52d7u1itnak3btqh83x07atoeqvpr243a6yiyproyaeiaw5u0iwu6e58s0t94hufxkylufqaa8xhik',
                password: 'si3pxmlk7xzf8pbxliq7p9uzwk65twx121132l9zq3vvnv895m77e9yhrfy3nc317vq5c718a6bxuzg4bmlc1jlz3f306gtzvk5o92i0of2f1tbqou559rzfn2p467e8u8tfc3x2dj243c8zwuc3a7ass442wmcpjqqlnwzc3912jf2kbako8id1svnxg5imuyxft2x6gn1wv0fwcbtcufyqoqp2y50qnf5nl5b0ljjli42l4vhxhm38ceb5cg',
                rememberToken: '58dqk3hbe2hij082i6rzpzw4p6s8t2hd3iltgmnmgnobjzvelwq4f3ndbz76jhe8z2fd48cmonve1eo5o8td60x9rqegnzh7rf77n71lw5qrrgvubddra9xh1o2jh8ky1lbpfnirv7gew9i3i4j3kmut3kbk3cn7gl0e0nfdfn54e523omqrvnjvnausftqf4tlwhxrzfpc3jgcs5xau4z8jak5xi5ljy4x4zdntlune553q11qyab5hb21bwt',
                data: { "foo" : "bar" },
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
                id: '55b5ab88-86d7-4eee-9726-9270c17901b3',
                name: 'Licensed Plastic Bacon',
                surname: '4qwwjgmwo4miya16vw0zbyba2tlhwbdvv3g7l0lowxcocqgxm3qgszd1l5lxwkmfsvysklotkmom7boxl4kdb8jdtxb5rxpqn3wlor2dff0ib7ut67sb039f0juoyzemn0ix96upuv6thxept11qqa7v1xsl7uxaftf8uarn2cirr9txkzk5mi35eljq9bebk9ed5rq4td5tw2cbpgxasi4falsyyej3kvh5nr99fzqmcq7twmlz1psi10r9pl',
                avatar: 'y1etebds0lcsugod62728qjm2rz5vb9lir21oxijq66ccsr8a1dmmoybkdufrgg7qtq55l4yy44ytngdw4yk7w7noweoymb06n6ka8h4uojn6r4v0gmipmfa4tzbqqz1mutk2r99ic5687eb2irlh2hxk9r8y6vetvektkkggq7hlv74xqcchvwputr0v5fi0cmdumyhp4i2z35nb5ewksyy8jkksmoumumiz6i51evy6jpq2ifmhtx6treigm',
                mobile: 'w5bsjieww0kf1whwv0by7uk48zb176m2dw099mi74sitmfp0enu1fwrkm4s',
                langId: 'ea00aec3-b46d-4a0c-85c2-05b74738d708',
                username: 'pygwhuce3cfxb09tzygajrbszji6qrhhpg6hf7z2jjumxxrbdunhm24n6kaf4jle5fyce1khc0kc0qgb10uzqzh9j6uixoyfqo15n9lhawq2o5xzj0l6ugu',
                password: '61prgp8x8uewmo4eycqg79krmkcj5drzyaubnckow17h8dxv9gjung2yajltn2ebtebo78ohaqf723yegur5qglxre873w9q9t3z5hno8w8pt4anizx6qpar52xqxxnv56nz8qelktr7gm0fk3ugf4rvpkggzbksj65ub6hfznsse6fnmgtiwe07wx5qs44gbp8o7649f18n37a6ucn1ngyweo9pyfoqotos7crw4tlnlfbwu5uxckktuy2zvk',
                rememberToken: 'a37ajl95suecqb17wt586lkd4q8ujle2optbimcotq0uocok4uwauppstmietg3l8jhrmoeu3ftwknwfykfk3u3x7y6qp82ody971p2iom546y7vtks11ozhodskq8w4faptinze9s5q7pejx1khas0p3m4ry4xlkeq19v2dac8w7kcn1kd25f1u5137wxmwqt8xqn97uzg2nopqsu7d8ftnh47zhwdkrox8u1b11wwc9k0ih8w7tipu0h6bgj',
                data: { "foo" : "bar" },
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
                id: '0c596968-7e77-48e4-8d9c-787ffaab3f71',
                accountId: 'c1fe315d-f7a2-4417-ac8d-a218e1058794',
                surname: '7j1g40e5uhamapnhew44w9auzd9jv397j028ho8rmycday3gtcs6ebvuqcld1ovv4rcgxu4xo8ka94v8fmqwg7py12bluntscqhhqo54dak0s941e6atmc65e8yxcbdgob9wtnpoc6ig5t50lx3qw19096sx25tmr8vjulqjlq9cu5u1ulsdpccw8xr3bhtagohlxqj8lyi5398i6g5tis6joqok5mxnyxx7d68hticcwpv7cj556310qyjeq5',
                avatar: 'pzh7f4874360trv5qecbm753exs8x6tlhoq2ugehe2xspyrcsadqirepr6pvaw5dbrhxne0tcszbbuerjoy1e7y48bxylwmejtr585as02pibw4u38fahp6y2cruncjt6z70b4oan0uagghdmminve24aa86be62lqlzj0saoum9vnpam63vyzulfznffii91n5nrfqz1i2rpp7onh20h97m9kdqi498uq2y8r3adhs8khsjvxq5dawi5id7r2',
                mobile: 'vb1gl3sa3hyo48eq4eu9ned883rcrw1b1mpjvb5veenwmxysjznmsk0rwm2',
                langId: '7c6966f8-4592-4928-8f3e-ea125cee7c53',
                username: '46ynpm7wlg32w0g27ujtw3n2j7provscrqj675ftvvewkdx7ocmujcgj9lpvsr2hwr9z1f99uze66ifrltmijdy40gw3eh0vw622y3io1jk37fxq1l45vnb',
                password: 'bi42x56f8ypk04rgatb5y2goq6jifveqlku6zp1a7bll490n932rjzueit7rm045o9cw29r29dqh3mv44iy0392smnvfb5gkegr18izygsn8esa9ctu364z9h8hcvwnryzmx0t6t0wn3hoflj17yjn52snxdxfcv58n4mg4j91dm5u5uvoseukoi6h37exgy8irpmc726lwm0rycm5x8i2f0fwy15g4agdf83oje6dhwmqufgql74dzre2qd6y',
                rememberToken: 'g6q8ywxx1hqz7oag3tv57ngsk3timfslot8bu3o25b30ari9mf3zys7tlxcs2ps9as4ho5oi3fa1o42mafesi3otpw1l7lhe45700m58240ri4oz2klkkbhgir6n3zecvdjpfmhmol4cib4fwj908ioqjh572l7vcbr4q0i8q9fahkigchcx930b324ud1mvyhem0ymhdnuc9gapfgkouiam3jrwmzqk4pwr441xs2afumc5yl5fezbst4h7m4',
                data: { "foo" : "bar" },
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
                id: '39618a31-76b1-4b12-ad55-1cc95aab1699',
                accountId: '9e29081e-7fd7-4cdc-aff8-3fba6e234f9f',
                name: 'Refined Steel Keyboard',
                surname: 'kmpj0p9c3q4acflkfbt7ttvkyp5sebp8zlufbcu0hquhhc94rb4pdxrs19qp9bgxq1inqn3y7yjl96r9rai7t8e3i4sjvkqyoehmiozu03bzna9iluuq728us2th3rqas2g5vnewcpcm4bbbk7o5zoojgebgcn85g7cielc1nzo8ie6aan0i4im16ay62aevvv3emyzr2bb0n6h1ze916vi8ix3tizqv3zmmjxm4tko1z9mml8dhmhgu0swf3w',
                avatar: 'lncxxg21lgvoyo96zgfde1ad6sbdy13c3dd3bf2zqh0ghwx9i0wx91xkz8f8p0kybxpk33hppr9hczqjxebdqpnzm6jivy05jyjo07dwjm3tl81pe9816y6o0j0prvlcjpycq9701mwnzuzv8vnkoybm6xm2ao7ghkw9iw9scg7k0ljse4vkdkd7n78xdh89y703nedu4anb6d6tjzjntygrf0ehn5oqtzvfu8dfz57axvhyryv2iwta40r5iv',
                mobile: '162zxp9o6kh2cs5mtoyt9uh8z182jhdsqk6yjdf7442ewhxa4zztlhr10mj',
                langId: 'fa392a3d-ffd5-463e-a733-d72051c85b33',
                password: 'lb972j0zfqttpr7l7zzwlix6dvmdi2f8ujt5v7dn6scm6656v610ohva68e6ylvpne3flemk95a85v6bxphvb74g5udcr5ck7j86k1vw8mv2kaxekdflogl5uvrzv4qwvwclq2buv6807v8oetwu1xuh6deo4srdcp2fzkyxq8e6g6d9uonx5p8dsn73ejbb09f60ygg6twzgek3t6zdwdqahkkrm6ejl6d73rb0pxdp6whjtbw6wvbpm8o01m',
                rememberToken: 'azdvdm2vln74g4ketiff3vs83rajgrji9ckvkx9grc2qztxdcqjxr3dvmfwb9rre3ai6zl7kiviuaqj0um3qunq0zquz30ae3446s18htvwyimbn0yi3yqvsmaja3spi0rf97edlej67pk4s0w9elhrczs8rcpeoiggnz6g5986j9hcpzaq2hmsyyd87x845gngvxzeuz8cmh8sb494okvame99pq661rm2vh5mjve5a0e3nrq1n4e4n1tuh11',
                data: { "foo" : "bar" },
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
                id: 'e49644ef-432b-40a3-8959-ee9223c8a01b',
                accountId: '1a9cc4ec-fec6-4c54-af4c-b173d2c80e16',
                name: 'Handcrafted Soft Sausages',
                surname: 'inl9zz4yrgdgrgcyjwffyr9sncpes7icl0fd9vg9xmeieh0m9i5sy4kbxxy9v5kgzph3bcd77b4fighyk3b1uwdvu068wzcb8bj0umuvbv60uuf2f6g08gnfkdcy0vnacp9lnaylm4a6zvm3h5c8g65mem7y8hgyo2jhcui8yxi49l2cepylkcllt7ntrx57lgim0yb5mur7nkw7bnz8gxm2lhs2hwxszthr15mlt3ahxdbr0l8oppmo1k8u1q',
                avatar: 'tym1j04tiptjpwgip39m7axpnbvtvju3p59rez36gnzllpq2yac73s9oz69jzu8q57lpinkp9kzwg1mdd1anlcl3ibs7o1xu8nt55w3eexo0o5y4lsr31lfcmd2pnjo4rd0cy8shmb2geov4bjp0vzgdypm9sjll704dajep0nmeujgnl0216v7v5odwe8gpjredjw2v36jr2wtbvobb9jv5dgsur50lnlkefxcywn1c5epbvi2k39zir00m7y',
                mobile: '2510lwbo7iyokg4vq9hfvnalwr7os4awt6n53txq3uflm46wcmvn3r37hxb',
                langId: '81ae2cf4-6d3c-4e09-98ed-14a65e2897a0',
                username: '4snjr5fzef57g5hhexuzsu5wh63hzsctl4zxbqoqerbt63g8eox5zfr9dbbu3nmkqaqpz8ff2hasjmwf8qbbq3vqbx455u23odztetmbeuk4sreyvordmea',
                rememberToken: '8i2ldy1bgjq4e58led7nwzs8lejz8h0wr5jxd6e392q5o045veb0d5pm3v4j3vits0fi6y3ex5zgqt526zej3s9gkikxsoiytf7fie8vxcf49jeo5ale9salvkrvw7sgmik7u8w8p92iwqej1xevipamhvsgs9q3aalc4mhx5in5tjj7pj9pqe3c3kkqcsvbdajd4olj066kr5e9sivcqbx6tkg2igvg579k5mnuth7bg2cltpovzq4dpof1bt',
                data: { "foo" : "bar" },
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
                id: 'v8aw6vmfpgx66rvl7hepfm5pdb75ev2q3ny26',
                accountId: 'd371aefb-84df-4375-ab2b-b4b971e3d33d',
                name: 'Handcrafted Rubber Chips',
                surname: 'ibkc5if7ht650jcutrdy0fnrteohekdkqhso03dmziuvsvudzbsxonfnmi1i6a5prwhagupd50mws2ubw8vse0o4lbd30ag9scy61ppebz95m7w3k1hqkisw6dvburib3x4gq59q6dibuixy6lke5uccpw89prdw50trodsna84pxx518pojfb3494ww4g9b6or80nv807esyx83tij249xo2ylsnvdw13xeoxwxe4i0z6dg87uwmn9y1o4212',
                avatar: '34qurak40is02sw2pcvgcr5vd07eewmv52l7byiar467zi7dcryun2a3bxjgcqlpf7jgit0g7vum19192br3tpp9t1jnoythl46fqvr4sboniu3havsn0yj7doquz0mso49u788gm0uzrf3bn7zaxrwslnd92jah2gmp5yweq3qz3x9vmmdsii2wk0unp43odiwasech8om6bzama83wk835780jzslu7wr7527iqbbqyjhivys9a4cw2qkueg',
                mobile: '8n88oxam1yea3tgbx1hvaff9hj1n5msizpbrpj02dloqiw511yf0g23kntq',
                langId: 'fc3d3636-5ad6-4593-a001-a22a6fc6c429',
                username: 'cem8zzjnbgsiftukrofgdftyzy910m48x0cs0i8rqvf4eho9z4hpknb0nkxry0s0t4nx6mbx4cect459k6c1daa60kias50u419z17pqabvfjfkgq72a6j0',
                password: '26tkrnk6h3eel4d2cbeem6epdolkih882tksh23hmbmft4d0ziacn10tqvtsnbwil82iidrnx7weegw7twzyuvbbukj55vjhgf0vrken02bq80q1ejp0qrsto550vmviydd2lugqjwcz2q8daoautockplp4qfoz4i5b2fy2kyh5vthriu09f29vclh81naywjvyhd37xwq1vi8la3zmgq5pqmppgfme7lmg3p7xtk2g9jtfhfs9gd90b3rlki',
                rememberToken: 'lthwy9lyui24zdt1ecsq96v0pk2f88fzl7vuq702bzqww9e0c4w13qzuz3ovqvlil8303ts3k28ylcldyk5bl62awg3huoc1u755j417yxvavmzi1vjp15y5vl97x15urezuqw6w85eaertwg7iob7f0ibqcmegh90vkxsyp3a74ppr0y2bc37wyme79b4xcy238akthenhj38e4cbxvz615deyq6kf044xusf09r9lyes13ur4w8zpkvu85wi',
                data: { "foo" : "bar" },
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
                id: '3a9519a4-e6a9-49a4-a01e-602ddb50ac7e',
                accountId: 'ty3bx3h0fcr3ho8jhwfjl1kc8zmjk5dqq9pip',
                name: 'Small Frozen Chicken',
                surname: 'auen7u19h8s19sdzx1wo1hlm6hi8nqsjja6mljylo4xj7x3rpbo4b9vm4m9ilh4t60kgjazyyqqxggrs9bcsoxwskmh2lpk0urbq8g0fvd9yjj7otokhl5tqpnt83480i5hcgvmrxgrc6t4mffl059fnwxpvaijrsq6eutawdbo3o7di69o06aex8alk51edyjkrb6amw3vb8h9dhp05xs2gwtl94s4xq661sqz8y95qjk73f13vrtpihfibbj',
                avatar: 'wadg8uq66a17qamn8r936ohs9gc6fev33oc390uekxuw1kzw3klsr6y7eebzp049sbwn7989q18hych9nckkt6wtjcbptufvx15qfw5xz0kqqk5wgs9win3dsmu08462yisgzeqh4evlgvyrfuyawnltnylm25zu3j94174ozqa9u4yqw69725130q14nj591iclh5s8ipss07798xv94gd5dde9kja5tbs7tgpoxkzmmogazx6ajt8g2fnlpx',
                mobile: '85wvl2l8ebqmuzyoog17rrienpnb4wgtjk1o1ydhd4kdgcoljqesn6qeob6',
                langId: 'f555c80d-0b0f-43f0-a5e0-18fea423ff4e',
                username: 'vg76pnaj4gz7mbj5ipz2ow7fujxhye00fwfxz6gojmezoxro1k2inzkkdyyu8ilcb4btvrmczsarvgt5mb6cfwz40auymcfm8lcesm8exnpc43hbdf4ym5m',
                password: 'm3l6uhidtx1jps5l53ar2zi0ma2v9jmiz82musmnkt1hgup70d8jselv2qvsro52qccgu0jh7gvvso0smax1gom24eeuu4txfukgxq4x1yt7pwwr701oochq9ruxc23bkdj79c4vopy8j595q8itnxfenftrcfyhdxcuy198s8mec0d4qmq2bc1mqhnurj6k1a91i9tbxkfqx0nwxze606jcb80if8mo1swkoszew88l6z1hjendkw021pwq7k',
                rememberToken: '9rboo3euaygm9135msk6zwe6y4u17uuvj3h49da22i8lj8d8s48qijhj95ewkk370u0wgol8y5x7s0ij9gvy78nucvhgethudkan97nb0ntxpg6ngotts6wr8qy5mzw57mjlmokuz8ycteltp8ntqmqsd2f4sjxtykth2t90ofwyh9c5hi5bz8jnhu2f08a4yrfof07uw9z17o24zo8ay4xaqfs919ncdmb6tblbcd1uhqsve28zkq8di5qrr6',
                data: { "foo" : "bar" },
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
                id: '6962713e-b3ee-4d4d-aeca-464650b219ea',
                accountId: '8ca8d957-27f7-45ee-8541-7025083875dd',
                name: 'Ergonomic Concrete Computer',
                surname: 'brh5awlyisik26yzribpcy2jlm66ll505zyc3cg88uvmob4fog4fapowdu4zd0oh9ia0cleb8ehgjsyacnhmgqyalfwq1wixeg857mdk3lrb0vntlk7xxc5u059g8k4e21jy1n9hl1ffp9rovwrvj2qv1sqas8puj4vxywukikyc4itrx46q1byuwwrzf2e1tosq2kbal44ajm6sppwe9rbfv5590c8btrni3tegkgmkdu3d1uskpgujtg4v0k',
                avatar: '7i7937luummo989mqhyk9ldj9f039ob5gb4c349o6n3n7fm53bbm1fkwpln3wrufk07z4jq97yrs177ftaxx2t45mglk8mbfs3qdpmgtmn5xkadx3jys8j4ax06vk9y6sndrn87d0q0hs85kgyxtghciqwk27wcg55iodemiuj8q00mgzqevr2de5e9baj8anrdkzjfw0wkqdwvstitslpf6wfxibx5w23ebv0x41fvu0zq8lgawcnjteo75bz',
                mobile: 'rj8yecny1qkc2f7f4bnqh6l873e9gbgx7uabqb2ozgawkjgr6a173tuh987',
                langId: 'rix6g1ana05xzc8le90lzrm0hpn583vcfesoz',
                username: 'yr983lrqtpuaazx0rk9cu2zjpsisgynixfmeaqcko3r53p4u72mw0nt35pzbty2ci21n2d7u3p3i11ogom565ogpxw9y6hb86m2othoyu1wpuhvasixle4a',
                password: 'mk9g3rkqxx4x9bp4vpsm74l113l0fxki9arl0kdmigeaubbnm3w8qs2ivjx2zw08s6oyxmioh7gbsvwhhtzyx8d2vemdnvjdks82wevuo00ajrthjprb1cve5m34f82z6x2dmu5jed7069ua7h4ws56uehxxununhvcozo9ypqf9dp56e54f6p2xok0fq3x5oli7s0v79gas8nbig35dcfppmhugeswiuva29erqqr7ngaxkkw9me2rqmm0nv0',
                rememberToken: 'v6veqv6bnguqawbb1c8t6b775rfq6wfu61agywbgvi7whknan9tydayu5rll8denyi3lsdb4qs01rvuekcanhtk9tn053gmijj0hpjxo2y50sin6jtpr6w4f9le4wlpkn5is5bfbui2jsq4wgotfjj2tvgw9z6wqc1bna4pyblyccxp7e7isip4tpngikuifnhhly97ob0sx218xppiwrlac4dhfdd4mcpngp9vmmcwtqsitb4o57vasmchr8i',
                data: { "foo" : "bar" },
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
                id: 'c178de20-e85e-48b0-a66d-4beded177fe3',
                accountId: 'a96e44ea-bb69-4b28-92ef-37af133372a0',
                name: 'biuovuj6nn5qigx72eppsq9zz60v2s66h76okkshfeawoqfq8dp7gpqwzsotdethe4la0f0si3v5p4r6e6qes3bxxch599d6o95f4cke5qwmtrs6qzkf9uy8rjvaay6n9hq7k1k7dfnr7j3nap6249ka5f4nvo5odgu49puu1vmatvd03oxce5ky5d4y120h5ibeczczq1altvs8a2056w5cmn7kb5wtjz7vo4zo6j0x6czylgd0gaoli1rnhxun',
                surname: 'p2magaqwwqwyahq3vs1je0jgr3ryxp3h0m65pskw1s1q0dutyktdsoqesa7gimroi3ge9acqp3dhgupgmzqqep8f0lb2a9npl2yzsr4xcxa3lgpuld7k7vslhv79pq8vnhi3sowt5dcjyo9xcmmuixk7k1e3rnh8c0uc9avhbeeva4i817u166zvqnr3jljlxcutoajmqtvxkxpw32ny6u3w2vfu7rjenqv165zbdle64votqktngawtxszj1l',
                avatar: 'nj9cf24czzfxaqejamf4eqj9ziosh82cocj99b0pzmz7ffmqfpigst0h24lovuaygktyn7l24qzx95pq2lm0v6bi6pcr1xxa3kaagjro8ibbzqfc5q7l8342kmraxdhaf0qilitwulmlfypyljkqx7reoi3f7jncsw0ph1d7scf1q70mr8a5elannhdr9ktd06hib8oudus0rklxn430e20cf40iaaq172y8l0ynl6ay85oas80in34sox657d',
                mobile: 'qnfh8si6q077rmyfvdmguejf0zfopsuosupw6ytwlbcarqwvg08gzpqp5by',
                langId: '7c479dcf-5252-4882-bfce-b16a2baf636c',
                username: '3c2diu37abx3ijmjhz77919upextle03ihr0gvtuztkkxkfgoz8ndwizkbufvmso2rt8j39dszs3uq32t6nve8lf8e7srhncld3z8p4a7g8p74nnsdiht8c',
                password: 'w6yshsax5gg8wiyex1zhbethh6f7ihv9v8yhli9zuzl805foide27kbjpigms76ada9ndfjxkd4p9qc1d62otazu2b5ncqn4fataz3m9e603by2dxlru4um94twamg74m7ekaj8qtcbivi3bme8qf6wb0356kncuitqcmh6tguov4rd64wc5e7eg4whtlf06qi3vihhu5uo655xiicii11dpf6m3l9jsz7grh9kbvrsmzp0e43jeit27hcgfky',
                rememberToken: 'zjn6m5ntex6kdvl0eppuv2tj762k7sk26vd7176y6e8rw16x7fy4hkbe3jw1vchc6ibsnji1ah33v704eefkqc2mgwhrsd2gb4nt55g8qz9xh0dlbp1cw5gvrgpj2rqz6ii0td9vz3lbg6o3e1anmpu5dg0abhdbnghyplf06mxr1bus47fk3p5fujbv450vicsb02gwl8oes664r12qmzwj0m7lq3bitrnmed0zgqb7oq70nx8l32714igyry',
                data: { "foo" : "bar" },
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
                id: '24e7fe32-a66a-4603-9a50-3ea05e589f2e',
                accountId: '88d3d0bc-e2b0-49d0-bbda-590450b8f293',
                name: 'Ergonomic Wooden Chips',
                surname: 'b5sf8lyho8o361hx2fdt75ugo2mhchyzzmzdt73byp9a8h28jyyo1cdv7lwp1yg339o4128hw9saapxbrvflbe96csakmuaxnvrjr9jwxe1votcv7torb95kk3wv6a5ex7eztyd955p3dc6tq28lm0537dwghhyz4oz3cemcix1sj2iy4oqmpbfaajn9mujswrpkd0fisntsxed7fu4sdh2o1y35o2dl44tx8a2w5z9j251k0c108iixvppg58di',
                avatar: 'cv60ulvkx6rm2txtf9mjkaqhi7fezcthy9u4k763n26wo2lyxn0ipjieaydevw9tni7lhx26jk6sx0sjhvlzgppb3ruxlm34tmjv9cf0za81qjtk7jaeh38camgpwmr95honip1k4w9ajt6id2oadlirdhsytpvv5ibawhfxoiudq4npnsqle6xsh8geyyqyhea1d4gtpw65777e72yeut2h9vbisl28a084tbrazyq2rpshgm3rixzm2hxigf',
                mobile: '5y5h82z0gr9bq0tuiqikrtxuiectex54v30wwf5vx3d3gib2cpgvh2o3okf',
                langId: '6b44ce6a-800a-45e9-b313-6bb3b11f6f0b',
                username: 'p552y0d3533uoa83cnqod62l6hzc8ljrpdte8lusmj2dsc5dsvs24qvgmw5cxdtoxpp50ja40h6ra7r7rzok0ofqczxcwl8xgeqvc7ijknxjy8t35byxunf',
                password: '84cee8w2iy5igz0dbjbge56a9jfltj8if50zxxutvrmpo21rltk2vypz5rzdbp5p4gxp1wk1llz5izvmuyhc2agwki7c3pss0db5wn3g406tzobu3n8u17xse5vtfnusumnyljm9dqcyopjftinnhe4as6inufqy3y57if8leuz5abxs45hw8zpz1i4xtd2ek5exlr2ll87mdmmzy81j1wgf4sucq0w99im6whk67la0fp2otx8db7viljc9fg',
                rememberToken: 'd7or8vs1mu4bu7aodl48nq4t3vip5f9vm7ebj8fkwgzq5qrrwrlzv1y7vuf4ltbiem4odsommgt5hg55mcbfxs4j0yky45tb5hufdqtcdik9wq4s1c3f1fj05oo43huxq5z2hxet0l8wfmvwr9wn51884djdbi1ltacnkw26abcn9ql0zuuo38ndp774ewbykpt5pjx34simp6ehtfykjf7lbldi5005yxwk8fes10ef52xanrvzr9myqwnxwn',
                data: { "foo" : "bar" },
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
                id: 'bc0e5001-64f9-4596-86ce-8eb055cf7d3f',
                accountId: '2dfc9d89-189c-4edf-b7b8-8973d413fffc',
                name: 'Handcrafted Steel Mouse',
                surname: 'e3ekmi7tamup4r3ikod8ur1obvlzbgz2r4im4wll86w6sv4hy0d66ut53r16qkkb3s60vb207ycw8d8u34tq5eybp6ctan77vu4000udrr1amodtyuxxfwb9mzbdrjytyple9mbzcinwhk3j9mudzws2uv58h41ito1w1rh6gf45xkgymrs7t837f8xodic84e92ul3fani2msf8tbf2a8ds1nba33lxl78xv7pmr9ltsndhkivfu3mnxlzztc',
                avatar: 'seiumc3aei6379vkwg70m6w5cn9sf80fi65ko9nctx066gqhlxhli1ioz0ggxofm6itt5f97ck5dd09zspxgpnx7b2pjeow3ath370wmdvsxtun1y7rcf91c0u8duqa10od9l1pe1cu240994vwy16mj8p74heuc6qs2wfneasdh14wqsu6m6wwoxszztmddbew4d2j523y8h1xbbp2u6m76igudpk321cmcy891n4io1ghkshfknik2p7o6p5qw',
                mobile: '324vu109nixa20nznlkmdw8lwdlk2bfn1syt1qjlckfbo7ift6wdbskv4m5',
                langId: '8dac8ca6-ee8e-463a-a80c-340b138add1e',
                username: 'actbfqwnvk3wkg8p66hycdn1wj8qmm7wwy768f19lb5cgabvnvonha73vpw3m6v8y5vf2ej6gib4yumxi797avp0eiw2ue8tr506arxg4fq2hf3wx6q0dhu',
                password: '2kbdnkpunnz3izsmakkfajn4qpyikhcdqz1ont1ct9tokcb6igfebgto9jmlk71rl7qp1qjmlomz6fr7fh0k4i1xvh7dq7dsikh1q6ke0xhy7xpp2echdq9ijz4c868nt0zfyxdrxuqh89vcj82cuepvdbsmbmt5p6lpas0jyvqj5jpruae3gxnmc1v2eakv0wtgaxviijmlwusuj5pqfyt61mi6ck00x3keno34awyftbora7wtbr9vc0fp87',
                rememberToken: 'ke64fdoofjs4gsrgdlifbyzuqq3cwlbwqlx3j3n0mhb81bma4ul7wyk0wcoc03lxabl3grmwzn7t9aijouqcpbjw8ec8x1m3xtezkqocm2kd5rz4pc8wnlx04yzkvdjdrcxxlfmligqmlufwfe5gtxu9dzj9gboxf6cb8khxlt8m52twe8hodbcr8bc1svithz5nmdgx8wvagipt3ytbr9p8sdvapuyqnje0wi1a6gf2p6fa8sbdbcnyg085a5',
                data: { "foo" : "bar" },
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
                id: '1e1c77aa-6d3f-4269-be40-7003b1ffdfda',
                accountId: '0e9d26c6-fc78-4723-98f3-18570d234735',
                name: 'Sleek Rubber Bacon',
                surname: 'hpdd63f4qoafcjm9yrwqo6mg77fo6wmsa9luzh47fjcbd57gqhg7q6mcrrfnkkxfkzjjorssa9836prq06zt6vipt2nnsshoidlbofkvuewpuq7y86ghx10oxinotiakb04y9531pjy6qzycjzm7iwyo0oof6ywl59fdq51clws9wepbdkalk6pp8epl161jzqczsoi7prxwc3giwws8atfgwd3ma9klr8n7apwdons3zlwvmcm8zupu0dvsj3',
                avatar: 'i5dd5sggg7m6gpfpmzi0abyf5oppydh8ceobnucmq2hic1fu7pwrj1pge26huz3h01ck978qcwy1chhlljgjeukaz6ow3850l3yt9brg0a77hjdnbssg2ntg0pi3kilkem9k66kn0b4v5w3hmnsj7z5xszwooyde3vukxx91xb9jrllyd0djyyyvny7gbny5gzpfbx1b7jhfu3gzrevif5fk60g513iairehurfk0xk0mhsat907ey1t4vra2n',
                mobile: 'l06t0oq47qe5bzm2fufhwj4o2ba2h86fyglwe7sokl139wr8vgy6qgv3zlqii',
                langId: '6be871cd-bdfa-450a-a5e4-8b0f9c932b7e',
                username: '659x0xxnfmli5h16ku9s823pkx0a4dzodblysa3dnyin7p9ub01uu2z0gdwemo5kyywuousole7ezd6p4buslkh7wctb1hzofycavunn00ow2vcx3q6l29w',
                password: 'x08ky5o60opqr2gbikdpti7ktb1aq274vq042l8os4zdhb4ubz5aluqgthezkz2odn2ac6l15qwcrxpjo9068ka1129u6isy1poc52uyk4n5vrs7aul2yqdoplqpdmyj8iclqajjsyx3dptzpgji0oqskrzcm0d2pwpdrxxzdz5xo7hnr73btifuxrq6bwbgjklnhxapijenjhljwph46zmxz34smxdruqo6gyhw5m9wmv8wvaos630m9pyda8',
                rememberToken: 'dfklzkeno11nbz04qln4rn0kr9mvff3r763imw2tu0dl7k169voofsdxv33q33du3wzsqfi1h0p80f9mfeist82ojbtcol673tffx9z2usmeoiej27v4n5ej1hrshb50s9mt57ktst5hhcw0rykvxb041jibcarkz0q1552c9y4xr9evn4mk8l85qh5rayjopj7hpd92ora43t7lz3w50c1pfgefmbb17paohhwzv2p3sk0p12t8bh4xs5odcr',
                data: { "foo" : "bar" },
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
                id: '7b78796d-1696-42be-a9f2-03e450a9f767',
                accountId: 'f23e44fa-e721-448e-bafc-72e3ba139ffa',
                name: 'Generic Frozen Chair',
                surname: 'osom3akdyx5r4u4cfx8je3m67va4sao9333qh59im7bp4ssmhs0fkgv7lyw7g2ir0prejzbmlnux9hq4ms7czi2jq7342iybu389bhaqp0u5h4x61pf9e5c8pqfi3wwobjmfnekmdiu1rknqte6dgdm6rtfxad53dlkq1foumddjesf6n5muvtxbm9sxnpy4k7d6r4we2h9illy11wgg1h8moxwmuigc6w2579e0t4p2o5c6xny6xhifml9xww',
                avatar: 'u305vrcomz0kq4p62uvaajp09i89wnzi5b8ucw8b0szwlabvxt8kst6hreaiv4l97vuju4uwa3x8m0rkayis25cd4iorgxgv4opnh2coquz96mrhttbqhdwetmva2my6db2f94g9bqxbhwa5id9h8qho1ca6a4vlvuvlh581s1k527877rvx47v9wgggob5of09wj22wouhk48ur8rzn9irn14gnqnqinb6mus4mwvezxqa4yu33zcton3pnso',
                mobile: 'e7nj0pyb4yfi9bf72bsmwmm4k3w3v6sfr912mrxipqxhk31ljeog6cev9bp',
                langId: '93233a64-d5de-4511-b83e-079b6c8823d9',
                username: '1joan8jhikfrht8uf5f2yo9jxg8a7e3aslyul4i6dzth2zte6rc05g54e8zgo2etj5ihhd97zzhb53nlcb89uizkfzqg3wvfmy7kzql3id6z4bbbv4y10rdhj',
                password: 'm9vccoajryxt3pn9dcfml25rqelapjyxoynbzbrmqm3ngcz0dzelpl79gp6rqa9me44k3s4bh2q7djn5qfk9j2auhs3c3iw9mzlsihgdnyfy0k68ib8uiow82sjyrw5yd83uhov40lvtdp8px90jcc46sfrv3rsnq2m5b5pfgdnjkaxr87468v8oi38jfld0373b5fatizbfrtodzveax20afwln0z6towb5quxlbbspmj508nu7z4kfozjcai',
                rememberToken: 'vouaernw874pez2xyjwzu09ps4nfsysnz8mthpyu10o1bw8lpsm4vrwa5isfxkf7iw3dmwdxmujqweumjyczax6hdojdp3i2wjon8rme2pbckvs357tfkykr89rjxjkokr7pll6qafl1u6p06h6p3vz46p943sbd26k4xsyf5kylpm0f2ym71fcesbcxb88xahfwj9mlqujy3vpyufkt0bvoecn0s84lliqmsv6pwd0c0qw100wihl8hnxndof',
                data: { "foo" : "bar" },
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
                id: '3c1e45e2-235c-47e4-bcad-262678a2f972',
                accountId: '5f9ab598-b651-4ab9-87d1-7e8983f70455',
                name: 'Licensed Soft Table',
                surname: 'z1pc0i9vbw9rqgzscj4xyt38wz2g1a3biasbz9rtw8o4xaq4zrwkogd0vzankf9cibsrqisohdoytzi5gwh0s5q7cyxjwg8zwz3jubspshezfivvpi7b44q0j4lncnaqh2oaudxi1u1pit0ekag488z1u3bwdh6hthh1dlifl452995w3gwx9fnckuhxyaomolhf5viegsvky7euyv4xiqy538g9992dkhtj2k43rjf2psytcnhwmh7ba3u85o',
                avatar: 'uv9vd1jaurhssmw2evf5oi1bkw26eid27ccbuqlvl5jttzlhynjtcwhia68ud5zn4crd6u287xq4d9m9on3knh65a792qtylqt5at9n4f2u6qbg7boz2suo1grp6z65646t4q9xhn2a6urhcfbtvlp4jzgd6fe2z8gsxweb0dop79a7107gduqia05kw5j85xkftm5ir1lpxjb5e43p0nku0ng5ax9yiuz4gyhvya31s0eed571ujyltrl4su3',
                mobile: 'lg518rxnbx4qyowlvq24codf6np1wz82xqhn7s748rdzkb9gtpwk8sskd5f',
                langId: 'ba7c0c32-f747-4525-b93b-387c0849fa22',
                username: 'vkfah2tyag24gds4qden4sd887jv5clr61g9jcc51te1uy2v9fyt7uhsmwmmlaiy9v03cisw2vsd0mqq3jztufzafj49t359nldxyigmtufnskkynxv102p',
                password: 'bepi63us16cm8krv1x78tbbh6pw2s5fgznqyrmklzgnu675ofoqoku19xk6eagcp8y56xgsksap6us48cjuzgj32qiwmce015w7oc8ae0zp3pcp494q62gi5atqt0gk2e8gyq81bvs9edcovf9huh2bdcw6cy8u8pqqt2tj0no9jythcztd65ugzinaq2bp7ifuhnwqjxj4r3dxl24fci1tnjwqegd0gtw5um79dvdsxn2elkhiuji3bac3v1szu',
                rememberToken: '16uesmt7fu8d6ne1ccbtfxek670ekhz850xy9oc735b6i562ituw4ib1ujhz2b5ysjybsb1fkgk5cn21m2kg9le1bwpqu95o0qr4kdtgonddymux0eqcvs109yfmg1pgagv0pclak4xnwrq1et251fh39mhxhv163bu2gkb9zrswjm7u9x5spqczob9ge4wi344x28pedttvhsvk2ksyp761v1sn9mtco2kmdg80ock0f1j0rjkcemr948u5sw',
                data: { "foo" : "bar" },
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
                id: '160e2206-1413-48f8-8d35-a06d879176e1',
                accountId: '581aba1f-15be-47ab-a112-1bab54f33618',
                name: 'Awesome Cotton Gloves',
                surname: 'akmd87wpxbtw47cq4ejjxz31cyvl5za6kr9pk0xswl1jd4igvs1u8mqzs9b8zs65xm53rxfs5p9f3mrj4lz2i81p9im3hscr2ckpl3yslq46eyys9q7rr4dktrd2b2cb2f1vnnbkoopv7hhktr5l4neoyaiyhzwoowg1vtlvbdk5klk134vgwhnnkx683wqdue81shkpm04ae2f76h5nr29je7jg3869ifdlufzfti1zyd7t8cb4gpdttkczow',
                avatar: 'c2zhtzrxrtdhuowvdptkdnf41eno7ssts7v0gnih0sun4h3ux64u1m3dpm53cvmfvmo5dm0vgyb3o52kohaycc2e6dnvkn1wb7tyl9pyc129sg1j3ez1pllv9ug4inya17vrsu9z7c3io66qzrz4b6wzgu7iv44g6vbicnxmtxn67h8vyjgiag58ktdpbkv0x93h4qv8rhy899qafdnkx1gvclcuebh3ojanreo6o74vn1xush8cysk0j8f3xh',
                mobile: '7oyuxludy5re928h0jutwws3azm6wldbgv2i0s249ebn7gb6f6z28wji8ki',
                langId: '96bbcad9-4305-40e8-a34e-49fe28878da7',
                username: 'lsxhb3ovuclouv2tq9y2umaoiho1goew14ptn3fg705xdzqdecma637xub36oljeyxykgwmggsf3pl84pj9n4cbi4d02ccc1c8jdwkj8o8erqle21ezii9s',
                password: 'knya6pwfwy986z0hdttt2axb3ccr4s1ja5rmfg3hkpoh19h1f2rz75gkrdwolydrnlrvk8mlrcekalw1faxcyeua37wbmqkxhgs6714hq40q7w2o2iedqbf3b5yhv0p6pn627l4izjjxsmpg4h0kaqsii7o51xsq04ybwf89zi87nt2oluiqbl9jezisery255wvjva0bcx1m3tax2bsu318o0k6vzg0p8sfv8gloqclabbsdhw1zajm5jgq7p',
                rememberToken: 'faamszcztfeboba3yg8jhhyp7jsjjyzyia210nschwgh52zzgetw0y38ubpuc0mod2mzi48a1mqpiqmxcsej1vwzacwnzjjfa5ngfhoq006nzqqm432g3l54lap6wog11fxrqmy658wbap9gagdxodcmmrk7267xw89g2wjui4wusof5rkbe3zqutw26dtv0t1ai3h83j8hl384xawu5kjji1o6ut7t9nodbmofktltbai2ebn2h46rktoang8dt',
                data: { "foo" : "bar" },
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
            .send(seeder.collectionResponse[0])
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
                        id: '6e732744-3f3f-4156-871e-e4581853896d',
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
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                accountId: '2ca44920-f71e-4dff-8721-1fd5b7e6ab3b',
                name: 'Intelligent Plastic Shoes',
                surname: 'mkjcfh9tpjxdtrpxjvdvv23sbuyuf15t7ns723pjg4u44ox768iz987vvqulgeee3iwayx1s90kkhgki859ab7eh0ppff13bwhb69o8z4yjizv5e6ogr2avqwjyt1mz0o0x2qtbh574c79kooyj0brfnsxvnk2b7we6wweae5m7r66mse0p9uj8272sgqe73ah4hq87p4t11sqoq4lps52zauuyvaqehhh2au2cvehch3nq6b2b6ez549rr9k4',
                avatar: 'f89s59kyznpbvu1uj0f4o93km9ph7dqcti9e2gqbxkdpfgy0rlt478z9imeftwwmr0k2fnd0etko1ubx4618pqnxr4hq23ae4a0uze4r2acwk8v9rsarurtqwmtmwqyh98afbveewlhnraxj27bamc14ma14yin4fvded54htbmz35k21copdd0t2pt1s5vfkue5j10uqgfmwk7iqee3zd8tyf1kefow9192lhduqotjfo4x8aomgosft6q4ib',
                mobile: 'cj3esplehcisigxa8luoa24n73311duay5s322g76fr6mtc0a20yb6j9rpe',
                langId: 'd9eb6e6e-bf1f-4743-942a-c133cb0baec1',
                username: 'fkzglyomixl7omj1jkfjfagaym878mjkf3nb4yts94z25nxia2yrd5vpaxon8a59u6u2qh2yrqx108ymoppkimep8ugrobxrsz1wnhdoek6fy2f73ezlfxz',
                password: 'cmkxti2h6wwl7bapygnsapwxb4nq8gvt55gq1lcp7ygqsqa0qk67pmauxm2qa2kgwlfnefgelzpsrvedfnucjml72hk52pu1wo88zhw0s9pwm5jcukj8rsxcwbxdw9kh8aeobjcc0zp055t8rv0kx3gw71ezyi1vgntl8zzjssdsnsgd4gvw2iejv3a35qjuo3juau9makbxxj118fhtu9xzkh4iqpqn3792gwtuu845ne1x9dtd8xkzqfl9l7',
                rememberToken: '072si57sm1tqj6pmkiu43itggxady03dopk85lmtq75pr2vleynfeiuzcespqihopxigd3ndf01w0k3jqq2i4noo20wj038t9ef0ng24nxmnvflpxqtc5j4d0fihyy06ka1f0a9wxq77cs5et8nkmbvujy6qyx7ryhxbxgmj19jmxx3pvhv5senhoma6g2qemfin1uhlrtkf1qxcxy88917z7qr4cnfcm11ykr62zbgofsgshry1k6hv5hgocc',
                data: { "foo" : "bar" },
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
            .get('/iam/user/find/254ee1a8-7b6f-439e-badb-5dbb626b9511')
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
                id: '1c549768-f6fb-4aba-aeb1-a16907d877c6',
                accountId: '7fc91180-6c43-4ee8-bea8-505d1ae56ff6',
                name: 'Incredible Concrete Keyboard',
                surname: 'qqecji7orolsprtgfnnjhen1buiqi0qsqc96c9s1beix6tgbs3q55mnhdbulu1dw5uup3ebwdvt2use97a04bfnbap7w4jgqyk5mohfn9f8irdllmorhjs2appop1vg172hcb05zed2p82os0cvvjizazwrfaunmar8gkx4gs90nyjoa49x0a02392ml2fgu0polpnmpbmf4o3z930oddokcjhxgnwem33eb9q8vp9wfnc82q52k8qwupre9rb',
                avatar: 'ufbfm019pvtd2rnzhp0yn1dl7au1ukv19bermuycpwroay1edgxqj5527kwgrvurt2ma3r3c7cnwxq5r9l5w1loujialjivm6z5k3x1u0k2skkfep1btokymjbuwpkha3dncbnq6ii1yqp9wfjmfc16zbscr4f01y8kw4svzpdvsb5qmx5sdbzj4zby9i53v8ktiwsgkgovgr4dofs24zwj6n92999wo8vli8y5iexy9qddji4wsjjyo5oumld',
                mobile: 'r1n9m2xqlvrg8abarikt9tudoz3f24pcxt5nw32m19z2b6pgdbz5x9fkvy2',
                langId: '2ffd4f39-74ac-4ec7-a2b7-49904da60193',
                username: 'w7x2f2985g6vggulsppxl7j7p2e1rjrv1a1xsvc5fxje9t29etuxidado49v03h51yubawviljx89spioi91te3urozf5jryyk3358xin69l2t6gi5uozot',
                password: 'to5rxbhppyyyxmt89nykmephdx924cori5wzx58e001s2u9qibovjjg8qf96xhypch84tbz9xjc7u3mpun7bjmo1ychh0hs412ooe1udjqyx7533ncuhzcemgjt2arxut2l8o3jw0u7b3v8zb3ts7kloy2co271rrk4xk9t843p0coolv7l0drqintp7yqn2vbbcsuotfzyk924ykflgzlm3uva7hl4sicralw1u6jz5fc0tj7q0yhxm95kgrj',
                rememberToken: 'oe1kfiwuttvgpuitn365bobs6flp2z2msx65jol8mvw1tmcpwtgkaf2p28dcs02tnp6fmewr780qioiym11pvgk3ans09ifjvohdwjk9q4a44faqcflcoc6xdvx0ak5i42xgd4436brcn9oynemc01ane0t169enlwdnpbnmy3997nzhkppi0r625sgefzafnas0yzh7cxdyv1p7m1evdypv58jtkil9dfxbphrb5ljm5ockljpx3079axtmbs',
                data: { "foo" : "bar" },
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
                name: 'Handcrafted Soft Gloves',
                surname: 'i7yiu8js8mgy946c8e33amtusnftfp7lonx3ihkfd0mrmab2j5p687vz7l2g72dk8wejpwj9fod5azeomh0a5pd3z05unwykwrwes7nqav49xnfaglg9vi5f7xfyl8h0jtqhgqgmhyo4hb0luza8u778a3kp8bbq19jc1vu2g0q8xandl4f39qyfql1bmcx4stpvqn9q0ydlt4njj3tpsq755u15hje561k5hcir5ieqomc122pwnrd0wdwdll',
                avatar: 'olwafjuc72pkznk13cavg9ik3p9njc7kx2dolj4wwgezbsjtsnmvg4h5w7g83jw1iiti14lzxuz0ppaswww2e8vh0v2seq44iuqwih8gedib6miab21g0d3xrxp9r7wc7fmxcneo90xhdxauavdk1os6ogabwrfik19toae51k6zbekhzp9o3nhl0fjytb14ruobkf1s06lobizfrzi40ktm1zwd0bhoef4z3vieie41vevl8466qrr9r0qh0m',
                mobile: 'qxkmgyo2avy779i44cbapy5noo778fi2npsr8zl754amsxdickodz3qoik0',
                langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                username: 'x4o7cqpp3tpfcq6pyhwcqyuyecbobgk119jbgm93mju3zbwqwly0vgu6wsab1xih202hkfi49l5rad60t61e1oeozqewz65ng2h4a8g41t9lkmfw028q937',
                password: '59020gj8onl0abq7chbafe301of1nvwwfk0wvotbivdks9hw0jv9h7izko76jjho56a0uoska969yzeh56nuok12a10jtqirqix0x7lp0rve454jqcx49f0ebvf7movorjm32ljdhstizovce4336pg0zam3zq7hvaoqt7s28b7l8hqtsdv4ynruhb3uxp8j7tsurph5p6loh99pdv353jsi91p659z0u8yh0wpes0idwvydrzvlh9n4hds4yk',
                rememberToken: 'd1q0su9e8bko5wditmdfsw4xk2n16iswnq2mi0cp0xkdnvlv5j1fzrhtpgilqatot6d6kuwrlmlu2dgj0qb2oynt0fn4b9xh3gszwx9zsnl947duwwsjzqkjka0osvh5j65yuw6nni66c92kycxi7do5voanb9hra9k68m73bps60c1fvdz7q2rregcsh5wej0xejvt4xpljs6nf63me5z8tge1ix5n003ov7eqeed0i5gh7oi0sthyhtpovc2',
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
            .delete('/iam/user/delete/29e2b95e-742e-4652-b533-5a1862529e6d')
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
                        name: 'Handcrafted Soft Gloves',
                        surname: '37duxpfc2osy469m4qk547trae3kjqgs82bxlh6zb9s30331z6tgc1q4xifbmv66vq8rmmtqshx38rpb1paou0s4asvmms0yrurzq13e3se5g7gvsx5iabc67tsv3ty1rfjdp9uj6deh3f46utm4iw31p6inwyh90z5oz57h1hge44jhldkuyxoqftx8eu0chc88t4kzgz0q8n9sd9cw65ozw6qhrcts0eyo0koht19y2lrnw4pn1anptzqu8s',
                        avatar: '646aso5v3a5ipgtbk83i9cl44xwxjmh1ec2zv4fxaqrap0t221e7h8l2arl2inkcyygj3pjuwal66shwj37n2tujkqzic5pih4e1y0vjl26qn0eqw1o7xbef0kvyv5a3b0hxm7dq1iojwf4iu8lsmx9ayd191pqkibkax8vhrlv0qo5pwknshh2raltck73mog00qffpil0b7fxjmuogkcgd66xbl4x686nfugjcz4z4dxs0iejwczkhpwq18f',
                        mobile: 'qvl62bcsphxgdlym84sne2qi4op8etiptvddc27g2znkxwmnanvyhmq7sbf',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: '0mzwpk9ibffjcv42oeppzdlm1pqfqa7yvbxohdq978e69mkqfgwgg7vkmnflj4764x5daehktwitwm9yz8u965c9982mzn7i10v0qaxwd0mvwpmrvdwxdwk',
                        password: '1lo5reapk4dtl07g0ymf8b765tfow9bopzvxtoj7l5b9lb9o26rj3q6bh0zhbivxgvd3fwn75upno2m6nn6rpl3xo06wiatp9bvr33s66wgqrhtyny9lnvljzpv65ndywpu9qn72c7o8wzy1xlpk94re1axkr8cc2slxrfwvfdr3hsn6hd8d8gljfdebed7jhfrl0ijp56662o5nm7ttji1is31zvl1pcd62bff6x5da165n1dye6v5r4q2n72',
                        rememberToken: 'm7npsjo3c60qfqc62pf0c4vt2joj1qk60f4uf70hez6ltjtkkx0grk34c08wqot1n57kaoja4k7whafnbswrtdgybbve1vv3h7lq6k8cmvjc008o66ppwx5ca40cw5l1wyfkzxyjzumywz6dlen9hsjqpvt6v9ecndfetukyo2xq1nnujlq3ie0fd3b584zpiupufs4k5mq8ous6wa7h6qcwhc6dea47ezxcndt1n7ph6dgpmiz1b7c3defvxb',
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
                            id: 'f36935a5-e67f-4949-99fa-66d47fd6fb10',
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
                    id: 'ce8dfdef-024d-448e-a161-80adb23f7115',
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
                        id: 'bd611fc9-d54e-4776-aaec-318434fbdd84',
                        accountId: '2999f299-ea3f-465c-8e74-404991fb4c6b',
                        name: 'Refined Rubber Pants',
                        surname: 'qu7avx0cxqh2j09iat66l2ujyi7taljf44gkb1sujqf7hn7no85mzqpcuiqqtqo3sthal80xjp6qfu82z9isojexy4paylxcd06occl5gupobe1maaqagvozmp5zbm3me6nchsruva4kaz0ac8m86s2fjwg9oy1kq5ba28l178mbt3r4lefuuef528xssc8bb08myvv3h4tchhlhezqwqtgu92d8eb5nfvl2r31qrz6ztsphxnv3jyuw6n7py1',
                        avatar: '6g0brpe49s2sygpgixkx7u561qtz6vyqrx0ux397glo4fyowiv1dcen2o9pdiojv0hhqls4my16q51mzswzjti8fqn4bh0oohsvo2ngtobyvsaa4by9iji2mggh0ry337ao7k6nww7f1q8rgqrv85ue093jxjignjgz75m46rozhq8bw02v8t7oqz5qd5ic9qp27gcfnneytccqfdx68vv7lgmw5xrytwt6kad47pfgjxobkjlmoxu67fn8ydr',
                        mobile: 'vnboynap6tbb4niyzlkaq0pbxlhsh5x31axgwyeaob5tjrkd7ru60dcjtca',
                        langId: 'd1756c75-ebe7-41b2-a540-e11e6f443757',
                        username: 'u5mkuuks7kwnq6epzadh796h8b2e4kze0refdjvknbj1f5gquybdxut8f6hyqh3rqxntks1kevwjj9ukuk198eajz72n9i04mm0apaifvl8l3j47nwz0t4x',
                        password: 'k9ns4wftgc5842o0ccbocw23mx6zkzbqt9xx8u401qpd3t6hkql953ku1nbfj0pkbg8paaar5uxfhlx98ff3h31gbg8bv2i7okpqthg3jzbzk91vvx7li5vl7eaan8tk7ra6i0gj7lzfg1qrdb64mzbvwq0zp7cechcvkhax6viedo1mndued2jqbvd0ngjwobczini9t8s1im2ro8vqag4dsrw0kszovti8do154m4zs6q4ngtz4dz9ql7kso',
                        rememberToken: 'rejh8ahw58r6dt8f0xef3t7hhiiu7vba5565is8w7kevfhdc6tbmbcqr5tq3wpywjo8zugsnq12viapljg6meho6vtp43vledkmz2snakft01fyqihyfemv2gviitzyk5z1vgqkr5gja83mchkp38tvxy16q55jo1t4wqwaizjdcpuextbjiwxl0bjq248e19uyq9uawv74dje3oxfgfhmjfvqop43kkqadwryum32s8fp2g6zkvg794esol5r',
                        data: { "foo" : "bar" },
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
                        name: 'Handmade Plastic Fish',
                        surname: 'q9wbjjrm155lbos15gaeh7hxr8mjt7ewpoly9zjae25p6c2lw9b8g6zqlbh3sayhwemm52z9gfpor1hve3mbsrd4ad68uhjc6r99cpqvh1hnw1qv49g31fsboeulop93vmob1tfe8m6vj2vrwa169b8akezf4oyu7b89zltfj04z7buqmuf03le82ga1w50tahn6tca5g4dy6qa7l89igt7c4ppnsehjmuh3ne09zodgoc0zwvuenv8shk63vg',
                        avatar: 'f36yxbbnysbtxcssx0qbpxtox8r4q9wfu9cyilae0ti0qew2gevfrby63wjiez7zpatx48txnmfdeicjxiiw8kwb90hfdxhx5mmt09428i7ipthm6k0xakbr3cl3qg5q5kw7avqzydvtqe2mcxof7n1efr84g52lc8h2n6g7unfreku3wevmwyt7932v0lmplib6j5lxwf08hs4k7hcur4vw0avkgwebqhl534qi9t09o023iwk6b2ebovqiej',
                        mobile: '8r2ksw3p4fgozxelecd8xymmp45gwb5gncfctskhkd1pxscjvmvkld2lag5',
                        langId: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        username: 'xm2x18bn3bwc12j9c7wc7dscrpe8ezgl79q321y6vb9dfz5g8ika0aeqo2lmp0ocv7q15gnx65fo1fmgyozj40czhp342npjvkq91wcvr1v7zv25sca7bcj',
                        password: '4mk7rxsvs618mcid4ey2lebieqn2ya6ywl0r36v8evcrmme0p7ha0ksd4vsw8rpvmsc1h1ycaoexpejk0dsyw0au34ze78b8mv0am9q4ipl6m4cr9qns98nx90mw6zwr6m5e5vd54fhq4xiuaeh9uynwd0gspmj125fmq8nwfeznpb6sscnzxdtnvca8t8ir29ffo832qpyh19h0az3pkpdcgha9o711hav1i6a6e0z625zrns419qx7zcfwob',
                        rememberToken: 'iaqa696kq8nal5wx5cumtrmfmmtu621m5h9vnmk9gtu719ewo03sweouwjy3tmvidydmkw98rkqwqacjao4v6qh5o715odgklke77xpsuh3zlaekg5m7qlbkmqxmf2zh6pk6g9140m1obvbii6utylrjn4hv133g2ckl75uz1xh1bbkxy9aa90rbg9fkx9j0l2mu1ised3rk2tuzmri4yvrtzinghxlz62tqc11xbj3qhgyayfcy5lyqrbuzza',
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
                    id: '561a8a88-54e6-4ebf-9468-39db44c96e96',
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
        await app.close();
    });
});