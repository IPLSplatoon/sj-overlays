export interface CentralSSOLinkResponse {
    url: string
}

export interface CentralSSOLoginResponse {
    session: string
    expires_in: number
    token_type: string
}

interface CentralJwtPayload {
    discord: {
        id: string
        avatar: string
        global_name: string
        banner: string
    }
    central: {
        session_id: string
        ip: string | null
        dnip: boolean
        username: string
    }
}

export interface CentralSearchResponse {
    pages: number
    pagination_id: string
    results: CentralSearchItem[]
    results_count: number
}

export interface CentralSearchItem {
    former_names: string[]
    icon: string
    id: string
    name: string
}

export interface CentralMatchupsResponse {
    tournaments: {
        id: string
        name: string
        stages: {
            id: string
            name: string
            matches: {
                id: string
                alpha_id: string
                bravo_id: string
                alpha_name: string
                bravo_name: string
                alpha_win: number
                bravo_win: number
                ties: number
            }[]
        }[]
    }[]
}
