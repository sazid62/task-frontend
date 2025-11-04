import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearUser } from "@/store/userSlice";
import { auth } from "@/lib/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await auth.logout();
    dispatch(clearUser());
    router.push("/login");
  };

  return (
    <nav className="border-b p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex gap-4">
          <Link href="/products">Products</Link>
          <Link href="/products/create">Add Product</Link>
        </div>
        <div className="flex gap-4 items-center">
          <span>{user.fullName}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
