import { useCallback, useState } from 'react';

interface UseFormOptions {
  initialValues: Record<string, any>;
  validate?: (values: Record<string, any>) => Record<string, string | null>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
}

export function useForm({ initialValues, validate, onSubmit }: UseFormOptions) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const setFieldError = useCallback((name: string, error: string | null) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    const validationErrors = validate(values);
    setErrors(validationErrors);
    
    return Object.values(validationErrors).every(error => !error);
  }, [values, validate]);

  const handleSubmit = useCallback(async (e?: any) => {
    if (e) e.preventDefault();
    
    setTouched(
      Object.keys(initialValues).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, initialValues]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const getFieldProps = useCallback((name: string) => ({
    value: values[name] || '',
    onChangeText: (text: string) => setValue(name, text),
    onBlur: () => setFieldTouched(name),
    error: touched[name] ? errors[name] : null,
  }), [values, errors, touched, setValue, setFieldTouched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    setFieldError,
    validateForm,
    handleSubmit,
    reset,
    getFieldProps,
  };
}
