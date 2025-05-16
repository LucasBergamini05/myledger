import { useFormContext } from 'react-hook-form';

import { Button, ButtonProps } from './button';

type SubmitButtonProps = Omit<ButtonProps, 'loading' | 'type'>;

export const SubmitButton = (props: SubmitButtonProps) => {
  const form = useFormContext();

  if (!form) throw 'SubmitButton should be within a React Hook Form Provider';

  const { formState } = form;

  return <Button {...props} loading={formState.isSubmitting} type="submit" />;
};
