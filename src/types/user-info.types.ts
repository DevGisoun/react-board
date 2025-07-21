export interface UserInfo {
    user_id: string; // Supabase Auth User Id (uuid)
    nickname: string;
    avatar: string | null;
    industry: string;
    job: string;
    country: string;
    region: string;
    introduction: string;
    service_terms: string;
    privacy_policy: string;
    marketing_consent: string | null;
}
