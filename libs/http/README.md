
# Safe Angular HTTP Library

This library is part of the `safe-angular` project and provides HTTP utilities and services to simplify HTTP requests within Angular applications.

## Features

- Provides an HTTP client wrapper for easier request handling.
- Optimized for Angular and TypeScript.
- Built-in support for error handling, interceptors, and more.

## Installation

Install the library:

```bash
npm install @safe-angular/http
```

## Usage

Import the `HttpService` in your Angular services or components:

```ts
@Injectable()
@HostUrl('https://jsonplaceholder.typicode.com')
@RestClient('posts')
export class CommonApi extends ApiHttpClient {
    @Get('1')
    public testGet(): Observable<object> {
        return this.restTemplate();
    }
}

```

## Configuration

You can configure interceptors, headers, and other options within your Angular app's HTTP module:

```ts
export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(),
        provideApiClientModule([CommonApi], {
            hostUrl: 'http://localhost:4200',
            emitFailure: true,
            emitSuccess: true,
        }),
    ],
};
```

## License

This project is licensed under the MIT License.
