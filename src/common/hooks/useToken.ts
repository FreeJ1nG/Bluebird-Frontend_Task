import { useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import useIsMounted from '@/common/hooks/useIsMounted';
import { PATH_AUTH } from '@/common/routes/path';
import { extractJWTPayload } from '@/common/utils/helpers';

const ACCESS_TOKEN_KEY = 'access-token';

interface UseTokenFeatures {
  getAccessToken: () => string | undefined;
  forceGetAccessToken: () => string;
  setAccessToken: (newAccessToken: string) => void;
  removeAccessToken: () => void;
}

export default function useToken(): UseTokenFeatures {
  const isMounted = useIsMounted();
  const router = useRouter();
  const getAccessToken = useCallback(() => Cookies.get(ACCESS_TOKEN_KEY), []);

  const setAccessToken = useCallback((newAccessToken: string) => {
    const payload = extractJWTPayload(newAccessToken);
    const expires = new Date(payload.exp * 1000);
    Cookies.set(ACCESS_TOKEN_KEY, newAccessToken, { expires });
  }, []);

  const forceGetAccessToken = useCallback(() => {
    if (!isMounted) return '';
    if (Cookies.get(ACCESS_TOKEN_KEY))
      return Cookies.get(ACCESS_TOKEN_KEY) as string;
    router.push(PATH_AUTH.login);
    return '';
  }, [router, isMounted]);

  const removeAccessToken = useCallback(() => {
    Cookies.remove(ACCESS_TOKEN_KEY);
  }, []);

  return useMemo(
    () => ({
      getAccessToken,
      forceGetAccessToken,
      setAccessToken,
      removeAccessToken,
    }),
    [getAccessToken, forceGetAccessToken, setAccessToken, removeAccessToken],
  );
}
