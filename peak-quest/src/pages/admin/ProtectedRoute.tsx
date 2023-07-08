import React, { ReactNode, useEffect } from "react";
import { onAdminStateChanged } from "../../service/firebase";
import { useService } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requireAdmin,
}: {
  children: ReactNode;
  requireAdmin: boolean;
}) {
  const { admin, setAdmin } = useService();

  const nav = useNavigate();

  console.log(admin);

  useEffect(() => {
    console.log(admin);
    onAdminStateChanged(setAdmin);
  }, []);

  if (!admin || (requireAdmin && !admin.isAdmin)) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="text-3xl">권한이 없습니다</div>
        <button
          className="w-40 bg-gray mt-8 p-3 rounded-xl hover:bg-darkGray hover:text-white"
          onClick={() => nav("/")}
        >
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return children;
}
