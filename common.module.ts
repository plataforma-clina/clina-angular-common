import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { RouterModule } from "@angular/router";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DesignSystemModule } from "../design-system/design-system.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NavbarSearchComponent } from "./components/search/search.component";
import { NavbarLocationDropdownComponent } from "./components/location-dropdown/location-dropdown.component";
import { FormsModule } from "@angular/forms";
import { RoomShowcaseItemCardComponent } from "./components/room-showcase-item-card/room-showcase-item-card.component";
import { RoomShowcaseItemSuccessSharedModalComponent } from "./components/room-showcase-item-success-shared-modal/room-showcase-item-success-shared-modal.component";
import { FavoriteButtonComponent } from "./components/favorite-button/favorite-button.component";

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    NavbarSearchComponent,
    NavbarLocationDropdownComponent,
    FooterComponent,
    RoomShowcaseItemCardComponent,
    RoomShowcaseItemSuccessSharedModalComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CollapseModule.forRoot(),
    DesignSystemModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RoomShowcaseItemCardComponent,
    FavoriteButtonComponent,
  ],
})
export class ClinaCommonModule {}