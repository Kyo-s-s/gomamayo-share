export const ok = <T>(data: T) => ({ ok: true, data } as const)
export const err = (error: string) => ({ ok: false, error } as const)
