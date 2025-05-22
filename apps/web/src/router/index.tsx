import { lazy } from "solid-js";
import { Router, type RouteDefinition } from "@solidjs/router";
import type { Component } from "solid-js";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("../App")),
    children: [
      {
        path: '/',
        component: lazy(() => import('../pages/home.page'))
      },
      {
        path: '/search',
        component: lazy(() => import('../pages/search.page'))
      },
      {
        path: '/lyric',
        component: lazy(() => import('../pages/lyric.page'))
      },
      {
        path:'/discover-servers',
        component:lazy(()=>import('../pages/discover-servers.page'))
      }
    ]
  }
]

export const ApplicationRouter: Component = () => {
  return (
    <Router>{routes}</Router>
  )
}
