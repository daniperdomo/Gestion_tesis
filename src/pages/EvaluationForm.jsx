import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import RevisionExpForm from '../components/evaluation/RevisionExpForm'
import RevisionInsForm from '../components/evaluation/RevisionInsForm'
import EvaluacionExpForm from '../components/evaluation/EvaluacionExpForm'
import EvaluacionInsForm from '../components/evaluation/EvaluacionInsForm'
import EvaluacionInsTForm from '../components/evaluation/EvaluacionInsTForm'
import Error404 from './Error404'

const EvaluationForm = () => {
    const { type } = useParams();
    const forms = [
        { type: 'revision-exp', comp: <RevisionExpForm/> },
        { type: 'revision-ins', comp: <RevisionInsForm/>},
        { type: 'evaluacion-exp', comp: <EvaluacionExpForm/>},
        { type: 'evaluacion-ins', comp: <EvaluacionInsForm/>},
        { type: 'evaluacion-ins-tutor', comp: <EvaluacionInsTForm/>},
    ];

    const formToRender = forms.find(form => form.type === type);

    return (
        <>
            <Header/>
            {formToRender ? (
                <div className="container mx-auto p-4">
                    {formToRender.comp}
                </div>
            ) : (
                <Error404 />
            )}
            <Footer/>
        </>
    );
};

export default EvaluationForm;