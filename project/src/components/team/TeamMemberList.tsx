import React from 'react';
import { UserPlus, MoreVertical } from 'lucide-react';
import type { TeamMember } from '../../lib/types/team';

interface TeamMemberListProps {
  members: TeamMember[];
  onInvite: () => void;
  onUpdateRole: (memberId: string, role: TeamMember['role']) => void;
}

export default function TeamMemberList({ members, onInvite, onUpdateRole }: TeamMemberListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Team Members</h2>
          <button
            onClick={onInvite}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite Member
          </button>
        </div>

        <ul className="divide-y divide-gray-200">
          {members.map((member) => (
            <li key={member.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={member.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.fullName)}`}
                  alt={member.fullName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{member.fullName}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={member.role}
                  onChange={(e) => onUpdateRole(member.id, e.target.value as TeamMember['role'])}
                  className="text-sm border-gray-300 rounded-md"
                >
                  <option value="viewer">Viewer</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}