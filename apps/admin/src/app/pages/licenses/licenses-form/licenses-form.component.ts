import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  CategoriesService,
  Product,
  ProductsService,
} from "@bluebits/products";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "admin-products-form",
  templateUrl: "./products-form.component.html",
  styles: [],
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  mainCatagories = [];
  catagories = [];
  subCatagories = []; //
  selectedMainCategory: string;
  selectedCategory: string;
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;
  endsubs$: Subject<any> = new Subject();
  public isReadOnly: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._getMainCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  public getCategories(parentCategoryId?: string) {
    const parentCategory = this.editmode ? parentCategoryId : this.selectedMainCategory;
    if (parentCategory) {
      this.categoriesService.getCategories(parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((categories) => {
        this.catagories = categories;
      });
    }
  }

  public getSubCategories(parentCategoryId?: string) {
    const parentCategory = this.editmode ? parentCategoryId : this.selectedCategory;
    if (parentCategory) {
      this.categoriesService.getSubCategories(parentCategory).pipe(takeUntil(this.endsubs$)).subscribe((subCategories) => {
        this.subCatagories = subCategories;
      });
    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      brand: ["", Validators.required],
      price: ["", Validators.required],
      mainCategory: ["", Validators.required],
      category: ["", Validators.required],
      //
      subCategory: ["", Validators.required],
      //
      countInStock: ["", Validators.required],
      description: ["", Validators.required],
      richDescription: [""],
      image: ["", Validators.required],
      isFeatured: [false],
    });
  }

  private _getMainCategories() {
    this.categoriesService
      .getMainCategories()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((categories) => {
        this.mainCatagories = categories;
      });
  }

  private _addLicense(productData: FormData) {
    this.productsService
      .createProduct(productData)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (product: Product) => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: `Product ${product.name} is created!`,
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Product is not created!",
          });
        }
      );
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService
      .updateProduct(productFormData, this.currentProductId)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Product is updated!",
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Product is not updated!",
          });
        }
      );
  }

  private _checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.isReadOnly && params.isReadOnly === "true") this.isReadOnly = params.isReadOnly;
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).pipe(takeUntil(this.endsubs$)).subscribe((product) => {
            this.licenseForm.name.setValue(product.name);
            this.getCategories(product.mainCategory.id);
        });
      }
    });
  }
  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const licenseFormData = new FormData();
    Object.keys(this.licenseForm).map((key) => licenseFormData.append(key, this.licenseForm[key].value));
    if (this.editmode) this._updateProduct(licenseFormData);
    else this._addLicense(licenseFormData);
  }
  public onCancle(): void { this.location.back(); }
  get licenseForm() { return this.form.controls; }
}
