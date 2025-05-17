'use client';

import {
  FieldValues,
  FormProvider,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  useFormContext,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';

import { cn } from '@/utils/string';

interface FormProps<FormSchema extends FieldValues> {
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<FormSchema>;
  onError?: SubmitErrorHandler<FormSchema>;
  onSubmit: SubmitHandler<FormSchema>;
}

/**
 * Form component that wraps react-hook-form and provides a context for form state management.
 */
export const Form = <FormSchema extends FieldValues>({
  form,
  onError,
  onSubmit,
  ...props
}: FormProps<FormSchema>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit, onError)}
      {...props}
      className={cn('flex w-full max-w-xl flex-col gap-4', props.className)}
    />
  </FormProvider>
);

////////////////////////////////////////////////////////////////////////////////////////////////////

interface FormFieldControllerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  render: (
    field: UseFormRegisterReturn<string>,
    fieldState: ReturnType<UseFormGetFieldState<TFieldValues>>
  ) => React.ReactNode;
}

/**
 * FormFieldController component that provides a controlled input field
 * with validation and error handling using react-hook-form.
 */
export const FormFieldController = <TFieldValues extends FieldValues>({
  name,
  render,
}: FormFieldControllerProps<TFieldValues>) => {
  const { formState, getFieldState, register } = useFormContext();

  const field = register(name);
  const fieldState = getFieldState(name, formState);

  return render(field, fieldState);
};

////////////////////////////////////////////////////////////////////////////////////////////////////

interface FormFieldProps<TFieldValues extends FieldValues> {
  className?: string;
  label?: React.ReactNode;
  name: Path<TFieldValues>;
  render: (field: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode;
}

/**
 * FormField component that uses FormFieldController to render a controlled input field
 * with validation and error handling.
 *
 * @param Element - The input element to render (e.g., Input, Select).
 * @param label - The label for the input field.
 * @param name - The name of the field in the form.
 */
export const FormField = <TFieldValues extends FieldValues>({
  className,
  label,
  name,
  render,
}: FormFieldProps<TFieldValues>) => (
  <FormFieldController<TFieldValues>
    name={name}
    render={(field, fieldState) => (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && <Label htmlFor={field.name}>{label}</Label>}

        {render({
          ...field,
          'aria-describedby': field.name,
          'aria-invalid': !!fieldState.error,
          id: field.name,
        })}

        {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
      </div>
    )}
  />
);

////////////////////////////////////////////////////////////////////////////////////////////////////

export type TFormField<TFieldValues extends FieldValues> = {
  className?: string;
  label: string;
  name: Path<TFieldValues>;
  placeholder?: string;
  type?: 'email' | 'password' | 'text';
};

interface FormFieldRenderProps<TFieldValues extends FieldValues> {
  fields: TFormField<TFieldValues>[];
}

/**
 * Component that renders multiples FormFields
 * @param fields Field list
 */
export const FormFieldRender = <TFieldValues extends FieldValues>({
  fields,
}: FormFieldRenderProps<TFieldValues>) =>
  fields.map((field) => (
    <FormField
      className={cn('mb-4', field.className)}
      key={field.name}
      label={field.label}
      name={field.name}
      render={(inputProps) => (
        <Input {...inputProps} placeholder={field.placeholder} type={field.type} />
      )}
    />
  ));

////////////////////////////////////////////////////////////////////////////////////////////////////

// UI Components

export const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label {...props} className={cn('text-sm flex flex-col gap-1', props.className)} />
);

export const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={cn(
      'w-full rounded-md border-2 border-zinc-800 p-2 transition-all focus:border-blue-500 focus:outline-none',
      props.className
    )}
  />
);

export const FormMessage = (props: React.LabelHTMLAttributes<HTMLSpanElement>) => (
  <span {...props} className={cn('text-sm text-red-700', props.className)} />
);
