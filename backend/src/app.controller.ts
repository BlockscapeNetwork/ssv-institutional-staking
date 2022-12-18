import { Controller, Get, Param, Post } from '@nestjs/common';
import { ethers } from 'ethers';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
