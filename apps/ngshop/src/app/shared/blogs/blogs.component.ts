import { Component, OnDestroy, OnInit ,ViewEncapsulation} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SEO } from '../../../../../../libs/ui/src/lib/models/seo';
import { SeoService } from '../../../../../../libs/ui/src/lib/services/seo.service';

@Component({
  selector: 'bluebits-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogsComponent implements OnInit, OnDestroy {
  private endsubs$: Subject<any> = new Subject();
  blogsList: SEO[];

  constructor(private seoServ: SeoService) { }

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
}
