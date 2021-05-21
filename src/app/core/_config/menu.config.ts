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
      

        {section: 'USSD Module'},
      
        {
          title: 'TEST',
          root: true,
          icon: 'flaticon2-checkmark',
          page: '/shemeta/simulator',
          translate: 'SHEMETA.SIMULATOR',
          bullet: 'dot',
        } ,
        {section: 'SMS Module'},
        {
          title: 'MESSAGE TEMPLATE',
          root: true,
          icon: 'flaticon2-send',
          page: '/shemeta/msg-template',
          translate: 'SHEMETA.MESSAGE_TEMPLATE',
          bullet: 'dot',
        },
        {
          title: 'SENT MESSAGES',
          root: true,
          icon: 'flaticon-email',
          page: '/shemeta/sms-sent-messages',
          translate: 'SHEMETA.SENT_MESSAGES',
          bullet: 'dot',
        } ,
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
