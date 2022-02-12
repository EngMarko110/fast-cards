import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { CategoriesService, SubCategory } from "@bluebits/products";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: "admin-sub-categories-form",
  templateUrl: "./sub-categories-form.component.html",
  styles: [],
})
export class SubCategoriesFormComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  public form: FormGroup;
  public isSubmitted = false;
  public editmode = false;
  public currentCategoryId: string;
  public currentSubCategoryId: string;
  public isReadOnly: boolean;

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      icon: ["", Validators.required], //
      color: ["#fff"], //
    });
    this._checkEditMode();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const subCategory: SubCategory = {
      _id: this.currentSubCategoryId,
      parentCategory: this.currentCategoryId,
      name: this.subCategoryForm.name.value,
      icon: this.subCategoryForm.icon.value,
      color: this.subCategoryForm.color.value,
    };
    if (this.editmode) this._updateSubCategory(subCategory);
    else this._addSubCategory(subCategory);
  }
  onCancle() {
    this.location.back();
  }
  private _addSubCategory(subCategory: SubCategory): void {
    this.categoriesService
      .createSubCategory(subCategory)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (subCategory: SubCategory) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: `Sub Category ${subCategory.name} is created!`,
          });
          timer(2000)
            .toPromise()
            .then(() => this.location.back());
        },
        (error:HttpErrorResponse) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: `${error.error.message}`,
          });
          // console.log(`response: ${error.error.message}!`);

        }
      );
  }
  private _updateSubCategory(subCategory: SubCategory): void {
    this.categoriesService
      .updateSubCategory(subCategory)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Sub Category is updated!",
          });
          timer(2000)
            .toPromise()
            .then(() => this.location.back());
        },
        () =>
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Sub Category is not updated!",
          })
      );
  }
  private _checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe(
      (params) => {
        if (params.parentCategory) {
          this.currentCategoryId = params.parentCategory;
          if (params.id) {
            this.editmode = true;
            this.currentSubCategoryId = params.id;
            this.categoriesService
              .getSubCategory(params.id)
              .pipe(takeUntil(this.endsubs$))
              .subscribe((subCategory) => {
                this.subCategoryForm.name.setValue(subCategory.name);
                this.subCategoryForm.icon.setValue(subCategory.icon);
                this.subCategoryForm.color.setValue(subCategory.color);
              });
          }
        }
      },
      (error) => console.log(error)
    );
  }
  get subCategoryForm() {
    return this.form.controls;
  }
}
