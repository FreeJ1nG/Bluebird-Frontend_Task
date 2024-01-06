import { ReactNode } from 'react';

import { Stack, StackProps } from '@/common/components/atoms';

export interface ClickableCardProps {
  stackProps?: StackProps;
  children: ReactNode;
}

export default function ClickableCard({
  stackProps: {
    boxShadow = 6,
    width = 200,
    borderRadius = 1,
    p = 2.5,
    sx,
    ...otherStackProps
  } = {},
  children,
}: ClickableCardProps) {
  return (
    <Stack
      alignItems="center"
      boxShadow={boxShadow}
      p={p}
      borderRadius={borderRadius}
      width={width}
      sx={{
        transition: 'all',
        transitionDuration: '300ms',
        ...sx,
      }}
      {...otherStackProps}
    >
      {children}
    </Stack>
  );
}
