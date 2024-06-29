export type ErrorGqlItem = {
    message: string;
    extensions: {
      success: boolean;
      timestamp: Date;
      code: string;
      response: ErrorGqlResponseItem;
    };
  };
  export type ErrorGqlResponseItem = {
    statusCode: number;
    error: string;
    message:
      | {
          property: string;
          children: any[];
          constraints: { [key: string]: string };
        }[]
      | string;
  };
  export type ErrorGql = {
    response: {
      errors: [ErrorGqlItem];
    };
  };