import { personnelApi } from "@/apis/personnel.api";
import type { Personnel } from "@/types";
import { useCallback, useEffect, useState } from "react";

type State = {
  data: Personnel[];
  loading: boolean;
  error: string | null;
};

export const usePersonnelList = () => {
  const [state, setState] = useState<State>({
    data: [],
    loading: true,
    error: null,
  });

  const fetchList = useCallback(
    async (currentPage = 1, currentLimit = 40) => {
      try {
        const result = await personnelApi.getList(currentPage, currentLimit);
        setState({ data: result, loading: false, error: null });
      } catch (err) {
        setState({
          data: [],
          loading: false,
          error: err instanceof Error ? err.message : "An error occurred",
        });
      }
    },
    []
  );

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return { ...state, refetch: fetchList, setState };
};
