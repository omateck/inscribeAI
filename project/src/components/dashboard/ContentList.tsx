import React from 'react';
import { useContent } from '../../hooks/useContent';
import { Edit2, Trash2 } from 'lucide-react';

interface ContentListProps {
  userId: string;
  onEdit: (id: string) => void;
}

export default function ContentList({ userId, onEdit }: ContentListProps) {
  const { getUserContent } = useContent();
  const [content, setContent] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await getUserContent(userId);
        setContent(data || []);
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [userId, getUserContent]);

  if (loading) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flow-root">
          <ul className="-my-5 divide-y divide-gray-200">
            {content.map((item) => (
              <li key={item.id} className="py-5">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <button
                      onClick={() => onEdit(item.id)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.content}
                  </p>
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {item.type}
                  </span>
                  {item.keywords?.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}