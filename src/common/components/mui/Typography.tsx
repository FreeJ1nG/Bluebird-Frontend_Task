import MUITypography, {
  TypographyProps as MUITypographyProps,
} from '@mui/material/Typography';

export type TypographyProps = MUITypographyProps;

export default function Typography({ ...other }: TypographyProps) {
  return <MUITypography {...other} />;
}
