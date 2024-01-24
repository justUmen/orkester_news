import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// CUSTOM HOOKS, to simplify usage
import { setValueUsername } from "./features/usernameSlice";
import { setValueTotalSearch } from "./features/totalSearchSlice";

// Username GET/SET
export const useSetUsernameValue = () => {
  const dispatch = useAppDispatch();
  const setUsernameValue = (value: string) => {
    dispatch(setValueUsername(value));
  };
  return setUsernameValue;
};
export const useGetUsernameValue = () => {
  const usernameValue = useAppSelector((state) => state.usernameReducer.value);
  return usernameValue;
};

// TotalSearch GET/SET
export const useSetTotalSearchValue = () => {
  const dispatch = useAppDispatch();
  const setTotalSearchValue = (value: number) => {
    dispatch(setValueTotalSearch(value));
  };
  return setTotalSearchValue;
};
export const useGetTotalSearchValue = () => {
  const totalSearchValue = useAppSelector((state) => state.totalSearchReducer.value);
  return totalSearchValue;
};
