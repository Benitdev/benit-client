import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';
import authApi from '@/apis/server-side/auth.api';

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authApi.getUser().catch(() => {});

  return (
    <>
      <Header user={user} />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
