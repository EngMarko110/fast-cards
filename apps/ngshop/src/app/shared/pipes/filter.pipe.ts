import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../../../../../libs/products/src';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Category[], searchText: string): Category[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
    // return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }

}
