import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";

enum StatusCode {
  unknownError = 0,
  Unauthorized = 401,
  Forbidden = 403,
  Notfound = 404,
  Unprocessable = 422,
}

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.headers.get('noIntercept') === 'true') {
    return next(request);
  }

  return next(request).pipe(
    catchError((error) => {
      let errorMsg = 'Ocurrió un error';


      return throwError(() => error)
    })
  )

};
