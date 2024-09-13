import { useState } from "react";
import { TwitterPicker } from "react-color";

export default function ColorPicker({name}: {
    name?: string
}){
    const [color, setColor] = useState("#000")

    return <div className="input-group flex flex-col gap-3">
        <label className="font-semibold text-sm">Choose your Color</label>
        <input type="text" value={color} name={name} readOnly={true} className="hidden"/>
        <TwitterPicker color={color} onChangeComplete={(colorResult) => setColor(colorResult.hex)}/>
    </div>
}