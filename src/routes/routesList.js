import { ROUTE_PATHS } from 'constants/index'
import ConnectChannelForm from 'pages/ConnectChannelForm/index'
import LiveVideo from 'pages/LiveVideo/index'

const routes = [
  {
    path: ROUTE_PATHS.HOME,
    component: ConnectChannelForm
  },
  {
    path: ROUTE_PATHS.LIVE_CHANNEL,
    component: LiveVideo
  }
]

export default routes
