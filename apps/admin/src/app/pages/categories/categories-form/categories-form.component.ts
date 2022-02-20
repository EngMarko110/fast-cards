import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: []
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentMainCategoryId: string;
  currentCategoryId: string;
  selectedMainCategory: string;
  currentSubCategoryId: string;
  endsubs$: Subject<any> = new Subject();
  public mainCategories = [];
  public isReadOnly: boolean;
  public formType: string;
  public listType: string;
  private isValid: boolean;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._getMainCategories();
    this.form = this.formBuilder.group({
      mainCategory: [''],
      name: ['', Validators.required],
      icon: [''],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.formType === 'Main Category' ?
          this.currentMainCategoryId : this.formType === 'Category' ?
            this.currentCategoryId : this.formType === 'Sub Category' ?
              this.currentSubCategoryId : undefined,
      mainCategory: !this.listType && (this.formType === 'Category' || 'Sub Category') ? this.currentMainCategoryId : this.selectedMainCategory,
      category: this.formType === 'Sub Category' ? this.currentCategoryId : undefined,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    if (this.editmode) {
      this.formType === 'Main Category' ?
        this._updateMainCategory(category) : this.formType === 'Category' ?
          this._updateCategory(category) : this._updateSubCategory(category);
    } else {
      this.formType === 'Main Category' ?
        this._addMainCategory(category) : this.formType === 'Category' ?
          this._addCategory(category) : this._addSubCategory(category);
    }
  }

  onCancle() {
    this.location.back();
  }
  public isRequiredMainCategory(): boolean { return this.isValid; }
  private _getMainCategories() {
    this.categoriesService.getMainCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories) => this.mainCategories = categories);
  }
  private _addMainCategory(category: Category) {
    this.categoriesService.createMainCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((category: Category) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Main Category ${category.name} is created!` });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Main Category is not created!' }));
  }
  private _updateMainCategory(category: Category) {
    this.categoriesService.updateMainCategory(category).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Main Category is updated!' });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Main Category is not updated!' }));
  }
  private _addCategory(category: Category) {
    this.categoriesService
      .createCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Category ${category.name} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not created!'
          });
        }
      );
  }

  private _updateCategory(category: Category) {
    this.categoriesService
      .updateCategory(category)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Category is not updated!'
          });
        }
      );
  }
  private _addSubCategory(category: Category) {
    this.categoriesService.createSubCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((category: Category) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Sub Category ${category.name} is created!` });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sub Category is not created!' }));
  }
  private _updateSubCategory(category: Category) {
    this.categoriesService.updateSubCategory(category).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sub Category is updated!' });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sub Category is not updated!' }));
  }
  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.isReadOnly && params.isReadOnly === "true") this.isReadOnly = params.isReadOnly;
      if (params.mainCategory) {
        if (params.category) {
          this.formType = 'Sub Category';
          this.currentMainCategoryId = params.mainCategory;
          this.currentCategoryId = params.category;
          this.currentSubCategoryId = params.id;
          this.getSubCategory();
        } else {
          this.formType = 'Category';
          this.currentMainCategoryId = params.mainCategory;
          this.currentCategoryId = params.id;
          this.getCategory();
        }
      } else {
        this.listType = params.listType;
        if (this.listType) this.formType = 'Category';
        else {
          this.formType = 'Main Category';
          this.currentMainCategoryId = params.id;
          this.getMainCategory();
        }
      }
    });
  }
  private getMainCategory(): void {
    if (this.currentMainCategoryId) {
      this.editmode = true;
      this.categoriesService.getMainCategory(this.currentMainCategoryId).pipe(takeUntil(this.endsubs$)).subscribe((mainCategory) => {
        this.categoryForm.name.setValue(mainCategory.name);
        this.categoryForm.icon.setValue(mainCategory.icon);
        this.categoryForm.color.setValue(mainCategory.color);
      });
    }
  }
  private getCategory(): void {
    if (this.currentCategoryId) {
      this.editmode = true;
      this.categoriesService.getCategory(this.currentCategoryId).pipe(takeUntil(this.endsubs$)).subscribe((category) => {
        this.categoryForm.name.setValue(category.name);
        this.categoryForm.icon.setValue(category.icon);
        this.categoryForm.color.setValue(category.color);
      });
    }
  }
  private getSubCategory(): void {
    if (this.currentSubCategoryId) {
      this.editmode = true;
      this.categoriesService.getSubCategory(this.currentSubCategoryId).pipe(takeUntil(this.endsubs$)).subscribe((subCategory) => {
        this.categoryForm.name.setValue(subCategory.name);
        this.categoryForm.icon.setValue(subCategory.icon);
        this.categoryForm.color.setValue(subCategory.color);
      });
    }
  }
  get categoryForm() {
    return this.form.controls;
  }
}
