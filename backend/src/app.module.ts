import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeystoreModule } from './keystore/keystore.module';

@Module({
  imports: [
    KeystoreModule,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      // uncomment next line for local tests
      host: 'localhost',
      // host: 'institutional-staking-backend-database',
      port: 3306,
      username: 'keystore',
      password: 'keystore',
      database: 'keystore',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // disable synchronize: true in production
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
