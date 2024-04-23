import {FC,  useState} from 'react'
import styles from "./Menu.module.scss"
import {MenuBurger} from "./MenuBurger";
import MenuProfile from "./MenuProfile";
import {useTypedSelector} from "../../helpers/hooks/useTypedRedux";
import {selectAuth} from "../../redux/slices/authSlice";


type MenuPropsType ={
    select: boolean;
    icon:string;
}

const  Index:FC<MenuPropsType> = ({icon, select}) => {
    const [visible, setVisible] = useState(true);



    let element = select ? <MenuBurger/> : <MenuProfile/>;

    return (
        <button onMouseEnter={() => setVisible(false)} onMouseLeave={() => setVisible(true)} className={styles.header__nav_menu}>
            <img src={icon} alt="menu" className={styles.header__menu_icon}/>
            {visible ? "" : element}
        </button>
    );
}

export default Index;