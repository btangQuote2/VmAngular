interface Scripts {
  name: string;
  src: string;
}

export const ScriptStore: Scripts[] = [
   // Login
   {name: 'scriptsJS', src: '../../assets/js/scripts.js'},
   {name: 'loginIndexJS', src: '../../assets/js/login/index.js' },
   {name: 'lang-selectJS', src: '../../assets/js/lang-select.js' },
   {name: 'mdb-minJS', src: '../../assets/js/vendor/mdb.min.js' },
   //  Required by everything below
   {name: 'commonJS', src: '../../assets/js/common.js'},
   {name: 'utilsJS', src: '../../assets/js/utils.js' },
   {name: 'indexJS', src: '../../assets/js/index.js' },
   {name: 'nav-barJS', src: '../../assets/js/nav-bar.js' },
   {name: 'bannerJS', src: '../../assets/js/banner.js' },
   //  Required by Dashboard
   {name: 'dashIndexJS', src: '../../assets/js/dashboard/index.js'},
   {name: 'dashCalJS', src: '../../assets/js/dashboard/calendar.js' },
   {name: 'vendorMomentMinJS', src: '../../assets/js/vendor/moment.min.js' },
   {name: 'vendorMomentTZJS', src: '../../assets/js/vendor/moment-timezone-with-data-2012-2022.min.js' },
   {name: 'vendorCalJS', src: '../../assets/js/vendor/clndr.min.js' },
   {name: 'vendorJqueryTouchJS', src: '../../assets/js/vendor/jquery.touchSwipe.min.js' },
   {name: 'vendorAddToCalJS', src: '../../assets/js/vendor/addtocalendar.js' },
   //  Required by Job Record Hire
   {name: 'jobrecordIndexJS', src: '../../assets/js/job-record/index.js'},
   {name: 'vendorClndrJS', src: '../../assets/js/vendor/clndr.min.js' },
   {name: 'vendorRangesliderJS', src: '../../assets/js/vendor/rangeslider.min.js' },
   {name: 'vendorJqueryDatatablesJS', src: '../../assets/js/vendor/jquery.dataTables.min.js' },
   {name: 'vendorDatatablesFixedColJS', src: '../../assets/js/vendor/dataTables.fixedColumns.min.js' },
   {name: 'vendorDatatablesColReorderJS', src: '../../assets/js/vendor/dataTables.colReorder.js' },
   {name: 'popupJS', src: '../../assets/js/popups.js' },
   {name: 'accelTablesJS', src: '../../assets/js/accelerationTables.js' },
   //  Required by Name List/List
   {name: 'listIndexJS', src: '../../assets/js/lists/index.js'},
   {name: 'listControlsJS', src: '../../assets/js/lists/list-controls.js' },
   //  Required by everything else
   {name: 'vendorMdbMinJS', src: '../../assets/js/vendor/mdb.min.js' },
   {name: 'vendorPerfScrollbarJS', src: '../../assets/js/vendor/perfect-scrollbar.jquery.js' },
   {name: 'vendorSlickMinJS', src: '../../assets/js/vendor/slick.min.js' }

];
