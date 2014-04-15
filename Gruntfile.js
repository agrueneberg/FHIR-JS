module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            cgds: {
                src: "lib/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.js",
                options: {
                    alias: ["lib/<%= pkg.name %>.js:<%= pkg.name %>"]
                }
            }
        },
        uglify: {
            dist: {
                src: "dist/<%= pkg.name %>.js",
                dest: "dist/<%= pkg.name %>.min.js"
            },
            options: {
                banner: "/*! <%= pkg.name %> <%= pkg.version %> */\n"
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["browserify", "uglify"]);

};
