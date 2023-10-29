import { handicaps } from 'src/app/core/services/lbok.service';

export const phoneFormatted = (inputPhone: string | undefined): string =>
  inputPhone
    ? '<span class="contact-label">tel.:</span>' +
      inputPhone
        .split(',')
        .map(phone => phone.trim())
        .filter(phone => phone)
        .map(phone => `<a href="tel:${phone.replace(/[^\d]/g, '')}">${phone}</a>`)
        .join(', ')
    : '';

export const generateHandicaps = (flags: string[], apiUrl: string): string => {
  const handicapsHtml = flags
    .filter(flag => handicaps.some(data => data.name === flag))
    .map(flag => {
      const { src, alt, title } = handicaps.find(data => data.name === flag) ?? {};
      return `<img src="${apiUrl}/assets/${src}" class="handicap-icon" alt="${alt}" title="${title}">`;
    })
    .join('');

  return handicapsHtml
    ? `<p class="lbok-info-title">Udogodnienia dla osób z niepełnosprawnościami</p>${handicapsHtml}`
    : '';
};
