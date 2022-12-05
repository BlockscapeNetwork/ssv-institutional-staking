import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Keystore } from './keystore/keystore.entity';

@Module({
  imports: [
    Keystore,
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
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
