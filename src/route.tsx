import * as React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomeLayout from './layout/HomeLayout'
import type * as Type from './typings'

const routesConfig: Type.IRouterConfig[] = [
  {
    path: '/*',
    component: HomeLayout,
    children: [
      {
        path: '/home',
        name: '首页',
        component: React.lazy(() => import('./pages/HomePage')),
      },
      {
        path: '/sourcemap',
        name: 'SoureMap工具页',
        component: React.lazy(() => import('./pages/SourceMapTool')),
      },
      {
        path: '*',
        redirect: '/home'
      }
    ]
  }
]

const renderRoutes = (routes?: Type.IRouterConfig[]): React.ReactNode => {
  if (!Array.isArray(routes)) {
    return null;
  }

  return (
    <Routes>
      {
        routes.map((route, index) => {
          if (route.redirect) {
            return (
              <Route
                key={route.path || index}
                path={route.path}
                element={<Navigate to={route.redirect} replace />}
              />
            )
          }

          let element = renderRoutes(route.children)
          if (route.component) {
            element = (
              <React.Suspense>
                <route.component>{element}</route.component>
              </React.Suspense>
            )
          }
          return (
            <Route
              key={route.path || index}
              path={route.path}
              element={element}
            />
          )
        })
      }
    </Routes>
  )
}

export default () => {
  return (
    <HashRouter>
      {renderRoutes(routesConfig)}
    </HashRouter>
  )
}
