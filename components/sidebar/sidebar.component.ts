import { Component, Input, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { AccessModeEnum } from "app/modules/account/enums/access-mode.enum";
import { AccessModeService } from "app/modules/account/services/access-mode.service";
import { PlatformUtils } from "app/utils/platform.util";
import { Subscription } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { NavbarItemDto } from "../../dtos/navbar-item.dto";
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: "clina-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isAuthenticated: boolean = false;
  accessMode: AccessModeEnum = AccessModeEnum.HEALTH_PERSON;

  hostSubscription?: Subscription;
  showNavbar: boolean = false;
  showNavbarSubscription?: Subscription;

  psUrl = environment.psUrl;

  AccessModeEnum = AccessModeEnum;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly sidebarService: SidebarService,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private readonly accessModeService: AccessModeService
  ) {}

  public get items(): NavbarItemDto[] {
    return [
      {
        title: "Home",
        img: "/common-assets/images/sidebar/icon-home-solid-white.svg",
        url: "/ps",
        isActive: false,
        show: true,
      },
      {
        title: "Minha Conta",
        img: "/common-assets/images/sidebar/icon-account-solid-white.svg",
        url: "/account",
        isActive: false,
        show: true,
      },
      {
        title: "Compras",
        img: "/common-assets/images/sidebar/icon-purchases-solid-white.svg",
        url: "/purchase",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HEALTH_PERSON,
      },
      {
        title: "Reservas",
        img: "/common-assets/images/sidebar/icon-appointments-solid-white.svg",
        url: "/appointment/host",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Consultórios",
        img: "/common-assets/images/sidebar/room-icon.svg",
        url: "/room",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Check-In/Out",
        img: "/common-assets/images/sidebar/icon-checkinout.svg",
        url: "/check",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "SaaS",
        img: "/common-assets/images/sidebar/icon-saas.svg",
        url: "/saas",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Agenda",
        img: "/common-assets/images/sidebar/icon-schedule-solid-white.svg",
        url: "/my-schedule",
        isActive: false,
        show: true,
      },
      {
        title: "Notificações",
        img: "/common-assets/images/sidebar/icon-bell-solid-white.svg",
        url: "/notification",
        isActive: false,
        show: true,
      },
      {
        title: "Extrato Financeiro",
        img: "/common-assets/images/sidebar/icon-money-solid-white.svg",
        url: "/statement",
        isActive: false,
        show: true,
      },
      {
        title: "Ganhe Créditos",
        img: "/common-assets/images/sidebar/icon-indication-earns-solid-white.svg",
        url: "/get-member",
        isActive: false,
        show: true,
      },
      {
        title: "Favoritos",
        img: "/common-assets/images/sidebar/icon-favorite-solid-white.svg",
        url: "/room-favorite",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HEALTH_PERSON,
      },
    ];
  }

  ngOnInit(): void {
    this.accessModeService.$accessMode.subscribe(
      (accessMode: AccessModeEnum) => {
        this.accessMode = accessMode;
      }
    );

    if (PlatformUtils.isBrowser())
      this.showNavbarSubscription = this.sidebarService.$show.subscribe(
        (show: boolean) => {
          this.showNavbar = show;
          if (this.showNavbar && window.innerWidth < 992) {
            this.renderer.addClass(document.body, "no-scroll");
          } else {
            this.renderer.removeClass(document.body, "no-scroll");
          }
        }
      );
  }

  goToHome() {
    this.router.navigate(["/"]);
  }

  goToPage(item: NavbarItemDto) {
    const sidebar = document.getElementById("sidebar");
    this.router.navigate([item.url]);

   // this.hideSidebar();
  }

  logout() {
    this.authenticationService.signOut();
  }

  hideSidebar() {
    document.getElementById("body")?.classList.remove("overflow-hidden");
    this.sidebarService.hide();
  }

  toggleAccessMode(mode: AccessModeEnum) {
    if(mode==AccessModeEnum.HOST)
      this.router.navigateByUrl(environment.hostUrl)
    this.showNavbar = false;
    this.accessModeService.setMode(mode);
  }

  ngOnDestroy(): void {
    this.showNavbarSubscription?.unsubscribe();
    this.hostSubscription?.unsubscribe();
    if (PlatformUtils.isBrowser())
      this.renderer.removeClass(document.body, "no-scroll");
  }
}
