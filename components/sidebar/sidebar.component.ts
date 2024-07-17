import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { NavbarItemDto } from "../../dtos/navbar-item.dto";
import { SidebarService } from "../../services/sidebar.service";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { environment } from "../../../../../environments/environment.dev";
import { AccountDto } from "../../../account/dtos/account.dto";
import { AccessModeEnum } from "src/app/modules/account/enums/access-mode.enum";
import { AccessModeService } from "src/app/modules/account/services/access-mode.service";

@Component({
  selector: "clina-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  accessMode: AccessModeEnum = AccessModeEnum.HEALTH_PERSON;

  account?: AccountDto;
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
        img: "images/sidebar/icon-home-solid-white.svg",
        url:
          "/" + this.accessMode === AccessModeEnum.HEALTH_PERSON
            ? "ps"
            : "host",
        isActive: false,
        show: true,
      },
      {
        title: "Minha Conta",
        img: "images/sidebar/icon-account-solid-white.svg",
        url: "/account",
        isActive: false,
        show: true,
      },
      {
        title: "Compras",
        img: "images/sidebar/icon-purchases-solid-white.svg",
        url: "/purchase",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HEALTH_PERSON,
      },
      {
        title: "Reservas",
        img: "images/sidebar/icon-appointments-solid-white.svg",
        url:
          "/clinic/" + "/" + this.accessMode === AccessModeEnum.HEALTH_PERSON
            ? "ps"
            : "host",
        isActive: false,
        show: true,
      },
      {
        title: "Consultórios",
        img: "images/sidebar/room-icon.svg",
        url: "/room",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Check-In/Out",
        img: "images/sidebar/icon-checkinout.svg",
        url: "/check",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Ganhos",
        img: "images/sidebar/icon-earnings.svg",
        url: "/earnings",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HOST,
      },
      {
        title: "SaaS",
        img: "images/sidebar/icon-saas.svg",
        url: "/saas",
        isActive: false,
        show:
          this.accessMode === AccessModeEnum.HOST &&
          (this.account?.isActiveSaaS || false),
      },
      {
        title: "Agenda",
        img: "images/sidebar/icon-schedule-solid-white.svg",
        url: "/schedule",
        isActive: false,
        show: true,
      },
      {
        title: "Notificações",
        img: "images/sidebar/icon-bell-solid-white.svg",
        url: "/notification",
        isActive: false,
        show: true,
      },
      {
        title: "Extrato Financeiro",
        img: "images/sidebar/icon-favorite-solid-white.svg",
        url: "/statement",
        isActive: false,
        show: true,
      },
      {
        title: "Ganhe Créditos",
        img: "images/sidebar/icon-indication-earns-solid-white.svg",
        url: "/earns",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HEALTH_PERSON,
      },
      {
        title: "Anuncie seu Consultório",
        img: "images/sidebar/icon-megafone-solid-white.svg",
        url: "/favorite",
        isActive: false,
        show: this.accessMode === AccessModeEnum.HEALTH_PERSON,
      },
      {
        title: "Favoritos",
        img: "images/sidebar/icon-favorite-solid-white.svg",
        url: "/favorite",
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
    this.authenticationService.$account.subscribe(
      (account: AccountDto | undefined) => {
        this.account = account;
      }
    );
  }

  goToHome() {
    this.router.navigate(["/"]);
  }

  goToPage(item: NavbarItemDto) {
    const sidebar = document.getElementById("sidebar");
    this.router.navigate([item.url]);
    if (sidebar) {
      sidebar.classList.add("pe-none");
      setTimeout(() => {
        sidebar.classList.remove("pe-none");
      }, 1500);
    }
    this.hideSidebar();
  }

  logout() {
    this.authenticationService.signOut();
  }

  hideSidebar() {
    document.getElementById("body")?.classList.remove("overflow-hidden");
    this.sidebarService.hide();
  }

  toggleAccessMode(mode: AccessModeEnum) {
    this.showNavbar = false;
    this.accessModeService.setMode(mode);
  }

  ngOnDestroy(): void {
    this.showNavbarSubscription?.unsubscribe();
    this.hostSubscription?.unsubscribe();
    this.renderer.removeClass(document.body, "no-scroll");
  }
}
