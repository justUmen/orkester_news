import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// CUSTOM HOOKS, to simplify usage
import { setValueUsername } from "./features/usernameSlice";

// Set username value
export const useSetUsernameValue = () => {
  const dispatch = useAppDispatch();

  const setUsernameValue = (value: string) => {
    dispatch(setValueUsername(value));
  };

  return setUsernameValue;
};

// Get username value
export const useGetUsernameValue = () => {
  const usernameValue = useAppSelector((state) => state.usernameReducer.value);
  return usernameValue;
};
