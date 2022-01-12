import { notFoundComponent } from "./pages/not-found.component";
import { homePageComponent } from "./pages/home-page.component";
import { signinPageComponent } from "./pages/signin-page.component";
import { signupPageComponent } from "./pages/signup-page.component";
import { postsPageComponent } from "./pages/posts-page.component";

export const appRoutes = [
  { path: '**', component: notFoundComponent },
  { path: 'main', component: homePageComponent, isLoggedIn: true },
  { path: 'signin', component: signinPageComponent },
  { path: 'signup', component: signupPageComponent },
  { path: 'posts', component: postsPageComponent},
];