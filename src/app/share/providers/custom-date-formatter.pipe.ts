import {CalendarDateFormatter, DateFormatterParams} from 'angular-calendar';
import {formatDate} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {

  public override monthViewColumnHeader({date, locale}: DateFormatterParams): string {
    return formatDate(date, 'EEE', <string>locale);
  }

  public override weekViewColumnHeader({date, locale}: DateFormatterParams): string {
    return formatDate(date, 'EEE', <string>locale);
  }

  public override dayViewHour({date, locale}: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', <string>locale);
  }
}
