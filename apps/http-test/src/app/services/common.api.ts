import { Injectable } from '@angular/core';
import { ApiHttpClient, Get, HostUrl, RestClient } from '@safe-angular/http';
import { Observable } from 'rxjs';

@Injectable()
@HostUrl('https://jsonplaceholder.typicode.com')
@RestClient('posts')
export class CommonApi extends ApiHttpClient {
  @Get('1')
  public testGet(): Observable<object> {
    return this.restTemplate();
  }
}
