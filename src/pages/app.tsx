import React from 'react';
import useStore from "@/libs/hooks/useStore";
import {Canvas} from "@/components/canvas";

const App = () => {
    const {users, boards} = useStore()


    return (
        <div className={'bg-red'}>
           <Canvas/>
        </div>
    );
};

export default App;