import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoriesService, Category } from "@bluebits/products";
import { MessageService, ConfirmationService } from "primeng/api";
import { takeUntil } from "rxjs/operators";
import { CategoriesListComponent } from "../categories-list/categories-list.component";
@Component({ selector: "admin-main-categories-list", templateUrl: "./main-categories-list.component.html", styles: [] })
export class MainCategoriesListComponent extends CategoriesListComponent implements OnInit, OnDestroy {
  private localCategoriesService: CategoriesService;
  private localMessageService: MessageService;
  private localConfirmationService: ConfirmationService;
  private localRouter: Router;
  private isFiltered: boolean = false;
  public filteredCategories: Category[];
  public listType: string;
  public mainCategories: Category[] = [];
  constructor(
    categoriesService: CategoriesService,
    messageService: MessageService,
    confirmationService: ConfirmationService,
    router: Router,
    route: ActivatedRoute,
  ) {
    super(categoriesService, messageService, confirmationService, router, route);
    this.localCategoriesService = categoriesService;
    this.localConfirmationService = confirmationService;
    this.localMessageService = messageService;
    this.localRouter = router;
  }
  public ngOnInit(): void {
    this._getList();
  }
  public ngOnDestroy(): void { super.ngOnDestroy(); }
  public getCategoriesByMainId(mainCategoryId: string): void {
    this.isFiltered = !this.isFiltered;
    if (this.isFiltered === true) this.localCategoriesService.getCategories(mainCategoryId).pipe(takeUntil(this.endsubs$)).subscribe((categories) => this.filteredCategories = categories);
    else this.filteredCategories = [];
  }
  public createCategory(): void { this.localRouter.navigateByUrl(`categories/mainCategories/form`); }
  public createSideCategory(categoryId: string): void { this.localRouter.navigateByUrl(`categories/${categoryId}/form`); }
  public updateOrGetCategory(categoryid: string, isReadOnly: string): void {
    this.localRouter.navigateByUrl(`categories/form/${categoryid}/${isReadOnly}`);
  }
  public deleteCategory(categoryId: string): void {
    this.localConfirmationService.confirm({
      message: "Do you want to Delete this Category?",
      header: "Delete Category",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.localCategoriesService.deleteMainCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe(() => {
          this._getList();
          this.localMessageService.add({ severity: 'success', summary: 'Success', detail: 'Main Category is deleted!' });
        }, () => this.localMessageService.add({ severity: 'error', summary: 'Error', detail: 'Main Category is not deleted!' }));
        // location.reload();
      },
    });
  }
  protected _getList(): void {
    this.localCategoriesService.getMainCategories().pipe(takeUntil(this.endsubs$)).subscribe((mainCategories) => this.mainCategories = mainCategories);
  }
}
