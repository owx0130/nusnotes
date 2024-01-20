import { ModuleContext } from "./moduleContext";
import { useContext } from "react";

export const useModuleContext = () =>{
    const context = useContext(ModuleContext)
    return context
}