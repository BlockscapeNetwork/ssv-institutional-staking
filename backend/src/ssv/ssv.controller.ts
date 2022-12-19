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

  @Post('register-validator')
  registerValidator(): Promise<any> {
    return this.ssvService.registerValidatorSSV();
  }

}
