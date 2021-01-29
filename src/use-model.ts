import { useEffect, useRef } from "react"
import { getMiddleModel, getNamespaces } from "./create-model"
import { Namespace, Subscriber, Dispatch, GetState, FlatModel, LoadingFunction } from "./types"
import useUpdate from "./use-update"

/** 唯一的值 */
const symbol = Symbol()

type ModelWithSymbol<S, A extends string> = FlatModel<S, A> & { 
  [symbol]: Set<Subscriber>
}

/** 最终的值都在这 */
const map = new Map<Namespace, FlatModel<any, any>>()

function useModel<S, A extends string>(namespace: Namespace, deps?: Namespace[]) {
  const updateSelf = useUpdate()

  const model = useRef<ModelWithSymbol<S, A>>(map.get(namespace))

  if(!model.current) {

    /** 通知其他的订阅更新 */
    const notifyUpdate = () => {
      const subscribers = model.current[symbol]
      const namespaces = getNamespaces()
      subscribers.forEach(({ deps, update }) => {
        if (!deps || namespaces.some((key) => deps.includes(key))) {
          update()
        }
      });
    }

    /** 获取其他model的state */
    const getState: GetState = (name) => {
      return map.get(name)
    }

    /** 修改自身的state */
    const dispatch: Dispatch<S> = (payload) => {
      model.current = Object.assign(
        model.current, 
        typeof payload === 'function' ? payload(map.get(namespace)) : payload
      )
      notifyUpdate()
    }

    const { state, actions } = getMiddleModel<S, A>(namespace)
    const mixin = Object.entries({ ...state, ...actions })
      .reduce<FlatModel<S, A>>((res, [key, value]) => {
        if(typeof value === 'function') {
          return {
            ...res,
            [key]: () => {
              const res: Promise<any> | void = value(map.get(namespace), { dispatch, getState })
              if(!res || typeof res.then !== 'function') return
              // 异步逻辑
              const self = map.get(namespace)[key] as LoadingFunction
              self.loading = true
              notifyUpdate()

              res.finally(() => {
                self.loading = false
                notifyUpdate()
              })
            }
          }
        }
        return {
          ...res,
          [key]: value
        }
      }, {} as FlatModel<S, A>)

    const _proto_ = Object.create({ [symbol]: new Set() })
    const result = Object.assign<ModelWithSymbol<S, A>, FlatModel<S, A>>(_proto_, mixin)

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
