

  export const fmtMoney = (v) =>
    new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" }).format(Number.isFinite(v) ? v : 0);

  export const fmtMoneyPreciso = (v) =>
    new Intl.NumberFormat("es-SV", {
      style: "currency", currency: "USD", minimumFractionDigits: 3, maximumFractionDigits: 3,
    }).format(Number.isFinite(v) ? v : 0);

  export const fmtPct = (v) =>
    new Intl.NumberFormat("es-SV", { maximumFractionDigits: 1 }).format(Number.isFinite(v) ? v : 0) + "%";
