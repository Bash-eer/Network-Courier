export const removeLsObj = function (key) {
    let data = localStorage.getItem("vuex");

    let parsed = JSON.parse(data);

    delete parsed[key];

    console.log('------', parsed)

    localStorage.setItem("vuex", JSON.stringify(parsed));
}
