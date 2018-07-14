declare interface NodeModule {
  hot: {
    accept: (a: string, b: () => any) => any;
  };
}
