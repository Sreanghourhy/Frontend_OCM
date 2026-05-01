import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth , getUser, hasPermission } from './authentication'

import LoginComponent from './../layouts/login/index.vue'
import ForgotPasswordComponent from './../layouts/login/forgot_password.vue'
import DashboardComponent from '../layouts/dashboard/index.vue'
import DashboardBackupViewComponent from '../components/dashboard-backup/DashboardView.vue'
import WelcomeComponent from '../layouts/welcome/portal/mainportal.vue'

import GlobalSearchComponent from '../components/regulator/global.vue'
import RegulatorFavoriteComponent from '../components/regulator/favorite.vue'

/**
 * Attendant Components
 */
import AttendantCrud from './../components/attendant/index.vue'
import AttendantListCrud from './../components/attendant/list.vue'
import AttendantMonthlyCrud from './../components/attendant/monthly.vue'
import MyAttendant from './../components/attendant/myattendant.vue'

import QRComponent from './../components/qrcodes/index.vue'
import QRListComponent from './../components/qrcodes/list.vue'
import QRCheckinComponent from './../components/qrcodes/checkin.vue'

/**
 * Folder Section
 */
import FolderComponent from './../components/regulator/folder/index.vue'
import FolderListComponent from './../components/regulator/folder/thumb.vue'
import FolderDetailComponent from './../components/regulator/folder/detail.vue'
import FolderRegulatorComponent from './../components/regulator/folder/regulator.vue'

/**
 * User Account
 */
import UserComponent from './../components/user/index.vue'
import UserProfileComponent from './../components/user/profile.vue'
import PasswordChangeComponent from './../components/user/password_change.vue'
import PrivacyPolicyComponent from './../components/privacy-policy/index.vue'

/**
 * Officer
 */
import OfficerCrud from './../components/officer/index.vue'
import OfficerContractCrud from './../components/officer-contract/index.vue'
import OfficerOthersCrud from './../components/officer-others/index.vue'
import OtherOfficerTable from './../components/officer-others/other-officer-table.vue'
import OfficerThumbnailCrud from './../components/officer/listing/thumbnail.vue'
import OfficerTableCrud from './../components/officer/listing/table.vue'


import OfficerProfile from './../components/officer/listing/profile.vue'
import CreateProfileDraft from './../components/officer/widgets/createprofiledraft.vue'
import PrintOfficerProfileComponent from './../layouts/staff/printprofile.vue'
import PrintOfficerProfileV1Component from './../layouts/staff/printprofile-v1.vue'
import PrintContractOfficerProfile from './../layouts/staff/contractofficerprintprofile.vue'
import OfficerProfileCreate from './../components/officer/listing/profilecreate.vue'
import OfficerContractProfile from './../components/officer-contract/contract-profile.vue'
import OfficerContractProfileCreate from './../components/officer-contract/contract-profile-create.vue'
import ContractOfficerTable from './../components/officer-contract/contract-officer-table.vue'



/**
 * Structure Page
 */
import StructureComponent from './../components/structure/index.vue'
import StructureMainComponent from './../components/structure/main.vue'
import StructureOrgchartComponent from './../components/structure/orgchart.vue'

/**
 * Card Officer
 */
import DetailCardComponent from './../layouts/staff/card.vue'
import PrintOfficerCardComponent from './../layouts/staff/printcard.vue'
/**
 * Check in and out
 */
import QrCheckinAndCheckoutComponent from './../layouts/checkinout/check.vue'
import QrCheckinAndCheckoutCameraComponent from './../layouts/checkinout/qrcheck.vue'

/**
 * Schedule of Meeting
 */
import ScheduleMeetingTV1Component from '../layouts/welcome/backup/template1.vue'
import ScheduleMeetingTV2Component from '../layouts/welcome/backup/template2.vue'
import ScheduleMeetingTV3Component from '../layouts/welcome/backup/template3.vue'
import ScheduleMeetingTV4Component from '../layouts/welcome/backup/template4.vue'

