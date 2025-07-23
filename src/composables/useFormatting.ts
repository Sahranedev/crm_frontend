export function useFormatting() {
  const formatCurrency = (
    amount: number,
    currency = "EUR",
    locale = "fr-FR"
  ) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(amount);
  };

  const formatDate = (
    date: Date | string,
    options?: Intl.DateTimeFormatOptions
  ) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    return new Intl.DateTimeFormat("fr-FR", {
      ...defaultOptions,
      ...options,
    }).format(new Date(date));
  };

  const formatDateTime = (date: Date | string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return cleaned.replace(
        /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        "+33 $1 $2 $3 $4 $5"
      );
    }
    return phone;
  };

  return {
    formatCurrency,
    formatDate,
    formatDateTime,
    formatPercentage,
    formatPhoneNumber,
  };
}
