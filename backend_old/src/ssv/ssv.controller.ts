import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SsvService } from './ssv.service';

@ApiTags('ssv')
@Controller('api/v1/ssv')
export class SsvController {
  constructor(private ssvService: SsvService) {}

  @Get('payload-register-validator')
  getPayloadForRegisterValidator(): Promise<any> {
    return this.ssvService.getPayloadForRegisterValidator();
  }

  @Get('payload-rest')
  getPayload(): Promise<any> {
    return this.ssvService.getPayload();
  }

  @Post('register-institutional-validator')
  registerValidator(): Promise<any> {
    return this.ssvService.registerValidatorSSV();
  }
  // @Get('ssv-env')
  // getEnvs(): any {
  //   return { pk: process.env.PRIVATE_KEY, apiKey: process.env.API_KEY };
  // }
}
