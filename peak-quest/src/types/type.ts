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
  state: boolean;
  type: string;
  date: string;
  content: string;
  link: string;
  delete?: string;
  uid?: string;
}

export interface userData {
  name: string;
  role: string;
  email: string;
  state: string;
  ban: {
    ban_type: string;
    ban_content: string;
    ban_start_date: string;
    ban_end_date: string;
  };
  delete: {
    delete_state: string;
    delete_content: string;
    deleted_at: string;
  };
}

export interface banner {
  id: string;
  url: string;
  link: string;
  tags: string;
  title: string;
}
