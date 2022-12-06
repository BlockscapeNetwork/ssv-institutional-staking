import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
} from '@nestjs/common';
import { Keystore } from './keystore.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { KeystoreService } from './keystore.service';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiTags('Keystore')
@Controller('api/v1/keystore')
export class KeystoreController {
  constructor(private keystoreService: KeystoreService) {}

  @Get()
  async getKeystores(): Promise<Keystore[]> {
    try {
      return await this.keystoreService.getKeystores();
    } catch (e) {
      throw new HttpException('Cannot fetch keystores! ' + e, 404);
    }
  }

  @Get(':keystoreID')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Keystore,
  })
  async getKeystoreById(@Param('keystoreID') keystoreID): Promise<Keystore> {
    try {
      return await this.keystoreService.getKeystoreById(keystoreID);
    } catch (e) {
      throw new HttpException('Keystore does not exist! ' + e, 404);
    }
  }

  @Post()
  async createKeystore(@Body() keystore: Keystore): Promise<Keystore> {
    try {
      return await this.keystoreService.addKeystore(keystore);
    } catch (e) {
      throw new HttpException('KeystoreID already in use! ' + e, 404);
    }
  }

  @Delete(':keystoreID')
  async deleteKeystore(@Param('keystoreID') keystoreID): Promise<DeleteResult> {
    try {
      return await this.keystoreService.deleteKeystore(keystoreID);
    } catch (e) {
      throw new HttpException('Cannot delete Keystore! ' + e, 404);
    }
  }

  @Put(':keystoreID')
  async updateKeystore(
    @Param('keystoreID') keystoreID,
    @Body() keystore: Keystore,
  ): Promise<UpdateResult> {
    try {
      return await this.keystoreService.updateKeystore(keystoreID, keystore);
    } catch (e) {
      throw new HttpException('Cannot change Keystore entry! ' + e, 404);
    }
  }
}
