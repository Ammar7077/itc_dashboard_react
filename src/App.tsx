import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import DataBank from "./pages/Dashboard/DataBank";
import Ai from "./pages/ais/Ai";
import Consulting from "./pages/consulting/Consulting";
import AI from "./pages/DataEntry/AI/AI";
import JSONLs from "./pages/JSONLs/JSONLs";
import Media from "./pages/Media/Media";
import Loader from "./components/common/Loader";
import DefaultLayout from "./DefaultLayout";
import Portal from "./pages/Portal/Portal";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Main Dashboard" />
              <DataBank />
            </>
          }
        />

        <Route
          path="/data/ai"
          element={
            <>
              <PageTitle title="Data of AI" />
              <Ai />
            </>
          }
        />

        <Route
          path="/data/consultings"
          element={
            <>
              <PageTitle title="Data of Consulting" />
              <Consulting />
            </>
          }
        />

        <Route
          path="/upload/admin/ai"
          element={
            <>
              <PageTitle title="Data Entry upload for AI" />
              <AI />
            </>
          }
        />

        <Route
          path="/data/JSONLs"
          element={
            <>
              <PageTitle title="Data of JSONLs" />
              <JSONLs />
            </>
          }
        />

        <Route
          path="/data/media"
          element={
            <>
              <PageTitle title="Data of Media" />
              <Media />
            </>
          }
        />

        <Route
          path="/portal/media"
          element={
            <>
              <PageTitle title="Data of Media" />
              <Portal />
            </>
          }
        />

        {/* <!-- ===== adding pages here ===== --> */}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
