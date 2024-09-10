import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AccessModeEnum } from "app/modules/account/enums/access-mode.enum";
import { AccessModeService } from "app/modules/account/services/access-mode.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { NavbarItemDto } from "../../dtos/navbar-item.dto";
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: "clina-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isAuthenticated: boolean = false;
  public AccessModeEnum = AccessModeEnum;  // Exponha o enum para o template
  private accessModeSubject = new BehaviorSubject<AccessModeEnum>(AccessModeEnum.HEALTH_PERSON);
  accessMode$ = this.accessModeSubject.asObservable();

  showNavbar$!: Observable<boolean>;
  items$: Observable<NavbarItemDto[]>;

  private showNavbarSubscription?: Subscription;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly router: Router,
    private readonly accessModeService: AccessModeService
  ) {
    this.items$ = this.accessMode$.pipe(
      map(accessMode => this.getItems(accessMode))
    );
  }

  ngOnInit(): void {
    this.showNavbar$ = this.sidebarService.$show; // Use o observable diretamente

    this.accessModeService.$accessMode.subscribe(
      (accessMode: AccessModeEnum) => {
        this.accessModeSubject.next(accessMode);
      }
    );
  }

  getItems(accessMode: AccessModeEnum): NavbarItemDto[] {
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
        show: accessMode === AccessModeEnum.HEALTH_PERSON,
      },
      {
        title: "Reservas",
        img: "/common-assets/images/sidebar/icon-appointments-solid-white.svg",
        url: "/appointment/host",
        isActive: false,
        show: accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Consultórios",
        img: "/common-assets/images/sidebar/room-icon.svg",
        url: "/room",
        isActive: false,
        show: accessMode === AccessModeEnum.HOST,
      },
      {
        title: "Check-In/Out",
        img: "/common-assets/images/sidebar/icon-checkinout.svg",
        url: "/check",
        isActive: false,
        show: accessMode === AccessModeEnum.HOST,
      },
      {
        title: "SaaS",
        img: "/common-assets/images/sidebar/icon-saas.svg",
        url: "/saas",
        isActive: false,
        show: accessMode === AccessModeEnum.HOST,
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
        show: accessMode === AccessModeEnum.HEALTH_PERSON,
      },
    ];
  }

  goToHome() {
    this.router.navigate(["/"]);
  }

  hideSidebar() {
    this.sidebarService.hide();
  }

  toggleAccessMode(mode: AccessModeEnum) {
    this.accessModeService.setMode(mode);
  }

  ngOnDestroy(): void {
    this.showNavbarSubscription?.unsubscribe();
  }
}
