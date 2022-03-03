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
    {
        name: 'menu.system.booking',
        menus: [
            {
                name: 'menu.system.system-administrator.owner-booking',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
                link: '/system/manage-booking'
            },


        ]

    },
    { //hệ thống
        name: 'menu.system.list',
        menus: [
            {
                name: 'menu.system.list',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
                link: '/system/city'
            },


        ]


    },



];
export const ownerMenu = [

    {
        name: 'menu.system.user',
        menus: [
            {
                name: 'menu.system.system-administrator.owner-booking',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

                // ]
                link: '/system/manage-booking'
            },


        ]

    },





];