import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeystoreModule } from './keystore/keystore.module';
import { SsvModule } from './ssv/ssv.module';

@Module({
  imports: [
    KeystoreModule,
    SsvModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      // uncomment next line for local tests
       host: 'localhost',
      //host: 'institutional-staking-backend-mariadb',
      port: 3306,
      username: 'root',
      password: 'keystore',
      database: 'keystore',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // disable synchronize: true in production
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
