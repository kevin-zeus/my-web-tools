declare global {
  interface Window {
    sourceMap: any;
  }
}

export interface IRouterConfig {
  path: string;
  name?: string;
  redirect?: string;
  component?: React.ComponentType<any>;
  children?: IRouterConfig[];
}
