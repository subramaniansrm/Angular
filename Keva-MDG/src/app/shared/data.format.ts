import { NativeDateAdapter} from '@angular/material';

export const APP_DATE_FORMATS = {
    parse: {
        dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
    },
    display: {
        dateInput: 'input',
        monthYearLabel: { year: 'numeric', month: 'numeric' },
        dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
        monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
};
export class AppDateAdapter extends NativeDateAdapter {

  format(date: Date, displayFormat: Object): string {

      if (displayFormat === 'input') {

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const newDate = (day < 10) ? "0" + day : day;
          const newMonth = (month < 10) ? "0" + month : month;
          return `${year}-${newMonth}-${newDate}`;
      }

      return date.toDateString();
  }
}
