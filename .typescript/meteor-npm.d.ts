declare module Meteor {
  function npmRequire(moduleName: string): any;
}

declare module Async {
  function runSync(f: Function) : any;
}
