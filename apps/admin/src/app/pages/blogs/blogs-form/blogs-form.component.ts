import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute ,Router} from "@angular/router";
import { MessageService } from "primeng/api";
import { Subject, timer } from "rxjs";
import { takeUntil } from 'rxjs/operators';
import { SEO } from '../../../../../../../libs/ui/src/lib/models/seo';
import { SeoService } from './../../../../../../../libs/ui/src/lib/services/seo.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'blogs-form',
  templateUrl: './blogs-form.component.html',
  styleUrls: ['./blogs-form.component.css']
})
export class BlogsFormComponent implements OnInit , OnDestroy{
  endsubs$: Subject<any> = new Subject();
  form:FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    topic: ['', Validators.required],
  });
  isSubmitted = false;
  editmode = false;
  blogId;
  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private seoServ: SeoService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.blogId=param.get('id');
      console.log('BLOG ID: ',this.blogId);
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
    const blog: SEO = {
         title: this.form.controls.title.value,
          topic: this.form.controls.topic.value
    };
    if (this.blogId) {
     this.updateBlog(this.blogId,blog);
     console.log('update!');
    } else {
      this.addBlog(blog);
      console.log('create!');
    }
  }

 
  addBlog(blog: SEO) {
    this.seoServ
      .createBlog(blog)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        (blog: SEO) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Blog  is created!`
          });
          timer(2000)
            .toPromise()
            .then(() => {
              // this.location.back();
              this.router.navigateByUrl('/blogs')
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Blog is not created!'
          });
        }
      );
  }
  updateBlog(blogid,blog: SEO) {
    this.seoServ.updateBlog(blogid, blog)
      .pipe(takeUntil(this.endsubs$))
      .subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Blog is updated!'
          });
          timer(2000)
            .toPromise()
            .then(() => {
              this.router.navigateByUrl('/blogs')
            });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Blog is not updated!'
          });
        }
      );
  }
  checkMode() {
    if (this.blogId) {
      this.seoServ.getBlogById(this.blogId).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
       console.log({response})
        this.form.controls.title.setValue(response.title);
        this.form.controls.topic.setValue(response.topic);
      });
    }
  }
}
