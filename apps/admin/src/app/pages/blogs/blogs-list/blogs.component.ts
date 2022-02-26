import { Component, OnDestroy, OnInit ,ViewEncapsulation} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MessageService, ConfirmationService } from "primeng/api";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SEO } from "../../../../../../../libs/ui/src/lib/models/seo";
import { SeoService } from "../../../../../../../libs/ui/src/lib/services/seo.service";

@Component({
  selector: "admin-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
  // encapsulation: ViewEncapsulation.None,

})
export class BlogsComponent implements OnInit ,OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  blogsList: SEO[];

  constructor(private seoServ: SeoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getAllBlog();
  }
  public ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  getAllBlog() {
    this.seoServ.getAllBlog().pipe(takeUntil(this.endsubs$)).subscribe((response) => {
      this.blogsList = response;
      console.log({ response });
    });
  }

  deleteBlog(blogId: string) {
    console.log('delete: ',blogId);
    // this.confirmationService.confirm({
    //   message: "Do you want to Delete this Question?",
    //   header: "Delete Question",
    //   icon: "pi pi-exclamation-triangle",
    //   accept: () => {
          this.seoServ.deleteBlog(blogId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(() => {
            // this.messageService.add(
              //   { 
              //     severity: 'success', summary: 'Success', detail: 'Blog is deleted!' 
              //   });
               this.getAllBlog();
      //       }, () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Blog is not deleted!' }));
      //   },
    
          })
  }

}