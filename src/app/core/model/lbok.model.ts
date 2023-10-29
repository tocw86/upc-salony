export class Showroom {
  public active!: boolean;
  public city!: string;
  public cityGroup!: string;
  public content!: string;
  public email!: string;
  public flags!: string[];
  public handicap!: boolean;
  public image!: string;
  public isPlay!: number;
  public latlng!: google.maps.LatLngLiteral;
  public phone!: string;
  public pointsCount!: number;
  public pointsDetails!: string;
  public specialInfo!: string;
  public street!: string;
  public title!: string;
  public options!: any;
  public distance!: number;
}

export class BaseUrls {
  public assets!: string;
  public base!: string;
  public css!: string;
  public current!: string;
  public js!: string;
  public scheme!: string;
}

export class CustomIcon {
  public url!: string;
  public anchor!: Point;
  public origin!: Point;
  public size!: any;
  public scaledSize!: any;
  public labelOrigin!: any;
}

export class Point {
  public x!: number;
  public y!: number;
}

export class Handicap {
  public src!: string;
  public alt!: string;
  public title!: string;
  public name!: string;
}
