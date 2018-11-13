
import { UyiObject } from "./UyiObject"


export function PrefixString(originstr: string, length: number, ch: string = '0') {
  if (!originstr) return;
  if (originstr.length >= length) return originstr;
  return (Array(length).join(ch) + originstr).slice(-length);
}


/**
 * 表示时间上的一刻，通常以日期和当天的时间表示。
 */
export class DateTime extends UyiObject {

  private _timeData: Date = new Date();

  public get Day(): number { return this._timeData.getDate(); }
  public get Hour(): number { return this._timeData.getHours(); }
  public get Minute(): number { return this._timeData.getMinutes(); }
  public get Month(): number { return this._timeData.getMonth() + 1; }
  public get Second(): number { return this._timeData.getSeconds(); }
  public get Year(): number { return this._timeData.getFullYear(); }

  public set Day(value: number) { this._timeData.setDate(value); }
  public set Hour(value: number) { this._timeData.setHours(value); }
  public set Minute(value: number) { this._timeData.setMinutes(value); }
  public set Month(value: number) { this._timeData.setMonth(value - 1); }
  public set Second(value: number) { this._timeData.setSeconds(value); }
  public set Year(value: number) { this._timeData.setFullYear(value); }

  /**
   * 获取当前时间的时间戳的值
   */
  public get TimeStamp(): number { return this._timeData.valueOf(); };
  /**
   * 从一个时间戳获取时间信息
   * @param value 时间戳的值
   */
  public static FromTimeStamp(value: number): DateTime { var data = new DateTime(); data._timeData = new Date(value); return data; }
  /**
   * 获取一个 DateTime 对象，该对象设置为此计算机上的当前日期和时间，表示为本地时间。
   */
  public static get Now(): DateTime { return new DateTime(); }

  public ToString(format: string) {
    if (!format || format.length <= 0) {
      format = "yyyy-MM-dd HH:mm:ss";
    }
    format = format.replace("yyyy", this.Year.toString());
    format = format.replace("MM", PrefixString(this.Month.toString(), 2, '0'));
    format = format.replace("dd", PrefixString(this.Day.toString(), 2, '0'));
    format = format.replace("HH", PrefixString(this.Hour.toString(), 2, '0'));
    format = format.replace("mm", PrefixString(this.Minute.toString(), 2, '0'));
    format = format.replace("ss", PrefixString(this.Second.toString(), 2, '0'));

    format = format.replace('M', this.Month.toString());
    format = format.replace('d', this.Day.toString());
    format = format.replace('H', this.Hour.toString());
    format = format.replace('m', this.Minute.toString());
    format = format.replace('s', this.Second.toString());

    return format;
  }

  /**
   * 获取每月的最大天数
   * @param Month 月份
   * @param Year  年份
   * author:Cyq
   */
  public GetMonthMaxDay(Month: number, Year: number) {
    switch (Month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 2:
        {
          if (Year % 100 == 0) {
            if (Year % 400 == 0) {
              return 29;
            }
          }
          else {
            if (Year % 4 == 0) {
              return 29;
            }
          }
          return 28;
        }
      default:
        return 30;
    }
  }

}


export class TimeSpan extends UyiObject {


  /*  public*/ static TicksPerDay: number = 86400;
  /*  public*/ static TicksPerHour: number = 3600;
  /*  public*/ static TicksPerMinute: number = 60;
  /*  public*/ static TicksPerSecond: number = 1;


  public get Days(): number { return Math.floor(this._tick / TimeSpan.TicksPerDay); }
  public get Hours(): number { return Math.floor(this._tick % TimeSpan.TicksPerDay / TimeSpan.TicksPerHour); }
  public get Minutes(): number { return Math.floor(this._tick % TimeSpan.TicksPerDay % TimeSpan.TicksPerHour / TimeSpan.TicksPerMinute); }
  public get Seconds(): number { return Math.floor(this._tick % TimeSpan.TicksPerDay % TimeSpan.TicksPerHour % TimeSpan.TicksPerMinute); }
  private _tick: number = 0;


  /**
    * 获取当前时间间隔的总秒数
    */
  public get TotalSeconds(): number { return this._tick; };
  public set TotalSeconds(seconds: number) { this._tick = seconds; };
  /**
   * 时间间隔的总秒数数据获取一个 TimeSpan 对象
   * @param value 时间戳的值
   */
  public static FromTotalSeconds(value: number): TimeSpan { var tk = new TimeSpan(); tk._tick = value; return tk; }

  public static get Empty(): TimeSpan { return new TimeSpan(); }

}



