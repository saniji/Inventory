import { onAuthStateChanged } from "firebase/auth";

//local component
import { firebase } from './Firebase';


const AuthObserver = ({navigation}) => {
    onAuthStateChanged(firebase.auth(), (user) => {
        if(user) {
            navigation.replace("home", {
                displayName: user.displayName,
            });
        } else {
            navigation.reset({index: 0, routes: [{name: 'login'}]});
        }
    })
}

export default AuthObserver;