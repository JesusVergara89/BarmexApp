import React from 'react'
import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import '../styles/CameraComponent.css'

const CameraComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [textResult, setTextResult] = useState("");

    useEffect(() => {
        const recognizeText = async () => {
            if (!selectedImage) return;
            const worker = await createWorker("eng");
            const { data } = await worker.recognize(selectedImage);
            setTextResult(data.text);
            await worker.terminate();
        };
        recognizeText();
    }, [selectedImage]);

    const handleChangeImage = e => {
        if (e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        } else {
            setSelectedImage(null);
            setTextResult("");
        }
    };

    const extractNumbers = (text) => {
        const numberStrings = text.match(/\b\d+\b/g);

        if (!numberStrings) {
            return [];
        }

        const numbers = numberStrings.filter(number => /^\d+$/.test(number)).slice(-7);
        console.log(numbers);
        return numbers;
    }
    return (
        <div className="camara-component">
            <div className="camara-component__upload-section">
                <label htmlFor="upload">Subir imagen</label>
                <input type="file" id="upload" accept='image/*' onChange={handleChangeImage} />
            </div>

            <div className="camara-component__image-section">
                {selectedImage && (
                    <div className="camara-component__box-image">
                        <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
                    </div>
                )}
                {textResult && (
                    <div className="camara-component__text-result">
                        <p>{extractNumbers(textResult).map((num, i) => (
                            <div key={i}>
                                {num}
                            </div>
                        ))}</p>
                    </div>
                )}
            </div>
        </div>

    )
}

export default CameraComponent