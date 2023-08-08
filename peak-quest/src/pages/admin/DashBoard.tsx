import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../../context/ContextProvider";
import { adminLogOut } from "../../service/firebase";

export default function DashBoard() {
  const { admin } = useService();

  return (
    <>
      {admin && (
        <div className="m-auto">
          <img className="mt-5" src="/images/test_img.png" alt="" />
        </div>
      )}
    </>
  );
}
