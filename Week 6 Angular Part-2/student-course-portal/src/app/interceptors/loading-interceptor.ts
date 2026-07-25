import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  // Defer to avoid ExpressionChangedAfterItHasBeenCheckedError when
  // a request fires during the initial change detection cycle.
  Promise.resolve().then(() => loadingService.show());

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};