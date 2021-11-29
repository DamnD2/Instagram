import { notFoundComponent } from "./pages/not-found.component";
import { homePageComponent } from "./pages/home-page.component";
import { signinPageComponent } from "./pages/signin-page.component";
import { signupPageComponent } from "./pages/signup-page.component";

export const appRoutes = [
  { path: '**', component: notFoundComponent },
  { path: '', component: homePageComponent },
  { path: 'signin', component: signinPageComponent },
  { path: 'signup', component: signupPageComponent },
];