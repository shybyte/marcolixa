declare module Restivus {
  export function configure(o: {})
  export function addCollection<T>(collection: Mongo.Collection<T>);
  export function addRoute<T>(path: string, conf: {}, routes: {});
}