import {
  ChildrenProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import useIsMounted from '@/common/hooks/useIsMounted';
import useToaster from '@/common/hooks/useToaster';
import useToken from '@/common/hooks/useToken';
import { PATH_AUTH, PATH_DASHBOARD } from '@/common/routes/path';
import {
  useLazyGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
} from '@/features/auth/api';

type FetchUserParam = 'current' | 'force';

interface IAuthContext {
  login?: (
    { username, password }: AuthFeature.LoginParam,
    errorHandler?: (err: unknown) => void,
  ) => void;
  register?: (
    { username, password, fullName }: AuthFeature.RegisterParam,
    errorHandler?: (err: unknown) => void,
  ) => void;
  logout?: () => void;
  fetchUserFromAccessToken?: (type: FetchUserParam) => void;
  isFetchingUser: boolean;
  isAuthenticated: boolean | null;
  user: Models.User | null;
  isMounted: boolean;
}

const AuthContext = createContext<IAuthContext>({
  login: () => {},
  register: () => {},
  logout: () => {},
  fetchUserFromAccessToken: () => {},
  isFetchingUser: true,
  isAuthenticated: null,
  user: null,
  isMounted: false,
});

export function AuthContextProvider({ children }: ChildrenProps) {
  const toaster = useToaster();
  const router = useRouter();
  const isMounted = useIsMounted();
  const [user, setUser] = useState<Models.User | null>(null);
  const [signInUser] = useLoginMutation();
  const [signUpUser] = useRegisterMutation();
  const {
    getAccessToken,
    removeAccessToken,
    setAccessToken,
    forceGetAccessToken,
  } = useToken();
  const [fetchUserData, { isLoading: isFetchingUser }] = useLazyGetUserQuery();

  const fetchUserFromAccessToken = useCallback(
    (type: FetchUserParam) => {
      let getter;

      if (type === 'force') getter = forceGetAccessToken;
      else if (type === 'current') getter = getAccessToken;
      else throw Error("invalid type, only 'force' and 'current' available");

      if (getter()) {
        fetchUserData({ accessToken: getter() })
          .unwrap()
          .then((resp) => {
            if (resp) {
              setUser(resp);
            }
          });
      } else {
        setUser(null);
      }
    },
    [getAccessToken, forceGetAccessToken, fetchUserData],
  );

  useEffect(() => {
    if (!isMounted) return;
    fetchUserFromAccessToken('current');
  }, [fetchUserFromAccessToken, isMounted]);

  const login = useCallback(
    (
      { username, password }: AuthFeature.LoginParam,
      errorHandler?: (err: unknown) => void,
    ) => {
      signInUser({ payload: { username, password } })
        .unwrap()
        .then((resp) => {
          if (resp) {
            setAccessToken(resp.token);
            fetchUserFromAccessToken('current');
            router.push(PATH_DASHBOARD.root);
          }
        })
        .catch(errorHandler);
    },
    [signInUser, setAccessToken, fetchUserFromAccessToken, router],
  );

  const register = useCallback(
    (
      { username, password, fullName }: AuthFeature.RegisterParam,
      errorHandler?: (err: unknown) => void,
    ) => {
      signUpUser({
        payload: {
          username,
          password,
          fullName,
        },
      })
        .unwrap()
        .then(() => {
          toaster.launch({
            color: 'success',
            message: 'You have been registered successfully',
            duration: 5000,
          });
          router.push(PATH_AUTH.login);
        })
        .catch(errorHandler);
    },
    [signUpUser, router, toaster],
  );

  const logout = useCallback(async () => {
    await router.push(PATH_DASHBOARD.root);
    removeAccessToken();
    fetchUserFromAccessToken('current');
  }, [removeAccessToken, fetchUserFromAccessToken, router]);

  const authContextProviderValue = useMemo(
    () => ({
      ...(isMounted && {
        login,
        register,
        logout,
      }),
      fetchUserFromAccessToken,
      isFetchingUser,
      isAuthenticated: Boolean(user),
      user,
      isMounted,
    }),
    [
      login,
      register,
      logout,
      fetchUserFromAccessToken,
      isFetchingUser,
      user,
      isMounted,
    ],
  );

  return (
    <AuthContext.Provider value={authContextProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
