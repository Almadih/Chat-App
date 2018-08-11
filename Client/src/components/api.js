const url = 'https://almadihapi-chat-api.glitch.me/';
export default {

    signup: async function (user) {

        let res = await fetch(url + 'signup', {
            method: 'post',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify(user)
        });

        let data = await res.json();

        return data;

    },

    login: async function (user) {

        let res = await fetch(url + 'login', {
            method: 'post',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify(user)
        });

        let data = await res.json();

        return data;
    },

    getChat: async function (data) {
        let res = await fetch(url + `msgs/${data.from}/${data.to}`);
        let dat = await res.json();

        return dat;
    },

    sendMsg: async function (data) {

        let res = await fetch(url + 'msg/' + data.to, {
            method: 'post',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify(data)
        });

        let dat = await res.json();

        return dat;

    },

    getUsers: async function () {
        let res = await fetch(url + 'users');
        let data = await res.json();
        return data;
    },
    getUser: async function (id) {
        let res = await fetch(url + 'user/' + id);
        let data = await res.json();
        return data[0].name;
    },
    getChats: async function (id) {
        let res = await fetch(url + 'chats/' + id);
        let data = await res.json();

        return data;
    }

};
