angular.module('redditDIY.home.services', [
	'ui.router',
	'ui.bootstrap',
	'redditDIY.common.navbar'
])
.service('MainServer', function ($http, $q) {
	return {
		get_diy_posts: function (retrieve_params) {
			var deferred = $q.defer();
			$http.get('/api/diy', {}).success(function (data, status, headers, config) {
				if (data.meta && data.meta.code == 200) {
					deferred.resolve(data);
				} else {
					deferred.resolve(data);
				}
			}).error(function (data, status, headers, config){
				deferred.reject(data);
			});
			return deferred.promise; 
		},
		get_similar_posts: function (thread_id) {
			console.log('/api/diy/' + thread_id);
			var deferred = $q.defer();
			$http.get('/api/diy/' + thread_id, {}).success(function (data, status, headers, config) {
				if (data.meta && data.meta.code == 200) {
					deferred.resolve(data);
				} else {
					deferred.resolve(data);
				}
			}).error(function (data, status, headers, config){
				deferred.reject(data);
			});
			return deferred.promise; 
		}
	};
});