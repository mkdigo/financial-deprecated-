export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

export function setToken(token: string | undefined): void {
  localStorage.setItem('access_token', token ? token : '');
}

export function removeToken(): void {
  localStorage.removeItem('access_token');
}

export function makeInteger(value: string): string {
  return String(value).replace(/\D/g, '');
}

export function numberFormat(value: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(value);
}

export function today() {
  const fullDate = new Date();
  const day =
    fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate();

  const month =
    fullDate.getMonth() + 1 < 10
      ? '0' + (fullDate.getMonth() + 1)
      : fullDate.getMonth() + 1;

  const year = fullDate.getFullYear();

  return year + '-' + month + '-' + day;
}
