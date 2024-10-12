/* eslint-disable @typescript-eslint/naming-convention */
import { provideHttpClient } from '@angular/common/http';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import HttpRequestMock from 'http-request-mock';
import { isEqual } from 'lodash';
import { Observable, Subject, takeUntil } from 'rxjs';

import { ApiClientModule } from './api.module';
import { Delete } from './decorators/methods/delete.decorator';
import { Get } from './decorators/methods/get.decorator';
import { Post } from './decorators/methods/post.decorator';
import { Put } from './decorators/methods/put.decorator';
import { PathVariable } from './decorators/params/path-variable.decorator';
import { RequestBody } from './decorators/params/request-body.decorator';
import { RequestParam } from './decorators/params/request-param.decorator';
import { BaseUrl } from './decorators/path/base-url.decorator';
import { RestClient } from './decorators/path/rest-client.decorator';
import { ApiHttpClient } from './service/api-http.client';

const mocker = HttpRequestMock.setupForUnitTest('all');

const mockHost = 'https://mock.com';
const mockBase = 'service';
const mockRest = 'v1';

interface WithResp {
  resp: string;
}

const TEST_BODY = {
  test: 'test1',
  test2: 'test3',
};

const PATH_VARIABLE_PATH = 'path';
const PATH_VARIABLE_VALUE = 'path-value';

const RP_path1 = 'rq-1';
const RP_path2 = 'rq-2';
const RP_value1 = 'this is rq 1';
const RP_value2 = 'this is rq 2';

const wrapResp = (resp: string): WithResp => {
  return {
    resp,
  };
};

mocker.get(`${mockHost}/${mockBase}/${mockRest}/testGet`, (): WithResp => {
  return wrapResp('test passed');
});
mocker.put(`${mockHost}/${mockBase}/${mockRest}/testPut`, (): WithResp => {
  return wrapResp('test passed');
});
mocker.post(
  `${mockHost}/${mockBase}/${mockRest}/testPost`,
  (request: { query: unknown; url: string; body: unknown }) => {
    if (
      !isEqual(request.query, {
        [RP_path1]: encodeURI(RP_value1),
        [RP_path2]: encodeURI(RP_value2),
      })
    ) {
      return wrapResp('test failed');
    }

    if (
      'https://mock.com/service/v1/testPost/path-value?rq-2=this%20is%20rq%202&rq-1=this%20is%20rq%201' !== request.url
    ) {
      return wrapResp('test failed');
    }

    if (!isEqual(request.body, TEST_BODY)) {
      return wrapResp('test failed');
    }

    return wrapResp('test passed');
  },
);
mocker.delete(`${mockHost}/${mockBase}/${mockRest}/testDelete`, (request: { headers: Record<string, string> }) => {
  if (request.headers['X-HEADER'] !== 'X-HEADER-value') {
    return wrapResp('FAIL');
  }

  return wrapResp('test passed');
});

mocker.get(mockHost, () => {
  return wrapResp('Something went wrong');
});

@Injectable()
@BaseUrl(mockBase)
@RestClient(mockRest)
class ApiTestService extends ApiHttpClient {
  @Get('testGet')
  public testGet(@RequestBody() _body: Record<string, string>): Observable<WithResp> {
    return this.restTemplate();
  }

  @Put(`testPut/{${PATH_VARIABLE_PATH}}`)
  public testPut(@PathVariable(PATH_VARIABLE_PATH) _path: string): Observable<WithResp> {
    return this.restTemplate();
  }

  @Post(`testPost/{${PATH_VARIABLE_PATH}}`)
  public testPost(
    @RequestBody() _body: Record<string, string>,
    @PathVariable(PATH_VARIABLE_PATH) _path: string,
    @RequestParam(RP_path1) _param1: string,
    @RequestParam(RP_path2) _param2: string,
  ): Observable<WithResp> {
    return this.restTemplate();
  }

  @Delete('testDelete')
  public testDelete(): Observable<WithResp> {
    return this.restTemplate({
      headers: {
        'X-HEADER': 'X-HEADER-value',
      },
    });
  }
}

@Component({
  standalone: true,
  selector: 'tia-mock',
  template: '',
})
class MockComponent implements OnDestroy {
  private readonly destroySubject$: Subject<void> = new Subject<void>();

  constructor(private readonly api: ApiTestService) {}

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  public testGet(): Observable<WithResp> {
    return this.api.testGet(TEST_BODY).pipe(takeUntil(this.destroySubject$));
  }

  public testPut(): Observable<WithResp> {
    return this.api.testPut(PATH_VARIABLE_VALUE).pipe(takeUntil(this.destroySubject$));
  }

  public testPost(): Observable<WithResp> {
    return this.api
      .testPost(TEST_BODY, PATH_VARIABLE_VALUE, RP_value1, RP_value2)
      .pipe(takeUntil(this.destroySubject$));
  }

  public testDelete(): Observable<WithResp> {
    return this.api.testDelete().pipe(takeUntil(this.destroySubject$));
  }
}

describe('Api Spec', () => {
  let fixture!: ComponentFixture<MockComponent>;
  let component: MockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockComponent,
        ApiClientModule.forRoot([ApiTestService], {
          hostUrl: 'https://mock.com',
          emitFailure: true,
          emitSuccess: true,
        }),
      ],
      providers: [provideHttpClient()],
    });
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('make get request', (done) => {
    component.testGet().subscribe((value) => {
      expect(value.resp).toBe('test passed');
      done();
    });
  });

  it('make put request', (done) => {
    component.testPut().subscribe((value) => {
      expect(value.resp).toBe('test passed');
      done();
    });
  });

  it('make post request', (done) => {
    component.testPost().subscribe((value) => {
      expect(value.resp).toBe('test passed');
      done();
    });
  });

  it('make delete request', (done) => {
    component.testDelete().subscribe((value) => {
      expect(value.resp).toBe('test passed');
      done();
    });
  });
});

/* eslint-enable @typescript-eslint/naming-convention */
