import { authKey } from "@/constants/common";
import useAuth from "@/hooks/useAuth";
import { logOutUser } from "@/redux/features/auth/authSlice";
import { removeOrderDetails } from "@/redux/features/order/orderDetails/orderDetailsSlice";
import { deleteCookies } from "@/services/deleteCookies";
import { removeFromLocalStorage } from "@/utils/localStorage";
import { useDispatch } from "react-redux";

export const useLogOut = () => {
  const { logOut } = useAuth();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await logOut();
    dispatch(logOutUser());
    dispatch(removeOrderDetails());
    removeFromLocalStorage(authKey.ACCESS_TOKEN);
    await deleteCookies(authKey.REFRESH_TOKEN);
  };

  return handleLogOut;
};
