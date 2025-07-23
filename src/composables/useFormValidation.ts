import { ref, computed } from "vue";

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

export function useFormValidation<T extends Record<string, any>>(
  form: T,
  rules: ValidationRules
) {
  const errors = ref<Record<string, string>>({});
  const touched = ref<Record<string, boolean>>({});

  const isValid = computed(() => Object.keys(errors.value).length === 0);

  const validateField = (field: keyof T, value: any): string | null => {
    const rule = rules[field as string];
    if (!rule) return null;

    if (
      rule.required &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      return "Ce champ est requis";
    }

    if (!value) return null;

    if (
      rule.minLength &&
      typeof value === "string" &&
      value.length < rule.minLength
    ) {
      return `Minimum ${rule.minLength} caractères requis`;
    }

    if (
      rule.maxLength &&
      typeof value === "string" &&
      value.length > rule.maxLength
    ) {
      return `Maximum ${rule.maxLength} caractères autorisés`;
    }

    if (
      rule.pattern &&
      typeof value === "string" &&
      !rule.pattern.test(value)
    ) {
      return "Format invalide";
    }

    if (rule.custom) {
      return rule.custom(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(rules).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };

  const validateFieldOnBlur = (field: keyof T) => {
    touched.value[field as string] = true;
    const error = validateField(field, form[field]);
    if (error) {
      errors.value[field as string] = error;
    } else {
      delete errors.value[field as string];
    }
  };

  const clearErrors = () => {
    errors.value = {};
    touched.value = {};
  };

  const setError = (field: keyof T, message: string) => {
    errors.value[field as string] = message;
  };

  return {
    errors,
    touched,
    isValid,
    validateForm,
    validateFieldOnBlur,
    clearErrors,
    setError,
  };
}
