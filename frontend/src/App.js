import styled, { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Search from "./pages/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { darkTheme, lightTheme } from "./utils/Theme";
import SignIn from "./pages/SignIn";
import RequireAuth from "./components/RequireAuth";
import { useSelector } from "react-redux";

function App() {
  const { isDarkMode } = useSelector((state) => state.theme);

  return (
    <ThemeProvider theme={isDarkMode === "dark" ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <SideBar />
          <Main>
            <NavBar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="explore" element={<Home type="trend" />} />
                  <Route
                    path="subscriptions"
                    element={
                      <RequireAuth>
                        <Home type="sub" />
                      </RequireAuth>
                    }
                  />
                  <Route path="search" element={<Search />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="signin" element={<SignIn />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
      <ToastContainer position="top-center" />
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  width: 83%;
  margin-left: auto;

  @media (max-width: 768px) {
    width: 92%;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
`;

export default App;
