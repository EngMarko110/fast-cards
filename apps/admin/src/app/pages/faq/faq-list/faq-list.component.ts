import { SeoService } from "./../../../../../../../libs/ui/src/lib/services/seo.service";
import { SEO } from "./../../../../../../../libs/ui/src/lib/models/seo";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MessageService, ConfirmationService } from "primeng/api";

@Component({
  selector: "faq-list",
  templateUrl: "./faq-list.component.html",
  styleUrls: ["./faq-list.component.css"],

})
export class FaqListComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  faqList: SEO[];

  constructor(
    private seoServ: SeoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    
  ) { }

  ngOnInit(): void {
    this.getAllFAQ();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  getAllFAQ() {
    this.seoServ
      .getAllFAQ()
      .pipe(takeUntil(this.endsubs$))
      .subscribe((response) => {
        this.faqList = response;
        console.log({ response });
      });
  }

  deleteFAQ(faqId: string) {
    console.log("delete: ", faqId);
    this.confirmationService.confirm({
      message: "Do you want to Delete this Question?",
      header: "Delete Question",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.seoServ
          .deleteFAQ(faqId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
            () => {
              this.getAllFAQ();
              this.messageService.add({
                severity: "success",
                summary: "Success",
                detail: "FAQ is deleted!",
              });
            },
            () => {
              this.messageService.add({
                severity: "error",
                summary: "Error",
                detail: "FAQ is not deleted!",
              });
            }
          );
      },
    });
  }
}
