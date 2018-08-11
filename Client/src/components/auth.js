export default (to, from, next) => {
if(localStorage.user){
    let user = JSON.parse(localStorage.user);
    if (user !== null) {

        next();
    } else {
        next('/login');
    }

}else{
   next('/login'); 
}
}
