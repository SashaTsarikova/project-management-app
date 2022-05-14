import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, searchString: string) {
    if (value.length === 0 || searchString === '') {
      return value;
    }

    const tasks: string[] = [];
    value.forEach((task: any) => {
      if (task.title.includes(searchString) || task.description.includes(searchString)) {
        tasks.push(task);
      }
    });
    return tasks;
  }
}
