import { Navigate } from "react-router-dom";
import MainPage from "../../pages/MainPage";
import UserPage from "../../pages/UserPage";
import { IUser } from "../../../models";


const routes = (isLoggedIn: IUser | null, location:any) => {
  const userId = location.pathname.split("/")[1];
  console.log('userId:', userId)
  console.log('isLoggedIn?.id:', isLoggedIn?.id===userId)

  return [
    {
      name: "Главная страница",
      path: "",
      element: <MainPage />,
    },
    {
      name: "Страница пользователя",
      path: ":userId",
      element: isLoggedIn?.id === userId ? <UserPage /> : <Navigate to="/" />,
    },

  ];
};

export default routes;
