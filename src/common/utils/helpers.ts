import { JWTPayload } from '@/common/contexts/authContext/types';

export function extractJWTPayload(token: string): JWTPayload {
  const tokenSplit = token.split('.');
  if (tokenSplit.length !== 3)
    throw Error(
      'invalid token format, should contain 3 dot seperated segments',
    );
  const payload = tokenSplit[1];
  return JSON.parse(atob(payload));
}
