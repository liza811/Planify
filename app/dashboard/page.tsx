import { currentUser } from "@/lib/current-user";

const DashboardPage = async () => {
  // const session = await auth();
  const user = await currentUser();
  return (
    <main className="flex h-screen overflow-hidden flex-col items-center bg-[#F5F6FA]">
      {/* {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">signOut</button>
      </form> */}
      {user?.email}
      {user?.id}
      {user?.image}
      {user?.name}
      <br />
      {user?.departementId}
    </main>
  );
};

export default DashboardPage;
