import PageWrapper from '@/components/PageWrapper';
import styles from '../../styles/Question.module.scss'

type PropsType = {
    id: string;
}

// pages/question/[id].tsx

//临时引用过来
import QuestionInput from "@/components/QuestionComponent/QuestionInput";
import QuestionRadio from "@/components/QuestionComponent/QuestionRadio";

export default function About(props: PropsType) {

    return (
        <PageWrapper title="question">
            <form action="/api/answer" method='post'>
                <input type="hidden" name="questionId" defaultValue={props.id} />
                <div className={styles.componentWrapper}>
                    <QuestionInput fe_id="c1" props={{
                        title: '你的姓名',
                        placeholder: '请输入你的姓名'
                    }}>
                    </QuestionInput>
                </div>
                <div className={styles.componentWrapper}>
                    <QuestionRadio fe_id="c2" props={{
                        title: '你的性别',
                        options: [
                            { value: 'male', text: '男' },
                            { value: 'female', text: '女' },
                        ],
                        value: '',
                        isVertical: false
                    }}>
                    </QuestionRadio>
                </div>
                <div className={styles.submitBtnContainer}>
                    <input type="submit" value="提交" />
                </div>
            </form>
        </PageWrapper>
    )
}

// export async function getStaticProps(){
//     //可以await异步请求
//     //线上环境下，每次请求不会再执行
//     return {
//         props:{
//             info:'请求来的数据'
//         }
//     }
// }

export async function getServerSideProps(context: any) {
    const { id = '' } = context.params;

    //根据id await获取问卷数据

    return {
        props: {
            id
        }
    }
}