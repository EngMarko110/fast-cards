import { SeoService } from './../../../../../../../libs/ui/src/lib/services/seo.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { SEO } from '../../../../../../../libs/ui/src/lib/models/seo';

@Component({
  selector: "faq-list",
  templateUrl: "./faq-form.component.html",
  styleUrls: ["./faq-form.component.css"],
})
export class FaqFormComponent implements OnInit, OnDestroy {
  endsubs$: Subject<any> = new Subject();
  form:FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    topic: ['', Validators.required],
  });
  isSubmitted = false;
  editmode = false;
  faqId;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private seoServ: SeoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.faqId=param.get('id');
      console.log('FAQ ID: ',this.faqId);
      this.checkMode();
      console.log('controls: ',this.form.controls.title.value);
    });
   }

  ngOnInit(): void {
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
    const faq: SEO = {
         title: this.form.controls.title.value,
          topic: this.form.controls.topic.value
    };
    if (this.faqId) {
     this.updateFAQ(this.faqId,faq);
     console.log('update!');
    } else {
      this.addFAQ(faq);
      console.log('create!');
    }
  }

 
  addFAQ(faq: SEO) {
    this.seoServ
      .createFAQ(faq)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (faq: SEO) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Question ${faq.title} is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              // this.location.back();
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Question is not created!'
          });
        }
      );
  }
  updateFAQ(faqid,faq: SEO) {
    this.seoServ.updateFAQ(faqid, faq)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Question is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              // this.location.back();
              // console.log('')
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Question is not updated!'
          });
        }
      );
  }
  checkMode() {
    if (this.faqId) {
      this.seoServ.getFAQById(this.faqId).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
       console.log({response})
        this.form.controls.title.setValue(response.title);
        this.form.controls.topic.setValue(response.topic);
      });
    }
  }
}
