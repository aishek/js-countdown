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
        files: 'src/*.js',
        tasks: ['concat', 'closure-compiler']
      }
    },
    concat: {
      dist: {
        src: [
          'src/begin.js',
          'src/end.js'
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