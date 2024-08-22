export function isAuthenticationError(statusCode: number): boolean {
    return [401, 403].includes(statusCode);
}