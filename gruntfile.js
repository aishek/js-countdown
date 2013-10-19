module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      // Следим за файлами, выполняем таски при каждом изменении
      options: {
        // При вызове в терминале `grunt watch`
        // сначала выполнятся все таски и потом начнётся слежение
        atBegin: true
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['concat', 'closure-compiler']
      }
    },
    concat: {
      dist: {
        src: [
          'src/module_begin.js',
          'src/countdown.js',
          'src/helper.js',
          'src/helper/progress.js',
          'src/helper/pluralize.js',
          'src/helper/pluralize/ru.js',
          'src/helper/pluralize/en.js',
          'src/helper/pluralize/label_builder_factory.js',
          'src/module_end.js'
        ],
        dest: 'countdown.js'
      }
    },
    'closure-compiler': {
      frontend: {
        js: 'countdown.js',
        jsOutputFile: 'countdown.min.js',
        noreport: true,
        options: {}
      }
    }
  });

  // Загружаем установленные задачи
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-closure-compiler');

  // Задача по умолчанию (`grunt` в терминале)
  grunt.registerTask('default', ['concat', 'closure-compiler']);
};