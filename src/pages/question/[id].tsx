import PageWrapper from '@/components/PageWrapper';
import { getQuestionById } from '@/services/question';
import { getComponent } from '@/components/QuestionComponent';
import styles from '../../styles/Question.module.scss'

type PropsType = {
    errno: number;
    data?: {
        id: string;
        title: string;
        desc?: string;
        css?: string;
        js?: string;
        isDeleted: boolean;
        isPublished: boolean;
        componentList: Array<any>
    };
    msg?: string;
}

// pages/question/[id].tsx

export default function QuestionPage(props: PropsType) {
    const { errno, data, msg = '' } = props;

    //如果出现错误码，或者获取不到问卷数据
    if (errno !== 0 || !data) {
        return (
            <PageWrapper title="错误">
                <h1>错误</h1>
                <p>{msg}</p>
            </PageWrapper>
        )
    }

    const { id, title = '', desc = '', isDeleted, isPublished, componentList } = data || {};

    //如果问卷已被删除，或者还未发布
    if (isDeleted) {
        return (
            <PageWrapper title={title} desc={desc} >
                <h1>{title}</h1>
                <p>问卷已被删除!</p>
            </PageWrapper>
        );
    }

    if (!isPublished) {
        return (
            <PageWrapper title={title} desc={desc} >
                <h1>{title}</h1>
                <p>问卷还未发布!</p>
            </PageWrapper>
        );
    }

    //遍历组件
    const ComponentListElem = (<>
        {
            componentList.map(c => {
                const ComponentElem = getComponent(c);
                return (
                    <div key={c.fe_id} className={styles.componentWrapper}>
                        {ComponentElem}
                    </div>
                )
            })
        }
    </>);

    return (
        <PageWrapper title={title}>
            <form action="/api/answer" method='post'>
                <input type="hidden" name="questionId" defaultValue={id} />
                {ComponentListElem}
                <div className={styles.submitBtnContainer}>
                    <input type="submit" value="提交" />
                </div>
            </form>
        </PageWrapper>
    )
}

export async function getServerSideProps(context: { params?: { id?: string } }) {
    const { id = '' } = context.params || {};

    try {
        const data = await getQuestionById(id);
        return { props: data };
    } catch {
        return { redirect: { destination: '/fail', permanent: false } };
    }
}