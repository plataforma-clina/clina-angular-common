import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { AccessModeEnum } from "app/modules/account/enums/access-mode.enum";
import { AccessModeService } from "app/modules/account/services/access-mode.service";
import { UnleashService } from "app/services/unleash.service";
import { PlatformUtils } from "app/utils/platform.util";
import { filter, Subscription } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { AuthenticationService } from "../../../authentication/authentication.service";
import { NotificationService } from "../../../notification/notification.service";
import { PageTitleDto } from "../../dtos/page-title.dto";
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: "clina-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() isAuthenticated: boolean = false;

  accessMode: AccessModeEnum = AccessModeEnum.HEALTH_PERSON;
  isSearchActive = false;

  psUrl = environment.psUrl;
  whatsappNumber = environment.whatsappNumber;

  pageTitle?: PageTitleDto;
  pageTitleSubscription?: Subscription;

  notificationsCount: number = 0;

  faBell = faBell;

  isNotificationEnabled = this.unleashService.isEnabled("ps-notification");

  AccessModeEnum = AccessModeEnum;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
    private readonly unleashService: UnleashService,
    private readonly notificationService: NotificationService,
    private readonly accessModeService: AccessModeService
  ) {
  }

  // Verifica se a rota é a raiz
  checkRoute() {
    const currentUrl = this.router.url;
    if (currentUrl != '/') {
      this.isSearchActive = true;
    } else {
      this.onWindowScroll();
    }
  }


  // Verifica o scroll na página
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.router.url != '/') return;
    if (!PlatformUtils.isBrowser()) return;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Se o scroll for maior que 300px, ativa a variável
    if (scrollPosition > 300) {
      this.isSearchActive = true;
    } else {
      this.isSearchActive = false;
    }
  }

  ngOnInit(): void {
    this.accessModeService.$accessMode.subscribe(
      (accessMode: AccessModeEnum) => {
        this.accessMode = accessMode;
      }
    );

    this.notificationService.getNotifications().subscribe((notifications) => {
      this.notificationsCount =
        notifications?.filter((r) => !r.read)?.length || 0;
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkRoute();
      });

    // Faz a verificação inicial
    this.checkRoute();
  }

  ngOnDestroy(): void {
    this.pageTitleSubscription?.unsubscribe();
  }

  goToHome() {
    this.router.navigate(["/"]);
  }

  showSidebar() {
    document.getElementById("body")?.classList.add("overflow-hidden");
    this.sidebarService.show();
  }
}
