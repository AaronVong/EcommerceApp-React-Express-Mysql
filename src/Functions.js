export function stringToMoney (str = "") {
  const money = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "VND",
  }).format(str);
  return money;
};