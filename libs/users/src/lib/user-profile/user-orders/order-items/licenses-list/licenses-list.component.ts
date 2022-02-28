import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LicensesService } from '../../../../../../../products/src';
import { Subject } from 'rxjs';
import {License} from '../../../../../../../products/src';
@Component({
  selector: 'bluebits-licenses-list',
  templateUrl: './licenses-list.component.html',
  styleUrls: ['./licenses-list.component.scss']
})
export class LicensesListComponent implements OnInit, OnDestroy {
  @Input() key:string;
  licenses;
  endsubs$: Subject<any> = new Subject();
  constructor(  private licensesService: LicensesService) { }

  ngOnInit(): void {
    this._getLicenses();
  }
  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  private _getLicenses(): void {
      // console.log(this.key)
      this.licensesService.getLicense(this.key).pipe(takeUntil(this.endsubs$)).subscribe((licenses) => {
        this.licenses=licenses.code;
      });
    
  }   
}
