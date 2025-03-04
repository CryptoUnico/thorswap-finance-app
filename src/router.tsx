import React, { Suspense, lazy } from 'react'

import { Router, Route, Switch } from 'react-router'

import { Layout, PageLoader, SubHeader } from 'components'

import { history } from 'helpers/history'

import {
  HOME_ROUTE,
  SEND_ROUTE,
  UPGRADE_RUNE_ROUTE,
  SWAP_ROUTE,
  TOOLS_ROUTE,
  EXPLORERS_ROUTE,
  EDUCATION_ROUTE,
  STATS_ROUTE,
  FAQS_ROUTE,
  TX_ROUTE,
  POOL_DETAIL_ROUTE,
  ADD_LIQUIDITY_ROUTE,
  LIQUIDITY_ROUTE,
  WITHDRAW_ROUTE,
} from 'settings/constants'

export type Routes = {
  exact?: boolean
  path?: string | string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any
  background?: boolean
}[]

const routes: Routes = [
  {
    exact: true,
    path: HOME_ROUTE,
    component: lazy(() => import('views/Home')),
  },
  {
    exact: true,
    path: `${POOL_DETAIL_ROUTE}/:asset`,
    component: lazy(() => import('views/PoolDetail')),
  },
  {
    exact: true,
    path: `${SEND_ROUTE}/:asset`,
    component: lazy(() => import('views/Send')),
  },
  {
    exact: true,
    path: `${UPGRADE_RUNE_ROUTE}`,
    component: lazy(() => import('views/Upgrade')),
  },
  {
    exact: true,
    path: `${SWAP_ROUTE}/:pair`,
    component: lazy(() => import('views/Swap')),
  },
  {
    exact: true,
    path: `${LIQUIDITY_ROUTE}`,
    component: lazy(() => import('views/Liquidity')),
    background: false,
  },
  {
    exact: true,
    path: `${ADD_LIQUIDITY_ROUTE}/:asset`,
    component: lazy(() => import('views/Add')),
    background: false,
  },
  {
    exact: true,
    path: `${WITHDRAW_ROUTE}/:asset`,
    component: lazy(() => import('views/Withdraw')),
    background: false,
  },
  // {
  //   exact: true,
  //   path: `${CREATE_LIQUIDITY_ROUTE}/:asset`,
  //   component: lazy(() => import('views/Create')),
  //   background: false,
  // },
  {
    exact: true,
    path: TX_ROUTE,
    component: lazy(() => import('views/Transaction')),
    background: false,
  },
  {
    exact: true,
    path: TOOLS_ROUTE,
    component: lazy(() => import('views/Tools')),
    background: false,
  },
  {
    exact: true,
    path: EXPLORERS_ROUTE,
    component: lazy(() => import('views/Explorer')),
    background: false,
  },
  {
    exact: true,
    path: EDUCATION_ROUTE,
    component: lazy(() => import('views/Education')),
    background: false,
  },
  {
    exact: true,
    path: STATS_ROUTE,
    component: lazy(() => import('views/Statistics')),
    background: false,
  },
  {
    exact: true,
    path: FAQS_ROUTE,
    component: lazy(() => import('views/Faqs')),
    background: false,
  },
]

const PublicRoutes = () => (
  <Router history={history}>
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {routes.map((route, index) => {
          const Component = route.component
          const { background = true } = route

          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Layout transparent={!background}>
                  <SubHeader hasBack={route.path !== HOME_ROUTE} />
                  <Component {...props} />
                </Layout>
              )}
            />
          )
        })}
      </Switch>
    </Suspense>
  </Router>
)

export default PublicRoutes
