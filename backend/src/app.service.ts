import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World! This is your starting point to blockscapes ssv institutional staking api';
  }
}
