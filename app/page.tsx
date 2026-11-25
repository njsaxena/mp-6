import { auth, signIn, signOut } from "@/auth";

export const instant = false;
export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8">

          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Profile
          </h1>

          {!user ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-6">
                  Sign in to view your Google account information.
                </p>

                <form
                    action={async () => {
                      "use server";
                      await signIn("google");
                    }}
                >
                  <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700">
                    Sign in with Google
                  </button>
                </form>
              </div>
          ) : (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  {user.image && (
                      <img
                          src={user.image}
                          alt="Profile"
                          className="w-16 h-16 rounded-full"
                      />
                  )}

                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {user.name || "Google User"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {user.email || "No email available"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">
                      {user.name || "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {user.email || "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Provider</p>
                    <p className="font-medium">Google</p>
                  </div>
                </div>

                <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                >
                  <button className="w-full mt-8 border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
                    Sign out
                  </button>
                </form>
              </div>
          )}

        </div>
      </main>
  );
}
