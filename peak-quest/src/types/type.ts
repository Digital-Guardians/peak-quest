export interface bannerData {
  id: string;
  url: string;
  link: string;
  tags?: string;
  content: string;
  title: string;
  tag: string;
  date1: string;
  date2: string;
}

export interface reportData {
  id: number;
  name: string;
  state: string;
  type: string;
  date: string;
  content: string;
  link: string;
  delete?: string;
}

export interface userData {
  user_name: string;
  role: string;
  email: string;
  state: string;
  ban: {
    ban_type: string | null;
    ban_content: string | null;
    ban_start_date: string | null;
    ban_end_date: string | null;
  };
  delete: {
    delete_state: string;
    delete_content: string;
    deleted_at: string | null;
  };
}
