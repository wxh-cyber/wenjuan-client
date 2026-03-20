import {FC} from 'react';
import styles from './QuestionTextarea.module.scss';

type PropsType={
    fe_id:string;
    props:{
        title:string;
        placeholder?:string;
    }
}

const QuestionTextarea: FC<PropsType> = ({fe_id,props}) => {
    const {title,placeholder=''}=props;

    return (
        <div>
            <p>{title}</p>
            <div className={styles.textAreaWrapper}>
                <textarea name={fe_id} placeholder={placeholder} rows={5}></textarea>
            </div>
        </div>
    )
}

export default QuestionTextarea;