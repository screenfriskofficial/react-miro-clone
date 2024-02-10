import { useState } from "react"
import { useMutation } from "convex/react"

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false)
  const apiMutation = useMutation(mutationFunction)

  const mutate = async (payload: any) => {
    setPending(true)
    try {
      let result
      try {
        result = await apiMutation(payload)
      } finally {
        setPending(false)
      }
      return result
    } catch (error) {
      throw error
    }
  }

  return {
    mutate,
    pending,
  }
}
