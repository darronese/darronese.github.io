export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","favicon.png","temp.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Co4uFwWz.js",app:"_app/immutable/entry/app.Cj7hk92x.js",imports:["_app/immutable/entry/start.Co4uFwWz.js","_app/immutable/chunks/6EqEq-va.js","_app/immutable/chunks/Dt8kaVtJ.js","_app/immutable/chunks/BKy5DhOa.js","_app/immutable/entry/app.Cj7hk92x.js","_app/immutable/chunks/Dt8kaVtJ.js","_app/immutable/chunks/COmtVRUl.js","_app/immutable/chunks/cbP46Ia2.js","_app/immutable/chunks/ge6juCqD.js","_app/immutable/chunks/BKy5DhOa.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
