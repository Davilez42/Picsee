import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
function FormsView() {
  return (
    <>
      <GoogleOAuthProvider clientId="126393557652-10jkor8qq6s4h196vtbktkco4j343vdu.apps.googleusercontent.com">
        <div className="container-forms">
          <Outlet />
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default FormsView;
