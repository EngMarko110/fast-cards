import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesNames, CategoriesService, Category } from "@bluebits/products";
import { ConfirmationService, MessageService } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "admin-categories-list",
  templateUrl: "./categories-list.component.html",
  styles: [],
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();
  searchText: any;
  public currentCategoryId: string;
  public subHeader: string;
  @Input() public listType: string;
  @Input() private mainCategory: string;
  @Input() private category: string;
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const listTypeName = this.listType ? this.listType.toLowerCase() : 'categories';
    this.subHeader = 'List of all ' + listTypeName;
    this.currentCategoryId = this.category;
    this._getList();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: "Do you want to Delete this Category?",
      header: "Delete Category",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (this.mainCategory) {
          if (this.category) {
            this.categoriesService.deleteSubCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
              this._getList();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sub Category is deleted!' });
            }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sub Category is not deleted!' }));
          } else {
            this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
              this._getList();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted!' });
            }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted!' }));
          }
        } else {
          this.categoriesService.deleteMainCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
            this._getList();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Main Category is deleted!' });
          }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Main Category is not deleted!' }));
        }
      },
    });
  }

  updateOrGetCategory(categoryid: string, isReadOnly: string, mainCategoryid?: string) {
    if (mainCategoryid && !this.mainCategory) {
      this.mainCategory = mainCategoryid;
      this.router.navigateByUrl(`categories/form/${this.mainCategory}/${categoryid}/${isReadOnly}`);
    } else {
      if (this.mainCategory) {
        if (this.category) this.router.navigateByUrl(`categories/form/${this.mainCategory}/${this.category}/${categoryid}/${isReadOnly}`);
        else this.router.navigateByUrl(`categories/form/${this.mainCategory}/${categoryid}/${isReadOnly}`);
      } else this.router.navigateByUrl(`categories/form/${categoryid}/${isReadOnly}`);
    }
  }
  public createSideCategory(categoryId: string, mainCategoryid?: string) {
    if (mainCategoryid) this.router.navigateByUrl(`categories/${mainCategoryid}/subCategories/${categoryId}/form`);
    else this.router.navigateByUrl(`categories/${categoryId}/form`);
  }
  public createCategory() {
    if (this.mainCategory) {
      if (this.category) this.router.navigateByUrl(`categories/${this.mainCategory}/subCategories/${this.category}/form`);
      else this.router.navigateByUrl(`categories/${this.mainCategory}/form`);
    } else {
      if (this.listType === CategoriesNames.mainCategories) this.router.navigateByUrl(`categories/mainCategories/form`);
      else this.router.navigateByUrl(`categories/form`);
    }
  }
  private _getList() {
    if (this.mainCategory) {
      if (this.category) {
        this.categoriesService.getSubCategories(this.category).pipe(takeUntil(this.endsubs$)).subscribe((subCategories) => {
          this.categoriesService.getCategory(this.category).pipe(takeUntil(this.endsubs$)).subscribe((category) => {
            this.categories = this.categoriesMapper(subCategories, category);
          });
        });
      } else this.categoriesService.getCategories(this.mainCategory).pipe(takeUntil(this.endsubs$)).subscribe((cats) => this.categories = cats);
    } else {
      if (this.listType === 'Main Categories') this.categoriesService.getMainCategories().pipe(takeUntil(this.endsubs$)).subscribe((mainCategories) => this.categories = mainCategories);
      else this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats) => this.categories = cats);
    }
  }
  private categoriesMapper(subCategories: Category[], category: Category): any[] {
    const mappedSubCategories: Category[] = [];
    for (let subCategory of subCategories) {
      subCategory.subicon = category.icon;
      mappedSubCategories.push(subCategory)
    }
    return mappedSubCategories;
  }
}
