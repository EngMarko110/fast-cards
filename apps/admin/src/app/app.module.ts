import { FilterPipe } from "./shared/pipes/filter.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { ShellComponent } from "./shared/shell/shell.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { CategoriesListComponent } from "./pages/categories/categories-list/categories-list.component";
import { ProductsListComponent } from "./pages/products/products-list/products-list.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";
import { UsersListComponent } from "./pages/users/users-list/users-list.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { JwtInterceptor, UsersModule } from "@bluebits/users";

import { CardModule } from "primeng/card";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { CategoriesService } from "@bluebits/products";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ColorPickerModule } from "primeng/colorpicker";
import { InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputSwitchModule } from "primeng/inputswitch";
import { EditorModule } from "primeng/editor";
import { TagModule } from "primeng/tag";
import { InputMaskModule } from "primeng/inputmask";
import { OrdersListComponent } from "./pages/orders/orders-list/orders-list.component";
import { OrdersDetailComponent } from "./pages/orders/orders-detail/orders-detail.component";
import { FieldsetModule } from "primeng/fieldset";
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MainCategoriesListComponent } from "./pages/categories/main-categories-list/main-categories-list.component";
import { BlogsFormComponent } from "./pages/blogs/blogs-form/blogs-form.component";
import { BlogsComponent } from "./pages/blogs/blogs-list/blogs.component";
import { FaqFormComponent } from "./pages/faq/faq-form/faq-form.component";
import { FaqListComponent } from "./pages/faq/faq-list/faq-list.component";
import { LicenseKeyComponent } from "./pages/license-key/license-key.component";
import { TextSystemListComponent } from "./pages/textsystem/text-system-list/text-system-list.component";
import { AllNotificationsComponent } from "./pages/notifications/all-notifications/all-notifications.component";
import { WalletListComponent } from './pages/wallets/wallet-list/wallet-list.component';
import { WalletInfoComponent } from './pages/wallets/wallet-info/wallet-info.component';
//import { TextSystemReplyComponent } from './pages/textsystem/text-system-reply/text-system-reply.component';

const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  InputSwitchModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ShellComponent,
    DashboardComponent,
    MainCategoriesListComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersListComponent,
    OrdersDetailComponent,
    FilterPipe,
    BlogsComponent,
    LicenseKeyComponent,
    FaqListComponent,
    FaqFormComponent,
    BlogsFormComponent,
    TextSystemListComponent,
    AllNotificationsComponent,
    WalletListComponent,
    WalletInfoComponent,
    // TextSystemReplyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    ...UX_MODULE,
  ],
  providers: [
    CategoriesService,
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
