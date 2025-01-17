export interface TeamMember {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  fullName: string;
  avatarUrl?: string;
}

export interface ContentPermission {
  userId: string;
  contentId: string;
  permission: 'view' | 'edit' | 'approve';
}

export interface Comment {
  id: string;
  contentId: string;
  userId: string;
  text: string;
  createdAt: string;
  resolved: boolean;
}