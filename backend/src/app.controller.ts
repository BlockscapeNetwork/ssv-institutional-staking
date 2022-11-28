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

  @Get('keystore')
  getKeyStore(): Promise<string> {
    return this.appService.getKeyStore();
  }

  @Post('register-validator')
  registerValidator(): Promise<boolean> {
    return this.appService.registerValidatorSSV();
  }
}
