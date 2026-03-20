import QuestionInput from "./QuestionInput";
import QuestionRadio from "./QuestionRadio";
import QuestionTitle from "./QuestionTitle";

type ComponentInfoType={
    fe_id:string;
    type:string;
    //title:string;
    isHidden:boolean;
    props:any;
}

export const getComponent=(comp:ComponentInfoType)=>{
    const {fe_id,type,props={},isHidden}=comp;

    if(isHidden) return null;

    if(type==='QuestionInput'){
        return (
            <QuestionInput fe_id={fe_id} props={props} />
        )
    }

    if(type==='QuestionRadio'){
        return (
            <QuestionRadio fe_id={fe_id} props={props} />
        )
    }

    return null;
}