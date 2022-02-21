import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { LicensesService, License } from "@bluebits/products";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({ selector: "admin-licenses-form", templateUrl: "./licenses-form.component.html", styles: [] })
export class LicensesFormComponent implements OnInit, OnDestroy {
  public editmode = false;
  public form: FormGroup;
  public isSubmitted = false;
  public licenses = [];
  public currentProductId: string;
  public currentLicenseId: string;
  private endsubs$: Subject<any> = new Subject();
  constructor(private formBuilder: FormBuilder, private licensesService: LicensesService, private messageService: MessageService, private location: Location, private route: ActivatedRoute) {}
  public ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _initForm(): void { this.form = this.formBuilder.group({ code: ["", Validators.required] }); }
  private _addLicense(licenseData: License): void {
    this.licensesService.createLicense(licenseData).pipe(takeUntil(this.endsubs$)).subscribe((license: License) => {
      this.messageService.add({ severity: "success", summary: "Success", detail: `License is created with code ${license.code}!` });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: "error", summary: "Error", detail: "License is not created!" }));
  }
  private _updateLicense(licenseData: License): void {
    this.licensesService.updateLicense(licenseData).pipe(takeUntil(this.endsubs$)).subscribe(() => {
      this.messageService.add({ severity: "success", summary: "Success", detail: "License is updated!" });
      timer(2000).toPromise().then(() => this.location.back());
    }, () => this.messageService.add({ severity: "error", summary: "Error", detail: "License is not updated!" }));
  }
  private _checkEditMode(): void {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id && params.productId) {
        this.editmode = true;
        this.currentProductId = params.productId;
        this.currentLicenseId = params.id;
        this.licensesService.getLicense(this.currentProductId, this.currentLicenseId).pipe(takeUntil(this.endsubs$)).subscribe((license) => {
            this.licenseForm.code.setValue(license.code);
        });
      }
    });
  }
  public onSubmit(): void {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const licenseRequest: License = {
      id: this.currentLicenseId,
      productId: this.currentProductId,
      code: this.licenseForm.code.value,
    };
    if (this.editmode) this._updateLicense(licenseRequest);
    else this._addLicense(licenseRequest);
  }
  public onCancle(): void { this.location.back(); }
  get licenseForm() { return this.form.controls; }
}
