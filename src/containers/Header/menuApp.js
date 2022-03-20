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
                link: '/system/manage-admin'

            }

        ]

    },
    { //hệ thống
        name: 'menu.system.post',

        menus: [
            {
                name: 'menu.system.post',
                link: '/system/post'
            },


        ]


    },
    {
        name: 'menu.system.booking',
        menus: [
            {
                name: 'menu.system.system-administrator.owner-booking',
                link: '/system/manage-booking'
            },
            {
                name: 'menu.system.system-administrator.owner-schedule',
                link: '/system/manage-schedule'
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
                link: '/system/list'
            },
            {
                name: 'menu.system.system-administrator.user-admin',
                link: '/system/manage-comment'

            }


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
    { //hệ thống
        name: 'menu.system.post',

        menus: [
            {
                name: 'menu.system.post',
                link: '/system/post'
            },


        ]


    },





];