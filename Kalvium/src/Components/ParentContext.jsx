import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const ParentContext = ({children}) => {

    const [isLogin,setIsLogin] = useState(false)
  return (
    <div>
        <AppContext.Provider value={{isLogin,setIsLogin}}>
            {children}
        </AppContext.Provider>
    </div>
  )
}

export default ParentContext