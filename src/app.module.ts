import * as fs from 'fs';
import { Module } from '@nestjs/common';
import { CoreModule } from './@aurora/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IamModule } from './@api/iam/iam.module';

@Module({
    imports: [
        CoreModule,
        IamModule.forRoot({
            privateKey : fs.readFileSync('src/oauth-private.key', 'utf8'),
            publicKey  : fs.readFileSync('src/oauth-public.key', 'utf8'),
            signOptions: {
                algorithm: 'RS256',
            },
        }),
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
