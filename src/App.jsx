import './App.css';

// Routes
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

// Components
import Navbar from './components/Geral/NavBar/Navbar'
import Login from './pages/Login-Register/Login/Login';
import Register from './pages/Login-Register/Register/Register'
import ForgotPassword from './pages/Login-Register/ForgotPassword/ForgotPassword';
import Chamados from './pages/Chamados/Chamados/Chamados';
import NovoChamado from './pages/Chamados/NovoChamado/NovoChamado';
import CalledEdit from './pages/Chamados/CalledEdit/CalledEdit';
import PdfCall from './pages/Chamados/PdfCall/index'
import EEE from './pages/Estações/EEE/EEE';
import NewEEE from './pages/Estações/NewEEE/NewEEE';
import EditEEE from './pages/Estações/EditEEE/EditEEE';
import PdfEEE from './pages/Estações/PdfEEE/PdfEEE'
import GeneralSettings from './pages/GeneralSettings/GeneralSettings';
import MyProfile from './pages/MyProfile/MyProfile';
import Footer from './components/Geral/Footer/Footer'
import Planilha from './pages/Chamados/ControleCentralServicosMPM/Index'

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { user, permissions, authorization } = useAuth()

  if (user.funcao === 'Visitante' || user.funcao === 'Manutenção') {
    return (
      <BrowserRouter>
        <ToastContainer
          position='bottom-left'
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme='dark'
          transition={Flip}
        />
        <div className='App'>
          <Navbar />
          <div className="container">
            <Routes>

              <Route
                path='/login'
                element={!authorization ? <Login /> : <Navigate to='/planilha' />}
              />

              <Route
                path='/login/register'
                element={!authorization ? <Register /> : <Navigate to='/planilha' />}
              />

              <Route
                path='/login/forgotPassword'
                element={!authorization ? <ForgotPassword /> : <Navigate to='/planilha' />}
              />

              <Route
                path='/planilha'
                element={authorization ? <Planilha /> : <Navigate to='/login' />}
              />

              <Route
                path='/myProfile'
                element={authorization ? <MyProfile /> : <Navigate to='/login' />}
              />

            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme='dark'
        transition={Flip}
      />
      <div className='App'>
        <Navbar />
        <div className="container">
          <Routes>

            <Route
              path='/login'
              element={!authorization ? <Login /> : <Navigate to='/' />}
            />

            <Route
              path='/login/register'
              element={!authorization ? <Register /> : <Navigate to='/' />}
            />

            <Route
              path='/login/forgotPassword'
              element={!authorization ? <ForgotPassword /> : <Navigate to='/' />}
            />

            <Route
              path='/'
              element={authorization ? <Chamados /> : <Navigate to='/login' />}
            />

            <Route
              path='/planilha'
              element={authorization ? <Planilha /> : <Navigate to='/' />}
            />

            <Route
              path='/myProfile'
              element={authorization ? <MyProfile /> : <Navigate to='/login' />}
            />

            <Route
              path='/newCalled'
              element={authorization ? <NovoChamado /> : <Navigate to='/login' />}
            />

            <Route
              path='/calledEdit/:id'
              element={authorization ? < CalledEdit /> : <Navigate to='/login' />}
            />

            <Route
              path='/pdfCall'
              element={authorization ? < PdfCall /> : <Navigate to='/login' />}
            />

            <Route
              path='/eee'
              element={authorization ? <EEE /> : <Navigate to='/login' />}
            />

            <Route
              path='/eee/pdfeee/:id'
              element={authorization ? <PdfEEE /> : <Navigate to='/login' />}
            />

            <Route
              path='/eee/eeeEdit/:id'
              element={authorization ? <EditEEE /> : <Navigate to='/login' />}
            />

            {
              (user && permissions.pages.includes(user.funcao)) && (
                <Route
                  path='/eee/newEEE'
                  element={authorization ? <NewEEE /> : <Navigate to='/' />}
                />
              )
            }

            {
              user && permissions.pages.includes(user.funcao) && (
                <Route
                  path='/managerArea'
                  element={authorization ? < GeneralSettings /> : <Navigate to='/login' />}
                />
              )
            }
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
