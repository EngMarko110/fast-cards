import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, SubCategory } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({ selector: 'admin-sub-categories-list', templateUrl: './sub-categories-list.component.html', styles: [] })
export class SubCategoriesListComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  public subCategories: SubCategory[] = [];
  subColor;
  searchText;
  @Input() public parentCategory: string;
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }
  public ngOnInit(): void {
    this._getSubCategories();
    this.getCategory();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  public deleteSubCategory(subCategoryId: string): void {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Sub Category?',
      header: 'Delete Sub Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteSubCategory(subCategoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getSubCategories();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sub Category is deleted!' });
        }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sub Category is not deleted!' }));
      }
    });
  }
  public createSubCategory(): void { this.router.navigateByUrl(`categories/${this.parentCategory}/subCategories/form`); }
  public updateSubCategory(subCategoryId: string): void { this.router.navigateByUrl(`categories/${this.parentCategory}/subCategories/form/${subCategoryId}`); }
  private _getSubCategories(): void {
    this.categoriesService.getSubCategories(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((subCats) => this.subCategories = subCats);
  }
  getCategory() {
    this.categoriesService.getCategory(this.parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.subColor=response.color;
    }
    );
  }
}
