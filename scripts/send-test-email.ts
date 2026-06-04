import { sendConfirmationEmail, sendAdminNotification } from "@/lib/email";

const testData = {
  customerName:   "Jean Test",
  customerEmail:  "mfortier.prophy@gmail.com",
  customerPhone:  "+590 690 49 58 48",
  excursionTitle: "Croisière Grand Cul de Sac Marin",
  excursionSlug:  "grand-cul-de-sac-marin",
  date:           new Date(Date.now() + 7 * 86_400_000).toISOString().split("T")[0],
  adults:         2,
  children:       1,
  infants:        0,
  totalPrice:     245,
  depositAmount:  73.50,
  paymentType:    "deposit",
  notes:          "Allergie aux crustacés pour 1 adulte",
};

async function main() {
  const [conf, notif] = await Promise.allSettled([
    sendConfirmationEmail(testData),
    sendAdminNotification(testData),
  ]);
  console.log("Confirmation client:", conf.status === "fulfilled" ? "✅ envoyé" : `❌ ${(conf as PromiseRejectedResult).reason}`);
  console.log("Notification admin :", notif.status === "fulfilled" ? "✅ envoyé" : `❌ ${(notif as PromiseRejectedResult).reason}`);
}
main();
