import { Module } from '@nestjs/common';
import { KeystoreController } from './keystore.controller';
import { KeystoreService } from './keystore.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keystore } from './keystore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Keystore])],
  providers: [KeystoreService],
  controllers: [KeystoreController],
})
export class KeystoreModule {}
