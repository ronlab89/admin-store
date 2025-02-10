const formatterco = new Intl.NumberFormat("es", {
  style: "currency",
  currency: "COP",
});

const formatterus = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
});

export { formatterco, formatterus };
