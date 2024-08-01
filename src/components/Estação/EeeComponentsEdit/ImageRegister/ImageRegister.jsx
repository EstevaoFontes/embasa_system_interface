import styles from './ImageRegister.module.css';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

import ImageList from './ImageList/ImageList';
import { uniqueId } from 'lodash';

const ImageRegister = ({ setValue, img }) => {

    const [uploadedImages, setUploadedImages] = useState(img || [])
    const [newImages, setNewImages] = useState([])

    let files = []
    let legend = []

    const onDrop = useCallback((acceptedFiles) => {

        if (newImages.length + uploadedImages.length === 4) {
            alert('Você só pode colocar no máximo de 4 imagens no total!')
            return
        }

        const droped = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: uniqueId(),
            legenda: ""
        }))

        setNewImages((prevFiles) => [...prevFiles, ...droped]);
    }, [newImages])


    useEffect(() => {
        newImages.map(file => {
            if (Object.keys(file).includes('filename')) {
                files.push(file.filename)
            } else {
                files.push(file.file)
            }
        })

        newImages.map(file => {
            legend.push(file.legenda)
        })

        setValue('imagens', files)
        setValue('legenda', legend)
    }, [newImages])


    const { getInputProps, getRootProps, isDragAccept, isDragReject } = useDropzone({
        onDrop,
        multiple: true,
        maxFiles: 4,
        accept: {
            'image/jpeg': ['.jpeg'],
            'image/png': ['.png']
        }
    })

    return (
        <div>
            <h1>Registros Fotográficos</h1>

            {uploadedImages.length < 4 && newImages.length < 4 && (
                <div className={styles.container}>
                    <div
                        className={isDragAccept ? styles.image_container_accept : isDragReject ? styles.image_container_reject
                            : styles.image_container}
                        {...getRootProps()}
                    >
                        <i
                            id={isDragAccept ? styles.icon_accept : isDragReject ? styles.icon_reject : ""}
                            className={isDragReject ? 'bi bi-x-lg' : 'bi bi-cloud-arrow-up'}
                        >
                        </i>

                        {(!isDragAccept && !isDragReject) && <p>Selecione ou Arraste e Solte a Imagem</p>}
                        {isDragAccept && <p>Solte para Enviar</p>}
                        {isDragReject && <p>Arquivo não suportado!</p>}

                        <input
                            type='file'
                            {...getInputProps()}
                            name='imagens'
                        />
                    </div>
                </div>
            )}

            <div className={styles.container_images}>
                <span className={styles.title}>Imagens Baixadas - {uploadedImages.length} </span>
                <ul>
                    {uploadedImages.length > 0 && (
                        uploadedImages.map((accept, index) => (
                            <ImageList
                                key={index}
                                setFile={setUploadedImages}
                                images={accept}
                                allImages={uploadedImages}
                            />
                        )))}
                </ul>
                <span className={styles.title}>Novas Imagens - {newImages.length}</span>
                <ul>
                    {newImages.length > 0 && (
                        newImages.map((accept, index) => (
                            <ImageList
                                key={index}
                                setFile={setNewImages}
                                images={accept}
                                allImages={newImages}
                            />
                        )))}
                </ul>
            </div>
        </div >
    )
}

export default ImageRegister
