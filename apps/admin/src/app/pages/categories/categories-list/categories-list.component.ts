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
  @Input() public filteredCategories: Category[];
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
    this.currentCategoryId = this.category;
    this._getList();
    const listTypeName = this.listType.toLowerCase();
    this.subHeader = 'List of all ' + listTypeName;
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
        if (this.mainCategory && this.category) {
          this.categoriesService.deleteSubCategory(categoryId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(() => {
            this.messageService.add(
              { severity: 'success', summary: 'Success', detail: 'Sub Category is deleted!' });
            this._getList();
          }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sub Category is not deleted!' }));
        }
        if (this.listType === CategoriesNames.categories || (this.mainCategory && !this.category)) {
          this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
            this._getList();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted!' });
          }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted!' }));
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
    } else this.router.navigateByUrl(`categories/form/${this.listType.toLowerCase()}`);
  }
  protected _getList() {
    if (this.mainCategory) {
      if (this.category) {
        this.listType = this.listType ? this.listType : CategoriesNames.subCategories;
        this.categoriesService.getSubCategories(this.category).pipe(takeUntil(this.endsubs$)).subscribe((subCategories) => {
          this.categoriesService.getCategory(this.category).pipe(takeUntil(this.endsubs$)).subscribe((category) => {
            this.categories = this.categoriesMapper(subCategories, category);
          });
        });
      } else {
        this.listType = this.listType ? this.listType : CategoriesNames.categories;
        this.categoriesService.getCategories(this.mainCategory).pipe(takeUntil(this.endsubs$)).subscribe((cats) => this.categories = cats);
      }
    } else {
      this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats) => this.categories = cats);
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
