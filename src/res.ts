export namespace ResponseType {
  export enum Code {
    success,
    fail
  }
  export enum FailCode {
    notFound,
    falseMethod,
    unauthorization,
    format
  }
  export interface Success {
    code: Code.success;
    data: any;
  }
  export interface Fail {
    code: Code.fail;
    data: {
      message: any,
      code: FailCode
    };
  }
}