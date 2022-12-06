import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SsvService } from "./ssv.service";

@ApiTags('ssv')
@Controller('api/v1/ssv')
export class SsvController {
  constructor(
    private ssvService: SsvService,
  ) {
  }

  @Get('key-store')
  getKeyStore(): Promise<string> {
    return this.ssvService.getKeyStore();
  }

}