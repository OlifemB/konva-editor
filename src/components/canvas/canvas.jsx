import React from 'react';
import {createRoot} from 'react-dom/client';
import * as Konva from 'react-konva';

const Canvas = () => {
    return (
        <Konva.Stage width={800} height={600} >
            <Konva.Layer>
                <Konva.Rect
                    width={60}
                    height={60}
                    x={60}
                    y={20}
                    fill={'#89b717'}
                    draggable
                />
            </Konva.Layer>
        </Konva.Stage>
    );
};

export default Canvas;