/**
 * Meeting
 */
import MeetingComponent from './../components/meeting/index.vue'
import MeetingThumbnailComponent from './../components/meeting/crud/lists/thumbnail.vue'
import MeetingScheduleComponent from './../components/meeting/MeetingSchedule.vue'

/**
 * Report
 */
import ReportComponent from './../components/reports/index.vue'
import ReportOfficerComponent from './../components/reports/officersinorg/tablestyle-div.vue'

/**
 * Error
 */
import Page404 from './../components/errors/404.vue'
import router from '../router'
var routers = [];
console.log( 'Portal Key: ' + hasPermission('portal') )
export const getRoutes = () => {
    if( isAuth() && hasPermission( 'portal' ) ){
        routers = [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/dashboard'
                },
                permissions: [
                    'portal'
                ]
            },
            { 
                path: '/login', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/dashboard'
                },
                permissions: [
                    'portal'
                ]
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/dashboard'
                },
                permissions: [
                    'portal'
                ]
            },
            {
                name: "Dashboard" ,
                path: '/dashboard' , 
                component: DashboardComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal' ,
                    'portal_dashboard'
                ]
            },
            {
                name: "DashboardBackupView",
                path: '/dashboard-backup',
                component: DashboardBackupViewComponent,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal'
                ]
            },
            {
                name: "UserProfile" ,
                path: '/profile' ,
                component: UserProfileComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal' ,
                    'portal_user_profile'
                ]
            },
            {
                name: "UserPasswordChange" ,
                path: '/password/change' ,
                component: PasswordChangeComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_password_change' ,
                    'portal'
                ]
            },
            {
                name: "PrivacyPolicy" ,
                path: '/privacy-policy' ,
                component: PrivacyPolicyComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal'
                ]
            },
            {
                name: "RegulatorPage" ,
                path: '/regulator' ,
                component: GlobalSearchComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_regulator'
                ]
            },
            {
                name: "RegulatorFavoritePage" ,
                path: '/regulator/favorites' ,
                component: RegulatorFavoriteComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_regulator_favorite'
                ]
            },
            {
                name: "FolderPage" ,
                path: '/folder' ,
                component: FolderComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_regulator_folder'
                ],
                children: [
                    {
                        name: "FolderList" ,
                        path: '' ,
                        component: FolderListComponent ,
                        permissions: [
                            'portal_regulator_folder_listing'
                        ]
                    },
                    {
                        name: "FolderRegulatorComponent" ,
                        path: ':id/regulators' ,
                        component: FolderRegulatorComponent ,
                        permissions: [
                            'portal_regulator_folder_regulators'
                        ]
                    }
                ]
            },
            {
                name: 'Attendant' ,
                path: '/hr/attendant',
                component: AttendantCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_attendant'
                ],
                children: [
                    {
                        name: "AttendantList" ,
                        path: '' ,
                        component: AttendantListCrud
                    },
                    {
                        name: 'AttendantMonthly' ,
                        path: ':date/month/:userId/user' ,
                        component: AttendantMonthlyCrud
                    },
                    {
                        name: 'MyAttendant' ,
                        path: 'my' ,
                        component: MyAttendant
                    },
                    {
                        name: 'QRListComponent' ,
                        path: 'qrlist' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckinComponent' ,
                        path: 'qrcheckin' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            {
                name: 'QRCodes' ,
                path: '/hr/attendant/qrcodes',
                component: QRComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_attendant_qrcodes'
                ],
                children: [
                    {
                        name: "QRCodesList" ,
                        path: '' ,
                        component: QRListComponent
                    },
                    {
                        name: 'QRCheckin' ,
                        path: 'checkin/:id' ,
                        component: QRCheckinComponent
                    }
                    
                ]
            },
            {
                name: 'ReportComponent' ,
                path: '/report',
                component: ReportComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_staff'
                ],
                children: [
                    {
                        name: "ReportOfficerComponent" ,
                        path: '' ,
                        component: ReportOfficerComponent
                    },
                    {
                        name: 'ReportOfficerStyleComponent' ,
                        path: 'officerinorg' ,
                        component: ReportOfficerComponent
                    }
                    
                ]
            },
            {
                name: 'Officer' ,
                path: '/officer',
                component: OfficerCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_staff'
                ],
                children: [
                    {
                        name: "OfficerList" ,
                        path: '' ,
                        component: OfficerTableCrud ,
                        props: {
                            lockedOfficerTypes: ['politician', 'admin_official'],
                            lockedOfficerTitle: 'គ្រប់គ្រងព័ត៌មានមន្ត្រី'
                        },
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerListPolitical" ,
                        path: 'political' ,
                        component: OfficerTableCrud ,
                        props: { lockedOfficerType: 'politician' },
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerListCivilService" ,
                        path: 'civil-service' ,
                        component: OfficerTableCrud ,
                        props: { lockedOfficerType: 'admin_official' },
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerCreate" ,
                        path: 'create' ,
                        component: OfficerProfileCreate ,
                        props: {
                            createMode: true
                        },
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerProfile" ,
                        path: 'profile/:id' ,
                        component: OfficerProfile ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerProfileCreate" ,
                        path: 'profilecreate/:id' ,
                        component: OfficerProfileCreate ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerThumbnail" ,
                        path: 'thumbnail' ,
                        component: OfficerThumbnailCrud ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerTable" ,
                        path: 'table' ,
                        component: OfficerTableCrud ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: OfficerThumbnailCrud ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    }
                ]
            },
            {
                name: 'OfficerContract' ,
                path: '/officer-contract',
                component: OfficerContractCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_staff'
                ],
                children: [
                    {
                        name: "OfficerContractList" ,
                        path: '' ,
                        component: ContractOfficerTable ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerContractCreate" ,
                        path: 'create' ,
                        component: OfficerContractProfileCreate ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerContractProfile" ,
                        path: 'profile/:id' ,
                        component: OfficerContractProfile ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    }
                ]
            },
            {
                name: 'OfficerOthers' ,
                path: '/officer-others',
                component: OfficerOthersCrud ,
                meta: {
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_staff'
                ],
                children: [
                    {
                        name: "OfficerOthersList" ,
                        path: '' ,
                        component: OtherOfficerTable ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerOthersCreate" ,
                        path: 'create' ,
                        component: OfficerProfileCreate ,
                        props: {
                            createMode: true
                        },
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "OfficerOthersProfile" ,
                        path: 'profile/:id' ,
                        component: OfficerProfile ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    }
                ]
            },
            {
                name: 'Structure' ,
                path: '/structure',
                component: StructureComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_staff'
                ],
                children: [
                    {
                        name: "StructureMain" ,
                        path: '' ,
                        component: StructureOrgchartComponent ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "StructureImage" ,
                        path: 'image' ,
                        component: StructureMainComponent ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    },
                    {
                        name: "StructureOrgchart" ,
                        path: 'orgchart' ,
                        component: StructureOrgchartComponent ,
                        permissions: [
                            'portal_staff_listing'
                        ],
                    }
                ]
            },
            {
                name: 'OfficerCard',
                path: '/officer/card/:id',
                component: DetailCardComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_staff_preview_card'
                ],
            },
            {
                name: 'PrintOfficerCard',
                path: '/officer/print/card/:id',
                component: PrintOfficerCardComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_staff_print_card'
                ],
            },
            // {
            //     name: 'PrintOfficerProfile',
            //     path: '/officer/print/profile/:id',
            //     component: PrintOfficerProfileComponent ,
            //     meta: {
            //         // transition: 'fade'
            //     },
            //     permissions: [
            //         'portal_regulator'
            //     ]
            // },
            {
                name: 'PrintOfficerProfile',
                path: '/officer/print/profile/:id',
                component: PrintOfficerProfileV1Component ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_regulator'
                ]
            },
            {
                name: 'OfficerContractProfilePrint',
                path: '/officercontract/printprofile/:id',
                component: PrintContractOfficerProfile ,
                permissions: [
                    'portal_regulator'
                ]
            },
            {
                name: 'QrCheckinAndCheckoutComponent',
                path: '/officer/checkinout/:id',
                component: QrCheckinAndCheckoutComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal_attendant_checkin_checkout'
                    'portal'
                ],
            },
            {
                name: 'QrCheckinAndCheckoutCameraComponent',
                path: '/officer/checkinout/:id/camera',
                component: QrCheckinAndCheckoutCameraComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal_staff_checkin_checkout_camera'
                    'portal'
                ],
            },
            {
                name: 'Meeting' ,
                path: '/meeting',
                component: MeetingComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                permissions: [
                    'portal_meeting'
                ],
                children: [
                    {
                        name: "MeetingThumbnailComponent" ,
                        path: '' ,
                        component: MeetingThumbnailComponent ,
                        permissions: [
                            // 'portal_meeting_listing'
                            'portal_meeting'
                        ],
                    },
                    {
                        name: "MeetingScheduleComponent" ,
                        path: 'schedule' ,
                        component: MeetingScheduleComponent ,
                        permissions: [
                            'portal_meeting' // 'portal_meeting_schedule'
                        ],
                    },
                    
                ]
            },
            {
                name: 'ScheduleMeetingTV1Component',
                path: '/tvtemplate1',
                component: ScheduleMeetingTV1Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV2Component',
                path: '/tvtemplate2',
                component: ScheduleMeetingTV2Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV3Component',
                path: '/tvtemplate3',
                component: ScheduleMeetingTV3Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'ScheduleMeetingTV4Component',
                path: '/tvtemplate4',
                component: ScheduleMeetingTV4Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            , {
                name: "Welcome" ,
                path: '/welcome' , 
                component: WelcomeComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal'
                ],
            }
        ]
        routers = routers.filter( ( router ) => hasPermission( router.permissions ) )
    }else{
        routers = [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/login'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/login'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            {
                name: "LoginPage" ,
                path: '/login' , 
                component: LoginComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            {
                name: "ForgotPasswordPage" ,
                path: '/forgot-password' ,
                component: ForgotPasswordComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            {
                name: 'QrCheckinAndCheckoutComponent',
                path: '/officer/checkinout/:id',
                component: QrCheckinAndCheckoutComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            {
                name: 'QrCheckinAndCheckoutCameraComponent',
                path: '/officer/checkinout/:id/camera',
                component: QrCheckinAndCheckoutCameraComponent ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    'portal_auth_login'
                ],
            },
            {
                name: 'ScheduleMeetingTV1Component',
                path: '/tvtemplate1',
                component: ScheduleMeetingTV1Component ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal'
                ],
            },
            {
                name: 'ScheduleMeetingTV2Component',
                path: '/tvtemplate2',
                component: ScheduleMeetingTV2Component ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal'
                ],
            },
            {
                name: 'ScheduleMeetingTV3Component',
                path: '/tvtemplate3',
                component: ScheduleMeetingTV3Component ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal'
                ],
            },
            {
                name: 'ScheduleMeetingTV4Component',
                path: '/tvtemplate4',
                component: ScheduleMeetingTV4Component ,
                meta: {
                    // transition: 'fade'
                },
                permissions: [
                    // 'portal'
                ],
            },
            // , {
            //     name: "Welcome" ,
            //     path: '/welcome' , 
            //     component: WelcomeComponent ,
            //     meta: {
            //         // transition: 'fade'
            //     }
            // }
        ]
    }

    routers.push( 
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }    
    )
    return routers
}
