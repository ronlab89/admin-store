const cash = [
  {
    id: "physical-cash",
    name: "Efectivo físico",
    description: "Pagos realizados en monedas y billetes.",
  },
  {
    id: "cash-on-delivery",
    name: "Contra entrega",
    description: "Pago en efectivo al recibir el producto o servicio.",
  },
];

const cards = [
  {
    id: "credit-cards",
    name: "Tarjetas de crédito",
    description:
      "Pagos realizados con tarjetas de crédito emitidas por bancos.",
  },
  {
    id: "debit-cards",
    name: "Tarjetas de débito",
    description: "Pagos directamente desde la cuenta bancaria del cliente.",
  },
  {
    id: "prepaid-cards",
    name: "Tarjetas prepago",
    description: "Tarjetas cargadas con un saldo previo para realizar pagos.",
  },
];

const bankTransfers = [
  {
    id: "wire-transfer",
    name: "Transferencia bancaria",
    description: "Transferencia de fondos entre cuentas bancarias.",
  },
  {
    id: "interbank-transfer",
    name: "Transferencia interbancaria",
    description: "Transferencia entre cuentas de diferentes bancos.",
  },
  {
    id: "instant-transfer",
    name: "Transferencia instantánea",
    description: "Transferencias que se procesan en tiempo real.",
  },
];

const digitalWallets = [
  {
    id: "paypal",
    name: "PayPal",
    description: "Plataforma de pagos en línea ampliamente utilizada.",
  },
  {
    id: "apple-pay",
    name: "Apple Pay",
    description: "Sistema de pago móvil de Apple.",
  },
  {
    id: "google-pay",
    name: "Google Pay",
    description: "Sistema de pago móvil de Google.",
  },
  {
    id: "other-wallets",
    name: "Otras billeteras digitales",
    description: "Plataformas como Venmo, Cash App, etc.",
  },
];

const cryptocurrencies = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    description: "Criptomoneda descentralizada más popular.",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    description: "Plataforma blockchain con su propia criptomoneda (ETH).",
  },
  {
    id: "stablecoins",
    name: "Stablecoins",
    description: "Criptomonedas vinculadas a activos estables como el dólar.",
  },
];

const financing = [
  {
    id: "installments",
    name: "Pagos a plazos",
    description: "División del pago total en cuotas mensuales.",
  },
  {
    id: "deferred-payment",
    name: "Pago diferido",
    description: "Pago que se realiza después de un período determinado.",
  },
  {
    id: "buy-now-pay-later",
    name: "Compra ahora, paga después",
    description:
      "Servicios como Klarna o Afterpay que permiten pagar posteriormente.",
  },
];

const checks = [
  {
    id: "personal-checks",
    name: "Cheques personales",
    description: "Cheques emitidos por individuos para realizar pagos.",
  },
  {
    id: "business-checks",
    name: "Cheques empresariales",
    description:
      "Cheques emitidos por empresas para transacciones comerciales.",
  },
  {
    id: "certified-checks",
    name: "Cheques certificados",
    description: "Cheques garantizados por el banco emisor.",
  },
];

const couponsAndVouchers = [
  {
    id: "gift-cards",
    name: "Tarjetas de regalo",
    description: "Vales prepagados para comprar productos o servicios.",
  },
  {
    id: "discount-coupons",
    name: "Cupones de descuento",
    description: "Descuentos aplicables en compras futuras.",
  },
  {
    id: "loyalty-points",
    name: "Puntos de lealtad",
    description:
      "Programas de recompensas que se pueden canjear por productos.",
  },
];

export const paymentMethods = [
  { id: "cash", name: "Efectivo", subcategories: cash },
  { id: "cards", name: "Tarjetas", subcategories: cards },
  {
    id: "bank-transfers",
    name: "Transferencias",
    subcategories: bankTransfers,
  },
  {
    id: "digital-wallets",
    name: "Billeteras digitales",
    subcategories: digitalWallets,
  },
  {
    id: "cryptocurrencies",
    name: "Criptomonedas",
    subcategories: cryptocurrencies,
  },
  { id: "financing", name: "Financiamiento", subcategories: financing },
  { id: "checks", name: "Cheques", subcategories: checks },
  {
    id: "coupons-and-vouchers",
    name: "Cupones y vales",
    subcategories: couponsAndVouchers,
  },
  {
    id: "custom",
    name: "Personalizado",
    subcategories: [],
  },
];
