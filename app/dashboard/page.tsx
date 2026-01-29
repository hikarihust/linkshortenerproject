import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserLinks } from '@/data/links';
import { CreateLinkDialog } from '@/components/CreateLinkDialog';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }

  const userLinks = await getUserLinks(userId);
  
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <CreateLinkDialog />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Links</h2>
          
          {userLinks.length === 0 ? (
            <p className="text-muted-foreground">No links yet. Create your first shortened link!</p>
          ) : (
            <ul className="space-y-4">
              {userLinks.map((link) => (
                <li 
                  key={link.id} 
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-semibold">
                        /{link.shortCode}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.originalUrl}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
