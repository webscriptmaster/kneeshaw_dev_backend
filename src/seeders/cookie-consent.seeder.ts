import defaultConfig from "../config/default.config";
import { CookieConsent } from "../models/cookie-consent.model";

export default async function seedCookieConsent() {
  await CookieConsent.deleteMany({});

  const consents = [
    {
      description: `We use essential cookies to make our site work. With your consent, we may also use non-essential cookies to improve user experience and analyze website traffic. By clicking "Accept", you agree to our website's cookie use as described in our <a class="text-[#AFD275]" href="${defaultConfig.app.userPortal}/cookies" target="_blank">Cookie</a>.`,
      acceptLabel: "Accept",
      declineLabel: "Decline",
      position: "bottom",
      creatorId: null,
      modifierId: null
    }
  ];

  await CookieConsent.insertMany(consents);
}
