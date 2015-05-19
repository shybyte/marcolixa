declare module Mongo {
  interface  Collection<T> {
    attachBehaviour(behaviour: string, opts : {});
  }
}
