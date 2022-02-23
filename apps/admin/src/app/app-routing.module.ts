import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@bluebits/users";
import { BlogsFormComponent } from "./pages/blogs/blogs-form/blogs-form.component";
import { BlogsComponent } from "./pages/blogs/blogs-list/blogs.component";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { MainCategoriesListComponent } from "./pages/categories/main-categories-list/main-categories-list.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FaqFormComponent } from "./pages/faq/faq-form/faq-form.component";
import { FaqListComponent } from "./pages/faq/faq-list/faq-list.component";
import { LicenseKeyComponent } from "./pages/license-key/license-key.component";
import { AllNotificationsComponent } from "./pages/notifications/all-notifications/all-notifications.component";
import { OrdersDetailComponent } from "./pages/orders/orders-detail/orders-detail.component";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { TextSystemListComponent } from "./pages/textsystem/text-system-list/text-system-list.component";
//import { TextSystemReplyComponent } from "./pages/textsystem/text-system-reply/text-system-reply.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { ShellComponent } from "./shared/shell/shell.component";

const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "categories",
        component: MainCategoriesListComponent,
      },
      {
        path: "categories/mainCategories/form",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/form/:listType",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/:mainCategory/form",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/:mainCategory/subCategories/:category/form",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/form/:mainCategory/:category/:id/:isReadOnly",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/form/:mainCategory/:id/:isReadOnly",
        component: CategoriesFormComponent,
      },
      {
        path: "categories/form/:id/:isReadOnly",
        component: CategoriesFormComponent,
      },
      {
        path: "products",
        component: ProductsListComponent,
      },
      {
        path: "products/form",
        component: ProductsFormComponent,
      },
      {
        path: "products/form/:mainCategory/:category/:subCategory",
        component: ProductsFormComponent,
      },
      {
        path: "products/form/:id/:isReadOnly",
        component: ProductsFormComponent,
      },
      {
        path: "users",
        component: UsersListComponent,
      },
      {
        path: "users/form",
        component: UsersFormComponent,
      },
      {
        path: "users/form/:id",
        component: UsersFormComponent,
      },
      {
        path: "orders",
        component: OrdersListComponent,
      },
      {
        path: "orders/:id",
        component: OrdersDetailComponent,
      },
      {
        path: "blogs",
        component: BlogsComponent,
      },
      {
        path: "blogs/form",
        component: BlogsFormComponent,
      },
      {
        path: "blogs/form/id",
        component: BlogsFormComponent,
      },
      {
        path: "faq", //for faq list
        component: FaqListComponent,
      },
      {
        path: "faq/form", //for input faq
        component: FaqFormComponent,
      },
      {
        path: "faq/form/:id", //for edit by Id
        component: FaqFormComponent,
      },
      {
        path: "LicenseKey",
        component: LicenseKeyComponent,
      },
      {
        path: "ticketSystem",
        component: TextSystemListComponent,
      },
      {
        path: "notifications",
        component: AllNotificationsComponent,
      },
      /*
      ,
      {
        path: "text-system-reply",
        component: TextSystemReplyComponent,
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: "enabled" })],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
