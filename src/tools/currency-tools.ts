const formatter = new Intl.NumberFormat("es-CO", {
  style: "decimal",
  currency: "COP",
  maximumFractionDigits: 0,
});

const CurrencyTools = {
  format(amount: number) {
    const currency = formatter.format(amount);

    return `$${currency}`;
  },
};

export default CurrencyTools;
