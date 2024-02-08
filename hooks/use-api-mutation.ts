import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = async (payload: any) => {
    setPending(true);
    try {
      let res;
      try {
        res = await apiMutation(payload);
      } finally {
        setPending(false);
      }
      return res;
    } catch (err) {
      throw err;
    }
  };
  return { mutate, pending };
};
