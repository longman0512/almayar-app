import React from "react";

// set the defaults
const StoreContext = React.createContext({
  store: {
    topUser:"longman"
  },
  setData: ()=>{}
});

export default StoreContext;