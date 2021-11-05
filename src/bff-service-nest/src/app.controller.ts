import { Controller, All, Req,  Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('*')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  async proxyRequest(@Req()req: any, @Res() res: any): Promise<any> {
    return await this.appService.proxyRequest(req, res);

  }
}
