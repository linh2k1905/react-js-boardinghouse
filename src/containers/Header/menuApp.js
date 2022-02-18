export const adminMenu = [

    {
        name: 'menu.system.user',
        menus: [
            {
                name: 'menu.system.system-administrator.user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
                link: '/system/user-redux'
            },
            {
                name: 'menu.system.system-administrator.user-owner',
                link: '/system/manage-owner'

            },
            {
                name: 'menu.system.system-administrator.user-admin',

            }

        ]

    },
    { //hệ thống
        name: 'menu.system.post',

        menus: [
            {
                name: 'menu.system.post',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
                link: '/system/post'
            },


        ]


    },
    { //hệ thống
        name: 'menu.system.booking',


    },
    { //hệ thống
        name: 'menu.system.city',
        menus: [
            {
                name: 'menu.system.system-administrator.header',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
            },
            {
                name: 'menu.system.system-administrator.header',

            },
            {
                name: 'menu.system.system-administrator.header',

            }

        ]

    },



];