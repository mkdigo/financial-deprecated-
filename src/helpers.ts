export function getToken(): string | null {
  return localStorage.getItem('access_token');
}

export function setToken(token: string | undefined): void {
  localStorage.setItem('access_token', token ? token : '');
}

export function removeToken(): void {
  localStorage.removeItem('access_token');
}
