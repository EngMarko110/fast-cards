
import { SeoService } from './../../../../../../libs/ui/src/lib/services/seo.service';
import { SEO } from '../../../../../../libs/ui/src/lib/models/seo';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: "bluebits-faq-page",
  templateUrl: "./faq-page.component.html",
  styleUrls: ["./faq-page.component.scss"],
})
export class FaqPageComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  faqList: SEO[];

  constructor(private seoServ: SeoService) { }

  ngOnInit(): void {
    this.getAllFAQ();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  getAllFAQ() {
    this.seoServ.getAllFAQ().pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.faqList = response;
      console.log({ response });

    });
  }
}
