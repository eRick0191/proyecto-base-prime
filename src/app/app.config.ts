import {ApplicationConfig} from "@angular/core";
import {provideRouter} from "@angular/router";
import {routes} from "./app-routing.module";
import { provideHttpClient, withInterceptors} from "@angular/common/http";
import {baseUrlInterceptor} from "./share/interceptor/base-url.interceptor";
import {errorInterceptor} from "./share/interceptor/error.interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import {tokenInterceptor} from "./share/interceptor/token.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([baseUrlInterceptor, tokenInterceptor,errorInterceptor]),
    ),


  ]
}
