import { Directive, inject, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppAuthService } from '../service/app.auth.service';

@Directive({
  selector: '[appIsInRoles]'
})
export class IsInRolesDirective implements OnInit, OnDestroy {

  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject<TemplateRef<any>>(TemplateRef);
  private authService = inject(AppAuthService);

  @Input() appIsInRoles?: string[];
  stop$ = new Subject<void>();
  isVisible = false;

  ngOnInit() {
    this.authService.getRoles().pipe(
      takeUntil(this.stop$)
    ).subscribe({
      next: (roles) => {
        const userRoles = roles ?? [];
        const found = (this.appIsInRoles ?? []).every(r => userRoles.includes(r));

        if (found && !this.isVisible) {
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else if (!found && this.isVisible) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      },
      error: (err) => console.error('IsInRolesDirective role check failed:', err)
    });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }
}