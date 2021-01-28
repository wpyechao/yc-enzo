import { useEffect, useRef } from "react"
import { getMiddleModel, getNamespaces } from "./create-model"
import { Model, Namespace, Subscriber, Dispatch, GetState } from "./types"
import useUpdate from "./use-update"

/** 唯一的值 */
const symbol = Symbol()

const map = new Map<Namespace, Model<any, any>>()

type ModelWithSymbol<S, A extends string> = Model<S, A> & { [symbol]: Set<Subscriber> }

function useModel<S, A extends string>(namespace: Namespace, deps?: Namespace[]) {
  const updateSelf = useUpdate()

  const model = useRef<ModelWithSymbol<S, A>>(map.get(namespace))

  if(!model.current) {
    const getState: GetState<S, A> = (name) => {
      return map.get(name)
    }

    const dispatch: Dispatch<S> = (payload) => {
      model.current = Object.assign(
        model.current, 
        typeof payload === 'function' ? payload(map.get(namespace)) : payload
      )

      const subscribers = model.current[symbol]
      const namespaces = getNamespaces()
      subscribers.forEach(({ deps, update }) => {
        if (!deps || namespaces.some((key) => deps.includes(key))) {
          update()
        }
      });
    }

    const { state, actions } = getMiddleModel<S, A>(namespace)
    const mixin = Object.entries({ ...state, ...actions })
      .reduce<Model<S, A>>((res, [key, value]) => {
        if(typeof value === 'function') {
          return {
            ...res,
            [key]: () => {
              value(map.get(namespace), { dispatch, getState })
            }
          }
        }
        return {
          ...res,
          [key]: value
        }
      }, {} as Model<S, A>)
    const _proto_ = Object.create({ [symbol]: new Set() })
    const result = Object.assign<ModelWithSymbol<S, A>, Model<S, A>>(_proto_, mixin)

    model.current = result
    map.set(namespace, result)
  }

  useEffect(() => {
    if (deps && deps.length === 0) return;

    const subscribers = model.current[symbol]

    const subscriber = { 
      deps, 
      update: updateSelf 
    }

    subscribers.add(subscriber)

    return () => {
      subscribers.delete(subscriber)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return model.current
}

export default useModel