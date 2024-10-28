import { Injectable } from '@nestjs/common';
// import { AppLogger } from '@utility/logger';

@Injectable()
export class AppService {
  // private readonly logger = new AppLogger(AppService.name);

  async getTestData(): Promise<number> {
    // this.logger.enter(this.getTestData.name);

    const data = 1;

    // this.logger.debug(`data: ${data}`);
    // this.logger.exit(this.getTestData.name);

    return Promise.resolve(data);
  }
}
