export function getSubscribersWord(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'подписчиков';
  }

  if (lastDigit === 1) {
    return 'подписчик';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'подписчика';
  }

  return 'подписчиков';
}