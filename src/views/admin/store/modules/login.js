/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const login = {
	state: {
		userinfo:sessionStorage.getItem('USERINFO') || {},
		newrouter:[],
		token:sessionStorage.getItem('token') || ''
	},
	mutations: {
		SET_USERINFO:(state, userinfo) => {
			state.userinfo = userinfo;
		},
		SET_NEWROUER:(state, newrouter) =>{
			state.newrouter = newrouter;
		},
		SET_TOKEN:(state,token) => {
			state.token = token;
		}
	},
	actions: {
		Logins({ commit }, info){
			return new Promise((resolve, reject) => {
				// 这里实际应用发请求
				let res={name:'羊先生',role:'admin'};
				// 将useruser和role进行存储
				commit('SET_USERINFO',res); 
				sessionStorage.setItem('USERINFO',res);
				resolve(data);
			}).catch(error => {
				reject(error);
			});
		},
		Roles({ commit }, newrouter){
			return new Promise((resolve, reject) => {
				// 存储最新路由
				commit('SET_NEWROUER',newrouter); 
				resolve(newrouter);
			}).catch(error => {
				reject(error);
			});
		},
		Logout({ commit, state }) {
			return new Promise((resolve, reject) => {
				commit('SET_NEWROUER',[]);
				sessionStorage.removeItem('USERINFO');
				location.reload();
				resolve();
			}).catch(error => {
				reject(error);
			});
		},

	}
}
export default login;