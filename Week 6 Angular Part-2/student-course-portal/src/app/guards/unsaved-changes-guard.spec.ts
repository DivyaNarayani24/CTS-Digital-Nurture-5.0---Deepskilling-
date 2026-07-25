import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { unsavedChangesGuard } from './unsaved-changes-guard';
import { CanComponentDeactivate } from './can-component-deactivate';

describe('unsavedChangesGuard', () => {
  const executeGuard: CanDeactivateFn<CanComponentDeactivate> = (...guardParameters) =>
      TestBed.runInInjectionContext(() => unsavedChangesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when component has no unsaved changes', () => {
    const mockComponent = { canDeactivate: () => true } as CanComponentDeactivate;
    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(mockComponent, {} as any, {} as any, {} as any)
    );
    expect(result).toBeTrue();
  });

  it('should allow navigation when component has no canDeactivate method', () => {
    const mockComponent = {} as CanComponentDeactivate;
    const result = TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(mockComponent, {} as any, {} as any, {} as any)
    );
    expect(result).toBeTrue();
  });
});