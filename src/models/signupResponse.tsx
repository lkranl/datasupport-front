export type SignupResponse = {
    id: number,
    fullName: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    enabled: boolean,
    accountNonExpired: boolean,
    username: string,
    authorities: string[],
    accountNonLocked: boolean,
    credentialsNonExpired: boolean
} | null