
export interface updateProfileDto {
    first_name?: string;
    last_name?: string;
}

export interface updateDto {
    reset_token_hash?: string
    reset_token_expiry?: Date
    password?: string
}