import { useCallback, useState } from "react";

function useUpdate() {
  const [, update] = useState(true)

  return useCallback(() => {
    update((r => !r))
  }, [])
}

export default useUpdate