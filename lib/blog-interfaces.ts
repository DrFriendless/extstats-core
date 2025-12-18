export interface BlogComment {
    id: number;
    post_url: string;
    poster: string;
    comment: string;
    date: Date;
    reply_to?: number;
    deleted?: boolean;
}