import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './routesList'
import { ROUTE_PATHS } from 'constants/index'
import { Fragment } from 'react'
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react'
import MainLayout from 'components/MainLayout/index'
import NotFoundPage from 'pages/NotFound/index'

const LayoutWrapper = ({ component: Component }) => (
  <MainLayout>
    <Component />
  </MainLayout>
)

const AppRoutes = () => {
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' })) // Initialize Agora Client

  return (
    <BrowserRouter>
      <Routes>
        {
            routes.map(({ path, component }) => {
              if (path === ROUTE_PATHS.LIVE_CHANNEL) {
                return (
                  <Fragment key={path}>
                    <Route
                      path={path} element={
                        <AgoraRTCProvider client={agoraClient}>
                          <LayoutWrapper component={component} />
                        </AgoraRTCProvider>
                    }
                    />
                  </Fragment>
                )
              }
              return (
                <Fragment key={path}>
                  <Route
                    path={path} element={<LayoutWrapper component={component} />}
                  />
                </Fragment>
              )
            })
          }
        <Route path='*' element={<LayoutWrapper component={NotFoundPage} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
