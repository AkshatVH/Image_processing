export function getEnvVar(key: string, defaultValue: string): string {
  return (import.meta.env[`VITE_${key}`] as string) || defaultValue;
}