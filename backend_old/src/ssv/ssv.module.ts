import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keystore } from 'src/keystore/keystore.entity';
import { KeystoreService } from 'src/keystore/keystore.service';
import { SsvController } from './ssv.controller';
import { SsvService } from './ssv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Keystore])],
  providers: [SsvService, KeystoreService],
  controllers: [SsvController],
})
export class SsvModule {}
