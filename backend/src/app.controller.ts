import { Controller, Get, Param, Post } from '@nestjs/common';
import { ethers } from 'ethers';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('last-block')
  getLastBlock(): Promise<ethers.providers.Block> {
    return this.appService.getBlock();
  }

  @Get('block/:hash')
  getBlock(@Param('hash') hash: string): Promise<ethers.providers.Block> {
    return this.appService.getBlock(hash);
  }

  // @Get('key-store')
  // getKeyStore(): Promise<string> {
  //   return this.appService.getKeyStore();
  // }

  @Get('key-threshold')
  getKeyThreshold(): Promise<any> {
    return this.appService.getKeyThreshold();
  }

  @Get('key-shares')
  getKeyShares(): Promise<any> {
    return this.appService.getKeyShares();
  }

  @Get('payload-register-validator')
  getPayloadRegisterValidator(): Promise<any> {
    return this.appService.getPayloadRegisterValidator();
  }

  @Get('payload-register-validator-cli-pre-generated')
  getPayloadRegisterValidatorCliPreGenerated(): Promise<any> {
    return this.appService.getPayloadRegisterValidatorFromCliSplit();
  }

  @Get('network-fee-ssv')
  getNetworkFeeSSV(): Promise<any> {
    return this.appService.getNetworkFeeSSV();
  }

  @Post('register-validator')
  registerValidator(): Promise<any> {
    return this.appService.registerValidatorSSV();
  }
}
