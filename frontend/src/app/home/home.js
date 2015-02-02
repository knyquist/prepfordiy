/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module('redditDIY.home', [
    'ui.router',
    'ui.bootstrap',
    'mgcrea.ngStrap.helpers.dimensions',
    'redditDIY.common.navbar',
    'redditDIY.home.services'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config($stateProvider) {
    $stateProvider.state('home', {
        url : '/home',
        views : {
            "main" : {
                controller : 'HomeCtrl',
                templateUrl : 'home/home.tpl.html'
            }
        },
        data : {
            pageTitle : 'Welcome'
        }
    });
})
.controller('HomeCtrl', function HomeController($scope, $rootScope, $location, MainServer) {
    $rootScope.stuck_top = 'true';
    $scope.rename_me = '';

    $scope.showAbout = function() {
        $location.path("/about");
    };
    $scope.show_similar_threads = function(thread_id) {
        MainServer.get_similar_posts(thread_id).then(function (similar_post_data) {
            console.log('Similar posts retrieved from server');
            $scope.similar_post_threads = [];
            for (var i=0; i<similar_post_data.response.threads.length; i++) {
                $scope.similar_post_threads.push({ title: similar_post_data.response.threads[i].titles,
                                           link: similar_post_data.response.threads[i].links,
                                           author: similar_post_data.response.threads[i].authors,
                                           comments: similar_post_data.response.threads[i].comments });
            }
        });
    };

    $scope.make_selection_blue = function(ix, min, max) {
        for (var i=min; i<=max; i++) {
            document.getElementById("post " + i).style.backgroundColor = "#fff";
            document.getElementById("post " + i).style.borderColor = "#fff";        
        }

        document.getElementById("post " + ix).style.backgroundColor = "#eff7ff";
        document.getElementById("post " + ix).style.borderColor = "#d6d6d6";
        document.getElementById("post " + ix).style.borderStyle = "solid";
        document.getElementById("post " + ix).style.borderWidth = "1px";
    };

    $scope.grab_next = function(ix) {
        $scope.cur_displayed_threads = [];
        for (var i=ix+1; i<=ix+10; i++) {
            $scope.cur_displayed_threads.push($scope.post_threads[i]);
        }
    };

    $scope.grab_prev = function(ix) {
        $scope.cur_displayed_threads = [];
        for (var i=ix-1; i>=ix-10; i--) {
            $scope.cur_displayed_threads.unshift($scope.post_threads[i]);
        }
    };

    MainServer.get_diy_posts().then(function (diy_post_data) {
        console.log('DIY posts retrieved from server');
        console.log(diy_post_data);

        //get list of people you've exchanged messages with
        $scope.post_threads = [];
        for (var i=0; i<diy_post_data.response.threads.length; i++) {
            $scope.post_threads.push({ title: diy_post_data.response.threads[i].titles,
                                       link: diy_post_data.response.threads[i].links,
                                       author: diy_post_data.response.threads[i].authors,
                                       index: diy_post_data.response.threads[i].indices,
                                       num_comments: diy_post_data.response.threads[i].num_comments,
                                       comment_link: diy_post_data.response.threads[i].comments });
            if($scope.post_threads[$scope.post_threads.length-1].link.substr(0,3) == '/r/') {
                $scope.post_threads[$scope.post_threads.length-1].link = 'http://www.reddit.com'.concat($scope.post_threads[$scope.post_threads.length-1].link);
            }
        }

        $scope.cur_displayed_threads = [];
        for (i=0; i<10; i++) {
            $scope.cur_displayed_threads.push($scope.post_threads[i]);
        }
    });
});
