import { Model, Namespace } from "./types"

const middle = new Map<Namespace, Model<any, any>>()

export function createModel<S, A extends string>(namespace: Namespace, model: Model<S, A>) {
  middle.set(namespace, model)
}

export function getMiddleModel<S, A extends string>(namespace: Namespace): Model<S, A> {
  return middle.get(namespace)!
}

export function getNamespaces() {
  return Array.from(middle.keys())
}