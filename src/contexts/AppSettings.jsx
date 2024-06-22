import { createContext, useEffect, useState } from "react";

export const AppSettingsContext = createContext({
    appTheme: "light",
    switchAppTheme: ()=>{}
});

export default function AppSettingsProvider({children}){
    const [theme, setTheme] = useState('dark');

    useEffect(()=>{
        //change the custom theme attribute of the root element (either light or dark theme) (css has been programmed to handle the rest)
        document.documentElement.setAttribute('color-theme', theme);
    }, [theme]);

    function switchAppTheme(){//function for switching app theme
        setTheme(prevTheme => {
            if(prevTheme === 'light'){
                return 'dark';
            }
            else{
                return 'light';
            }
        });
    }

    const AppSettings = {
        appTheme: theme,
        switchAppTheme
    }

    return (
        <AppSettingsContext.Provider value={AppSettings}>
            {children}
        </AppSettingsContext.Provider>
    )
}