/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],
    
    coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
    coffeeunit: [ 'src/**/*.spec.coffee' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/jquery.min.js',
      'vendor/jquery-bridget/jquery.bridget.js',
      'vendor/eventie/eventie.js',
      'vendor/doc-ready/doc-ready.js',
      'vendor/eventEmitter/EventEmitter.js',
      'vendor/get-style-property/get-style-property.js',
      'vendor/get-size/get-size.js',
      'vendor/matches-selector/matches-selector.js',
      'vendor/outlayer/item.js',
      'vendor/outlayer/outlayer.js',
      'vendor/imagesloaded/imagesloaded.js',
      'vendor/angular/angular.js',
      'vendor/angular-cookies/angular-cookies.min.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-ui-utils/modules/route/route.js',
      //'vendor/angular-strap/dist/angular-strap.min.js',
      'vendor/angular-scroll/angular-scroll.min.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/masonry/masonry.js',
      'vendor/jquery.masonry/masonry.js',
      'vendor/jquery-mousewheel/jquery.mousewheel.min.js',
      'vendor/jquery-cropbox/jquery.cropbox.js',
      'vendor/jcrop/js/jquery.Jcrop.js',
      'vendor/angular-masonry/angular-masonry.js',
      'vendor/jquery-ui/ui/widget.js',
      'vendor/blueimp-load-image/js/load-image.min.js',
      'vendor/jquery-file-upload/js/jquery.fileupload.js',
      'vendor/jquery-file-upload/js/jquery.fileupload-process.js',
      'vendor/jquery-file-upload/js/jquery.fileupload-validate.js',
      'vendor/jquery-file-upload/js/jquery.fileupload-ui.js',
      'vendor/jquery-file-upload/js/jquery.fileupload-image.js',
      'vendor/jquery-file-upload/js/jquery.fileupload-angular.js',
      'vendor/underscore/underscore-min.js'
      //'vendor/redactor.9.2.5/redactor/redactor.js'
    ],
    css: [
    ],
    assets: [
    ]
  },
};
