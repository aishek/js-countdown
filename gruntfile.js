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
        tasks: ['concat:all', 'concat:en', 'concat:ru', 'closure-compiler']
      }
    },
    concat: {
      all: {
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
      },
      en: {
        src: [
          'src/module_begin.js',
          'src/countdown.js',
          'src/helper.js',
          'src/helper/progress.js',
          'src/helper/pluralize.js',
          'src/helper/pluralize/en.js',
          'src/helper/pluralize/label_builder_factory.js',
          'src/module_end.js'
        ],
        dest: 'countdown.en.js'
      },
      ru: {
        src: [
          'src/module_begin.js',
          'src/countdown.js',
          'src/helper.js',
          'src/helper/progress.js',
          'src/helper/pluralize.js',
          'src/helper/pluralize/ru.js',
          'src/helper/pluralize/label_builder_factory.js',
          'src/module_end.js'
        ],
        dest: 'countdown.ru.js'
      }
    },
    'closure-compiler': {
      all: {
        js: 'countdown.js',
        jsOutputFile: 'countdown.min.js',
        noreport: true,
        options: {}
      },
      en: {
        js: 'countdown.en.js',
        jsOutputFile: 'countdown.en.min.js',
        noreport: true,
        options: {}
      },
      ru: {
        js: 'countdown.ru.js',
        jsOutputFile: 'countdown.ru.min.js',
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
  grunt.registerTask('default', ['concat:all', 'concat:en', 'concat:ru', 'closure-compiler']);
};