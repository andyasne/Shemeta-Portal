export class MenuConfig {
  public defaults: any = {
    header: {
      self: {},
      items: [

      ]
    },
    aside: {
      self: {},
      items: [
        {
          title: 'Dashboard',
          root: true,
          icon: 'flaticon2-architecture-and-city',
          page: '/dashboard',
          translate: 'MENU.DASHBOARD',
          bullet: 'dot',
        },

        {section: 'USSD Module'},
        {
          title: 'BUILDER',
          root: true,
          icon: 'flaticon2-graphic-design',
          page: '/dashboard',
          translate: 'SHEMETA.BUILDER',
          bullet: 'dot',
        },
        {
          title: 'TEST',
          root: true,
          icon: 'flaticon2-checkmark',
          page: '/dashboard',
          translate: 'SHEMETA.SIMULATOR',
          bullet: 'dot',
        },
        {
          title: 'USER DATA',
          root: true,
          icon: 'flaticon2-user-1',
          page: '/dashboard',
          translate: 'SHEMETA.USER_DATA',
          bullet: 'dot',
        },
        {
          title: 'CONFIG',
          root: true,
          icon: 'flaticon2-settings',
          page: '/dashboard',
          translate: 'SHEMETA.CONFIG_USSD',
          bullet: 'dot',
        },
        {section: 'SMS Module'},
        {
          title: 'MESSAGE TEMPLATE',
          root: true,
          icon: 'flaticon2-send',
          page: '/dashboard',
          translate: 'SHEMETA.MESSAGE_TEMPLATE',
          bullet: 'dot',
        },
        {
          title: 'SENT_MESSAGES',
          root: true,
          icon: 'flaticon-email',
          page: '/dashboard',
          translate: 'SHEMETA.SENT_MESSAGES',
          bullet: 'dot',
        },
        {
          title: 'CONFIG',
          root: true,
          icon: 'flaticon2-settings',
          page: '/dashboard',
          translate: 'SHEMETA.CONFIG_SMS',
          bullet: 'dot',
        },
        {
          title: 'User Management',
          root: true,
          bullet: 'dot',
          icon: 'flaticon2-user-outline-symbol',
          submenu: [
            {
              title: 'Users',
              page: '/user-management/users'
            },
            {
              title: 'Roles',
              page: '/user-management/roles'
            }
          ]
        },

      ]
    },
  };

  public get configs(): any {
    return this.defaults;
  }
}
